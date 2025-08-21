import { LoginButton } from "./login-button";

function LoginPage() {
  console.log("loginPage server side");

  return (
    <div className="space-y-2.5 overflow-hidden">
      <h1 className="text-2xl">Login Page</h1>
      <LoginButton />
    </div>
  );
}

export default LoginPage;
