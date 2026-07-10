import type { Metadata } from "next";
import { Italiana, Jura, Crimson_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

const jura = Jura({
  variable: "--font-jura",
  weight: ["300", "500"],
  subsets: ["latin", "latin-ext"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Sade Design — İç Mimarlık & Tasarım",
  description:
    "Sade Design; iç mimari proje, 3D görselleştirme, anahtar teslim uygulama ve dekorasyon danışmanlığı sunar. Az olan, doğru olandır.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${italiana.variable} ${jura.variable} ${crimson.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
