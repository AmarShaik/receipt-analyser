import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartReceipt - AI-Powered Receipt Analysis",
  description: "Scan receipts, extract data with AI, and gain intelligent insights into your spending habits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-space antialiased">
        {children}
      </body>
    </html>
  );
}
