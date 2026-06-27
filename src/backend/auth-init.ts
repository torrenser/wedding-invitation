// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
console.info('auth-init function starting');

Deno.serve(async (req: Request) => {
    try {
        const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
        const redirectUri = Deno.env.get('GOOGLE_REDIRECT_URI');

        if (!clientId || !redirectUri) {
            return new Response(
                JSON.stringify({ error: 'Missing GOOGLE_CLIENT_ID or GOOGLE_REDIRECT_URI' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', ['https://www.googleapis.com/auth/drive', 'openid', 'email'].join(' '));
        authUrl.searchParams.set('access_type', 'offline');
        authUrl.searchParams.set('prompt', 'consent');
        return Response.redirect(authUrl.toString(), 302);
    } catch (err) {
        console.error('auth-init error', err);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
});