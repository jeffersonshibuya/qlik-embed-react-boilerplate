"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) throw new Error("No Code found");

    const cookiesStore = await cookies();
    const codeVerifier = cookiesStore.get("code_verifier")?.value;

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      `${process.env.QLIK_SERVER}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
          client_secret: process.env.OAUTH_CLIENT_SECRET!,
          redirect_uri: `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/login-callback`,
          code_verifier: codeVerifier || "",
          code,
        }).toString(),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      throw new Error("Token exchange failed");
    }

    const tokenData = await tokenResponse.json();
    cookiesStore.set("ipc_inTake_access_token", tokenData.access_token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: tokenData.expires_at,
      path: "/",
    });

    return NextResponse.redirect(new URL(`/`, req.url), 302);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to authenticate user";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
