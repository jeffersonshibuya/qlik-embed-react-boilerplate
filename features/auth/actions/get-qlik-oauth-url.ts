"use server";

import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getQlikOAuthURL = async () => {
  const cookieStore = await cookies();

  // Initiate an OAuth2 Authorization Request, following https://www.oauth.com/oauth2-servers/pkce/authorization-request/
  // Create a nonce to identify this login attempt
  const nonce = randomBytes(50).toString("base64url");

  // Generate the code verifier, used to validate the access token request
  const codeVerifier = randomBytes(50).toString("base64url");

  // Generate the code challenge, which is the base64-url encoded SHA-256 hash of the code verifier
  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  cookieStore.set("code_verifier", codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 300,
    path: "/",
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/login-callback`,
    scope: "user_default offline_access",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: nonce,
  });

  const authUrl = `${
    process.env.QLIK_SERVER
  }/oauth/authorize?${params.toString()}`;
  redirect(authUrl);
};
