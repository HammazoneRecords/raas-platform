import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { RoleProvider } from "@/lib/raas/role";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RAAS — Reggae As A Service · MindWave JA",
    template: "%s · RAAS",
  },
  description:
    "PayPal for reggae · Starlink for culture · Amazon for riddim. Own your music. Own your fans. Own your digital domain.",
  keywords: [
    "RAAS",
    "Reggae As A Service",
    "MindWave JA",
    "Jamaica",
    "artist platform",
    "Cultural API",
    "ADTL",
  ],
  authors: [{ name: "MindWave JA" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "RAAS — Reggae As A Service",
    description:
      "Own your music. Own your fans. Own your digital domain. PayPal for reggae · Starlink for culture · Amazon for riddim.",
    siteName: "RAAS · MindWave JA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased`}
        style={{ background: "#0a0a0f", color: "#e2e8f0" }}
      >
        <RoleProvider>{children}</RoleProvider>
        <Toaster />
      </body>
    </html>
  );
}
