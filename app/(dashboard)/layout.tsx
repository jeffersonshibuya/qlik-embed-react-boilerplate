import { MenuNavigation } from "@/features/app-layout/components/menu";
import { UserInfo } from "@/features/app-layout/components/userInfo";
import type { Metadata } from "next";
import { Wrapper } from "./wrapper";

export const metadata: Metadata = {
  title: "Qlik Embed - React - Dashboard",
  description: "",
};

export default function DahsboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserInfo />
        <MenuNavigation />
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
