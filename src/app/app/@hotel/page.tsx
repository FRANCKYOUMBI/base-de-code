import {DateRange} from 'react-date-range';
import PageSideLeft from "@/components/hotel/nouvelle-requete/PageSideLeft";
import PageSideRight from "@/components/hotel/nouvelle-requete/PageSideRight";
import prisma from "@/services/prisma";
import {Software, Document} from "@prisma/client";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function NouvelleRequete() {

    const software: Software[] = await prisma.software.findMany();
    const documents: Document[] = await prisma.document.findMany({take: 7});
    const session: Session | null = await getServerSession(authOptions);

    return (
        <main className={'h-full hotel_container grid grid-cols-2 gap-[8px]'}>
            <PageSideLeft session={session} software={software} documents={documents}/>
            <PageSideRight/>
        </main>
    )
}