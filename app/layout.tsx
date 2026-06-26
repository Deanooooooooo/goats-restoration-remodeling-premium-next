import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deanooooooooo.github.io/goats-restoration-remodeling-premium-next"),
  title: "Goats Restoration & Remodeling | Waterbury CT",
  description:
    "Roofing, remodeling, restoration, kitchen, bathroom and tile work from Goats Restoration and Remodeling LLC in Waterbury, CT.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Goats Restoration & Remodeling | Waterbury CT",
    description:
      "Waterbury roofing, remodeling and restoration services with direct estimates and real customer proof.",
    url: "https://deanooooooooo.github.io/goats-restoration-remodeling-premium-next/",
    images: ["/assets/hero-roof-remodel-highres.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goats Restoration & Remodeling | Waterbury CT",
    description:
      "Roofing, remodeling and restoration services in Waterbury and across Connecticut.",
    images: ["/assets/hero-roof-remodel-highres.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
