import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Cepat Pintar",
  description: "Belajar dengan AI menjadi cepat pintar!",
  verification: {
    google:
      "google-site-verification=Q1Vj2CtXalavovn1xbHCFyjcjjLTqFjpawKtlHR5eHM",
  },
  keywords: "CepatPintar",
  icons: {
    icon: ["/images/logo.svg"],
    apple: ["/images/logo.svg"],
    shortcut: ["/images/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
