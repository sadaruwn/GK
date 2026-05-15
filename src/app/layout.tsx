import type { Metadata } from "next";
import "./globals.css";
import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const notoNo = Noto_Sans_Sinhala({ subsets: ["sinhala"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "GK Learning - Master Your Subjects",
  description: "Join 10,000+ students. Watch full video explanations, test your skills, and improve your rank daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoNo.className}`}>
        {children}
        <Script src="https://apis.google.com/js/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
