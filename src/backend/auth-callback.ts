console.info("auth-callback (REST) starting");

Deno.serve(async (req: Request) => {
    try {
        console.log("req : ", req);
        const url = new URL(req.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");

        if (!code) {
            return new Response(JSON.stringify({ error: "Missing code" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
        const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
        const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI");
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        const frontendUrl = Deno.env.get("FRONTEND_URL");

        if (!clientId || !clientSecret || !redirectUri || !supabaseUrl || !supabaseServiceRole || !frontendUrl) {
            return new Response(JSON.stringify({ error: "Missing required environment variables" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 1) Exchange code for tokens from Google
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        if (!tokenRes.ok) {
            const text = await tokenRes.text();
            console.error("Token endpoint error:", tokenRes.status, text);
            return new Response(JSON.stringify({ error: "Token exchange failed" }), {
                status: 502,
                headers: { "Content-Type": "application/json" },
            });
        }

        const tokens = await tokenRes.json();
        if (!tokens.refresh_token || !tokens.access_token) {
            console.error("Token response:", JSON.stringify(tokens));
            return new Response(JSON.stringify({ error: "Token not issued" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        const userInfo = await userInfoRes.json();
        const allowedEmail = Deno.env.get("ALLOWED_EMAIL");
        if (userInfo.email !== allowedEmail) {
            return new Response(JSON.stringify({ error: `Unauthorized account: ${userInfo.email} !== ${allowedEmail}` }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 2) Persist tokens to Supabase via REST
        const provider = "google";
        const tokensTableUrl = `${supabaseUrl}/rest/v1/tokens`;

        // Delete existing tokens for provider
        const deleteRes = await fetch(`${tokensTableUrl}?provider=eq.${encodeURIComponent(provider)}`, {
            method: "DELETE",
            headers: {
                apikey: supabaseServiceRole,
                Authorization: `Bearer ${supabaseServiceRole}`,
            },
        });

        if (![200, 204].includes(deleteRes.status)) {
            const txt = await deleteRes.text();
            console.error("Failed deleting old tokens:", deleteRes.status, txt);
        }

        const insertBody = {
            provider,
            user_id: userInfo.email,
            refresh_token: tokens.refresh_token,
            access_token: tokens.access_token ?? null,
            scope: tokens.scope ?? null,
            expires_in: tokens.expires_in ?? null,
            created_at: new Date().toISOString(),
            state: state ?? null,
        };

        const insertRes = await fetch(tokensTableUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: supabaseServiceRole,
                Authorization: `Bearer ${supabaseServiceRole}`,
                Prefer: "return=representation",
            },
            body: JSON.stringify(insertBody),
        });

        if (!insertRes.ok) {
            const txt = await insertRes.text();
            console.error("Failed inserting token:", insertRes.status, txt);
            return new Response(JSON.stringify({ error: "Failed to save token" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const redirectTo = new URL(frontendUrl);
        redirectTo.searchParams.set("auth", "success");
        if (state) redirectTo.searchParams.set("state", state);

        return Response.redirect(redirectTo.toString(), 302);
    } catch (err) {
        console.error("Unexpected error in auth-callback:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});