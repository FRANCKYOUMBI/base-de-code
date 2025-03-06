import { routes } from "@/config/routes";
import Link from "next/link";
import { Button } from "rizzui";
import { PiPlusBold } from "react-icons/pi";
import { RolesTable } from "@/app/shared/users/roles/table";
import { metaObject } from "@/components/site.config";
import PageHeader from "@/components/page-header";

export const metadata = {
  ...metaObject("Gestion des utilisateurs"),
};

interface UsersPageProps {
  params: {
    lang: string;
  };
}

export default async function RolesPage({ params: { lang } }: UsersPageProps) {
  const pageHeader = {
    title: "Liste des rôles ",
    breadcrumb: [
      {
        href: routes.admin,
        name: "Accueil",
      },
     
      {
        href: routes.users.roles.listing,
        name: "Rôles",
      },
    ],
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={""} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Ajouter un rôle
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RolesTable />
    </>
  );
}
