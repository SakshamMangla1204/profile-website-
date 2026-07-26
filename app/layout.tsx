import type { Metadata } from "next";

import "@/app/globals.css";
import { siteConfig } from "@/data/site-config";
import { SideAura } from "@/components/visuals/side-aura";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        {/* Moonlight glow overlay */}
        <div className="fixed inset-0 moonlight pointer-events-none z-0" />
        {/* Side particles */}
        <SideAura />
        <div className="relative z-10">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}