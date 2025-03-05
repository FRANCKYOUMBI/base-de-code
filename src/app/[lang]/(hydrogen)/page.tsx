import HomePage from "@/app/shared/home_page";
import { metaObject } from "@/components/site.config";

export const metadata = {
  ...metaObject(),
};

export default async function ClientHomePage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <HomePage />;
}

