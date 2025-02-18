import { NodeOAuthClientOptions } from "@atproto/oauth-client-node";

// spec: https://atproto.com/specs/oauth#clients
export const getMetadata = (baseUrl = process.env.NEXT_PUBLIC_BASE_URL) => {
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL");
  }
  const isDev = baseUrl.startsWith("http://localhost");

  // atproto expect loopback IP like 127.0.0.1 instead of localhost
  const origin = isDev ? `http://127.0.0.1:3000` : baseUrl;
  const enc = encodeURIComponent;
  return {
    client_id: isDev
      ? `http://localhost?redirect_uri=${enc(`${origin}/api/oauth/callback`)}&scope=${enc("atproto transition:generic")}`
      : `${origin}/api/oauth/client_metadata`,
    application_type: "web",
    grant_types: ["authorization_code", "refresh_token"],
    scope: "atproto transition:generic",
    response_types: ["code"],
    redirect_uris: [`${origin}/api/oauth/callback`],
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
    client_name: "Logplace Web App",
  } as NodeOAuthClientOptions["clientMetadata"];
};
