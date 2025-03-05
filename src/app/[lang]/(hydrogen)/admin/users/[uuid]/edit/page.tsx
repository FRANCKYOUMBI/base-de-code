"use cleint";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Metadata } from "next";
import { getUserById } from "./action";
import { ServerMessage } from "@/services/types";
import { userData } from "@/services/types/user";
import CreateUser from "@/app/shared/users/create-user";
import PageHeader from "@/components/page-header";
import { metaObject } from "@/components/site.config";


type Props = {
  params: { uuid: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const uuid = params.uuid;

  return metaObject(`Editer l'utilisateur #${uuid}`);

}

const pageHeader = {
  title: "Editer  l'utilisateur",
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
      name: "Editer",
    },
  ],
};

export default async function  EditUserPage({ params }: Props)  {
    const uuid = params.uuid;
  const user = await getUserById(uuid);

  console.log("user",(user as ServerMessage).message)


  
 
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
    { user as ServerMessage ? <CreateUser userId={uuid} user={user as userData} />: <div>{(user as ServerMessage).message}</div> }
        
    </>
  );
}
