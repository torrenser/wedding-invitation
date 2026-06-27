import { createClient } from "npm:@supabase/supabase-js@2.32.0";

Deno.serve(async (req: Request) => {
    const ALLOWED_ORIGINS = [
        'http://localhost:5173',
        'https://torrenser.github.io'
    ];
    const origin = req.headers.get('origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const corsHeaders = {
        'Access-Control-Allow-Origin': allowed,
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    };

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

        let email_prefix: string | null;
        if (req.method === 'POST') {
            const body = await req.json().catch(() => ({}));
            console.log("body : ", body);
            email_prefix = body?.email_prefix ?? null;
        } else {
            return new Response(JSON.stringify({ error: 'POST method is required.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        if (!email_prefix) {
            return new Response(JSON.stringify({ error: 'email_prefix required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Normalize prefix
        const prefix = email_prefix.toString().trim();

        // Query tokens table by user_id (text) matching prefix
        const { data, error } = await supabase
            .from('tokens')
            .select('user_id, refresh_token, expires_in, created_at')
            .ilike('user_id', `${prefix}%`)
            .limit(1);
        console.log("data : ", data);
        console.log("error : ", error);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const row = data[0];
        const found = Array.isArray(data) && data.length > 0;
        console.log("found : ", found);
        const refresh_token = found ? row.refresh_token : null;
        const createdAtMs = new Date(row.created_at).getTime();
        const expiresInMs = (row.expires_in ?? 0) * 1000;
        const expiresAtMs = createdAtMs + expiresInMs;

        const isValid = expiresAtMs > Date.now();
        console.log("isValid : ", isValid);

        if (!isValid) {
            return new Response(JSON.stringify({ allowed: false, reason: "expired", message: "Token has expired.", expires_in: expiresAtMs }), { status: 401, headers: { "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ allowed: found, refresh_token }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
});