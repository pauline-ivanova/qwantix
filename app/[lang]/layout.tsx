import { Inter } from "next/font/google";
import "../globals.css";
import { i18n, Locale } from "@/i18n.config";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ScrollToTopButton from "@/app/components/common/ScrollToTopButton";
import DotNav from "@/app/components/common/DotNav";
import ScrollProgressBar from "@/app/components/common/ScrollProgressBar";
import { ThemeWrapper } from "@/app/components/ThemeWrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Qwantix: Digital Marketing Powered by Analytics",
  description: "Grow your business with digital marketing powered by analytics",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <head>
        <link rel="preconnect" href="https://placehold.co" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeWrapper>
          <ScrollProgressBar />
          <Header />
          <DotNav />
          <main className="bg-white dark:bg-gray-900">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </ThemeWrapper>
      </body>
    </html>
  );
}
