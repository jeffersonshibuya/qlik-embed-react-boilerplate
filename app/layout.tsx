import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/query-provider";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Qlik Embed - React",
  description: "Boilerplate to use Qlik-Embed with ReactJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster richColors expand duration={3000} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Suspense fallback={<div>Loading....</div>}>{children}</Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
