import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: "Willow OS, Agency Operating System",
  description: "Creative Director & Agency Operating System for Foundation Ventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
