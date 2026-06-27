console.info('drive-upload (REST) starting');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type, x-upload-key',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ALLOWED_MIME_PREFIXES = ['image/', 'video/'];
const ALLOWED_MIME_EXACT = ['application/pdf'];

Deno.serve(async (req) => {
    try {
        if (req.method === 'OPTIONS') {
            return new Response('ok', { headers: corsHeaders })
        }
        const uploadKey = Deno.env.get('UPLOAD_KEY');
        const providedKey = req.headers.get('x-upload-key');
        console.log("providedKey : ", providedKey);
        console.log('uploadKey : ', uploadKey);
        if (!uploadKey || providedKey !== uploadKey) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
        }

        // parse multipart form data
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('multipart/form-data')) {
            return new Response(JSON.stringify({ error: 'Content-Type must be multipart/form-data' }), { status: 400, headers: corsHeaders });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const guestName = (formData.get('guestName') as string) || 'guest';

        if (!file) return new Response(JSON.stringify({ error: 'file is required' }), { status: 400, headers: corsHeaders });

        if (file.size > MAX_FILE_SIZE) {
            return new Response(JSON.stringify({ error: 'file too large' }), { status: 413, headers: corsHeaders });
        }

        const mime = file.type || '';
        const okMime = ALLOWED_MIME_PREFIXES.some(p => mime.startsWith(p)) || ALLOWED_MIME_EXACT.includes(mime);
        if (!okMime) return new Response(JSON.stringify({ error: 'file type not allowed' }), { status: 415, headers: corsHeaders });

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !supabaseServiceRole) {
            return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers: corsHeaders });
        }

        // fetch refresh_token from DB via REST (no supabase client dependency)
        const tokensRes = await fetch(`${supabaseUrl}/rest/v1/tokens?provider=eq.google`, {
            headers: {
                apikey: supabaseServiceRole,
                Authorization: `Bearer ${supabaseServiceRole}`,
                Accept: 'application/json',
            },
        });

        if (!tokensRes.ok) {
            const txt = await tokensRes.text();
            console.error('Failed fetching token from DB', tokensRes.status, txt);
            return new Response(JSON.stringify({ error: 'Failed to read token' }), { status: 502, headers: corsHeaders });
        }
        const tokensData = await tokensRes.json();
        const refreshToken = tokensData[0]?.refresh_token;
        if (!refreshToken) return new Response(JSON.stringify({ error: 'refresh_token not found' }), { status: 500, headers: corsHeaders });

        // exchange refresh token for access token
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: Deno.env.get('GOOGLE_CLIENT_ID') || '',
                client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET') || '',
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }),
        });
        if (!tokenRes.ok) {
            const txt = await tokenRes.text();
            console.error('Failed exchanging refresh token', tokenRes.status, txt);
            return new Response(JSON.stringify({ error: 'Failed to get access token' }), { status: 502, headers: corsHeaders });
        }
        const tokenJson = await tokenRes.json();
        const accessToken = tokenJson.access_token;
        if (!accessToken) return new Response(JSON.stringify({ error: 'no access token from provider' }), { status: 502, headers: corsHeaders });

        // find wedding folder
        const q = encodeURIComponent("mimeType='application/vnd.google-apps.folder' and name='wedding' and trashed=false");
        const searchRes = await fetch(`${'https://www.googleapis.com/drive/v3/files'}?q=${q}&fields=files(id)`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!searchRes.ok) {
            const txt = await searchRes.text();
            console.error('Failed finding wedding folder', searchRes.status, txt);
            return new Response(JSON.stringify({ error: 'Failed finding wedding folder' }), { status: 502, headers: corsHeaders });
        }
        const searchJson = await searchRes.json();
        const parentFolderId = searchJson.files?.[0]?.id;
        if (!parentFolderId) return new Response(JSON.stringify({ error: 'wedding folder not found' }), { status: 404, headers: corsHeaders });

        // find or create guest folder
        const guestQ = encodeURIComponent(`mimeType='application/vnd.google-apps.folder' and name='${guestName}' and '${parentFolderId}' in parents and trashed=false`);
        const guestSearchRes = await fetch(`${'https://www.googleapis.com/drive/v3/files'}?q=${guestQ}&fields=files(id)`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!guestSearchRes.ok) {
            const txt = await guestSearchRes.text();
            console.error('Failed searching guest folder', guestSearchRes.status, txt);
            return new Response(JSON.stringify({ error: 'Failed searching guest folder' }), { status: 502, headers: corsHeaders });
        }
        const guestJson = await guestSearchRes.json();
        let guestFolderId = guestJson.files?.[0]?.id;

        if (!guestFolderId) {
            const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: guestName,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [parentFolderId],
                }),
            });
            if (!createRes.ok) {
                const txt = await createRes.text();
                console.error('Failed creating guest folder', createRes.status, txt);
                return new Response(JSON.stringify({ error: 'Failed creating guest folder' }), { status: 502, headers: corsHeaders });
            }
            const folder = await createRes.json();
            guestFolderId = folder.id;
        }

        // upload file multipart
        const metadata = JSON.stringify({
            name: file.name,
            mimeType: file.type,
            parents: [guestFolderId],
        });

        const uploadForm = new FormData();
        uploadForm.append('metadata', new Blob([metadata], { type: 'application/json' }));
        uploadForm.append('file', file);

        const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: uploadForm,
        });

        if (!uploadRes.ok) {
            const txt = await uploadRes.text();
            console.error('Upload failed', uploadRes.status, txt);
            return new Response(JSON.stringify({ error: 'Upload failed', details: txt }), { status: 502, headers: corsHeaders });
        }

        const result = await uploadRes.json();

        // optional: record upload in DB (uploads table) - non-blocking
        try {
            const logRes = await fetch(`${supabaseUrl}/rest/v1/uploads`, {
                method: 'POST',
                headers: {
                    apikey: supabaseServiceRole,
                    Authorization: `Bearer ${supabaseServiceRole}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation',
                },
                body: JSON.stringify({
                    file_name: file.name,
                    mime_type: file.type,
                    size: file.size,
                    created_at: new Date().toISOString(),
                    guest_name: guestName,
                    drive_file_id: result.id,
                }),
            });
            if (!logRes.ok) {
                const txt = await logRes.text();
                console.warn('Failed logging upload', logRes.status, txt);
            }
        } catch (e) {
            console.warn('Upload log error', e);
        }

        return new Response(JSON.stringify(result), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (err) {
        console.error('Unexpected error', err);
        return new Response(JSON.stringify({ error: 'internal_error' }), { status: 500, headers: corsHeaders });
    }
});