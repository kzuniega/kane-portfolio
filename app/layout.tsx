import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Kane Zuniega — Portfolio",
  description: "Kane Zuniega, Software Engineer. Freelancer from the Philippines.",
  openGraph: {
    title: "Kane Zuniega — Portfolio",
    description: "Kane Zuniega, Software Engineer. Freelancer from the Philippines.",
    url: "/",
    siteName: "Kane Zuniega",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kane Zuniega — Portfolio" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bodyFont.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
