import { Button } from "rizzui";
import { routes } from "@/config/routes";
import Link from "next/link";
import CreateUser from "@/app/shared/users/create-user";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/components/site.config";

export const metadata = {
  ...metaObject("Add user"),
};

const pageHeader = {
  title: "Ajouter un utilisateur",
  breadcrumb: [
    {
      href: routes.admin,
      name: "Accueil",
    },
    {
      href: routes.users.listing,
      name: "Utilisateurs",
    },
    {
      href: routes.users.create,
      name: "Ajouter",
    },
  ],
};

export default function CreateUserPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.users.listing}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Annuler
          </Button>
        </Link>
      </PageHeader>
      <CreateUser/>
    </>
  );
}
