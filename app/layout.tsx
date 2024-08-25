import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decision Support System",
  description: "A powerful tool for generating and saving decision outcomes using advanced models. Integrate with MongoDB for persistent storage and seamless data management.",
  keywords: ["Decision Support System", "Decision Making", "MongoDB", "Data Management", "Next.js", "AI Models", "Decision Outcomes", "Advanced Models", "Persistent Storage"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
