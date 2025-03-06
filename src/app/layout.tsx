import { inter, lexendDeca } from "@/app/fonts";
import cn from "@/ui/class-names";

import "./[lang]/globals.css";
import { siteConfig } from "@/components/site.config";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true}>
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <body
            // to prevent any warning that is caused by third party extensions like Grammerly
            suppressHydrationWarning={true}
            className={cn(inter.variable, lexendDeca.variable, "font-inter")}
          >
            {children}
        </body>
    </html>
  );
}
