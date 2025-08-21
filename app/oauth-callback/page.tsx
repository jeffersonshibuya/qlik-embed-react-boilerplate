"use client";
import Script from "next/script";

export default function OAuthCallbackPage() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components@1/dist/oauth-callback.js"
        data-host="https://ipc-lab.us.qlikcloud.com"
        type="application/javascript"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <p>Processing authentication...</p>
    </>
  );
}
