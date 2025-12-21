import "../globals.css";
import { i18n, Locale } from "@/i18n.config";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ScrollToTopButton from "@/app/components/common/ScrollToTopButton";
import DotNav from "@/app/components/common/DotNav";
import ScrollProgressBar from "@/app/components/common/ScrollProgressBar";
import { ThemeWrapper } from "@/app/components/ThemeWrapper";
import { Metadata } from "next";
import DeferredComponents from "@/app/components/layout/DeferredComponents";
import HtmlLangSetter from "@/app/components/common/HtmlLangSetter";
import GoogleTagManager from "@/app/components/analytics/GoogleTagManager";
import ScrollDepthTracker from "@/app/components/analytics/ScrollDepthTracker";
import CoreWebVitals from "@/app/components/analytics/CoreWebVitals";
import SchemaOrg from "@/app/components/common/SchemaOrg";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = i18n.locales.includes(resolvedParams.lang as Locale) ? (resolvedParams.lang as Locale) : i18n.defaultLocale;
  
  return {
    title: "Qwantix: Digital Marketing Powered by Analytics",
    description: "Grow your business with digital marketing powered by analytics",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.png",
    },
    // Set HTML lang attribute for better SEO
    other: {
      'html-lang': lang,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  // Handle params as Promise in Next.js 16
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = i18n.locales.includes(resolvedParams.lang as Locale) ? (resolvedParams.lang as Locale) : i18n.defaultLocale;

  return (
    <ThemeWrapper>
      <GoogleTagManager />
      <ScrollDepthTracker />
      <CoreWebVitals />
      <HtmlLangSetter />
      <SchemaOrg lang={lang} type="Organization" />
      <SchemaOrg lang={lang} type="WebPage" />
      <ScrollProgressBar />
      <Header />
      <DotNav />
      <main className="bg-white dark:bg-gray-900" suppressHydrationWarning>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      {/* Defer non-critical components to reduce TBT */}
      <DeferredComponents />
    </ThemeWrapper>
  );
}
