import { serverEnv } from "@/serverEnv";

// spec: https://atproto.com/specs/oauth#clients
export const getMetadata = () => {
  const isDev = serverEnv.NEXT_PUBLIC_BASE_URL.startsWith("http://localhost");
  const baseUrl = serverEnv.NEXT_PUBLIC_BASE_URL;
  const enc = encodeURIComponent;
  return {
    client_id: isDev
      ? `http://localhost?redirect_uri=${enc(`${baseUrl}/api/oauth/callback`)}&scope=${enc("atproto transition:generic")}`
      : `${baseUrl}/api/oauth/client_metadata`,
    application_type: "web",
    grant_types: ["authorization_code", "refresh_token"],
    scope: "atproto transition:generic",
    response_types: ["code"],
    redirect_uris: [`${baseUrl}/api/oauth/callback`],
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
    // optional
    client_name: "Logplace Web App",
  };
};
