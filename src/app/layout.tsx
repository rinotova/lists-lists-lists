import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import Navbar from "./_components/Navbar";
import { Toaster } from "./_components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lists lists lists",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.variable)}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
          </main>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
