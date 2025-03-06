import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options";
import AuthProvider from "@/app/[lang]/api/auth/[...nextauth]/auth-provider";
import { inter, lexendDeca } from "@/app/fonts";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { siteConfig } from "@/components/site.config";
import { ThemeProvider } from "@/components/theme-provider";
import cn from "@/ui/class-names";
import GlobalDrawer from "@/components/drawer-views/container";
import GlobalModal from "@/components/modal-views/container";

const NextProgress = dynamic(() => import("@/components/next-progress"), {
  // ssr: true,
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <AuthProvider session={session}>
          <ThemeProvider>
            <NextProgress />
            {children}
            <Toaster
              position={"top-right"}
              toastOptions={{
                duration: 5000,
              }}
            />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
