import type { Metadata } from "next";
import { Wrapper } from "./wrapper";
import { AppSidebar } from "@/features/app-layout/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/features/app-layout/components/site-header";
import { QlikInitializer } from "@/components/qlik-initializer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Qlik Embed - React - Dashboard",
  description: "",
};

export default async function DahsboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QlikInitializer />
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <NuqsAdapter>
              <div className="flex flex-1 flex-col p-4">
                <Wrapper>{children}</Wrapper>
              </div>
            </NuqsAdapter>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
