"use client";

import { getQlikOAuthURL } from "@/features/auth/actions/get-qlik-oauth-url";

export const LoginButton = () => {
  const handleLogin = async () => {
    await getQlikOAuthURL();
  };

  return (
    <>
      <button
        className="p-2 bg-slate-800 rounded shadow cursor-pointer text-white font-semibold"
        onClick={handleLogin}
      >
        Authenticate
      </button>
    </>
  );
};
