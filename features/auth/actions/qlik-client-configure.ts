import { setDefaultHostConfig } from "@qlik/api/auth";
import { getAccessToken } from "./get-access-token";

export async function configureQlikClient() {
  setDefaultHostConfig({
    host: process.env.QLIK_SERVER?.replace("https://", ""),
    authType: "oauth2",
    clientId: process.env.OAUTH_CLIENT_ID!,
    redirectUri: `${process.env.HOST_URL}/oauth-callback`,
    accessTokenStorage: "session",
    autoRedirect: true,
    getAccessToken: () => getAccessToken(),
  });
}
