import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";




export const metadata: Metadata = {
  title: "satadiya digital village",
  description: "Bringing Satadiya closer to the world",
};

import  { NavigationMenum } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
            <main>
             
              <NavigationMenum />
              {children}
            </main>
        
         </ThemeProvider>
      </body>
    </html>
  );
}
