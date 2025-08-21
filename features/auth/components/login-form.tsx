"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getQlikOAuthURL } from "../actions/get-qlik-oauth-url";

export function LoginForm() {
  const handleLogin = async () => {
    await getQlikOAuthURL();
  };

  return (
    <div className={cn("flex flex-col gap-6 items-center")}>
      <Card className="overflow-hidden p-0 w-lg">
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="flex items-center justify-center">
              <Image
                src={
                  "https://static.wixstatic.com/media/592604_42462c7d665c4b85b750f477a965f020~mv2.png/v1/fill/w_193,h_103,al_c,lg_1,q_85,enc_avif,quality_auto/ipc-global-logo.png"
                }
                height={200}
                width={200}
                alt="logo"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your Account
              </p>
            </div>
            <div>
              <Button
                type="button"
                className="w-full cursor-pointer"
                variant={"outline"}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
