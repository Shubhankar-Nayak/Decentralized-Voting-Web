import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Voting DApp",
  description: "A decentralized voting application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

