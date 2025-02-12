import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "@/components/ThemProvider";
import { siteConfig } from "@/config/site";
import GlobalLayout from "@/components/GlobalLayout";
import SolanaProvider from "@/components/SolanaProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <NextIntlClientProvider messages={messages}>
            <SolanaProvider>
              <GlobalLayout>{children}</GlobalLayout>
            </SolanaProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
