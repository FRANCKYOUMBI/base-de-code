import {NextResponse} from "next/server";
import prisma from "@/services/prisma";

export async  function GET(request:Request, response:NextResponse) {
    const id = request.url.split("/profile")[1];
    try {
        const user = await prisma.user.findFirst({
            where: {
                uuid: id
            },
            include: {
                missionsAccepted: true,
                missionsCreated: true,
                requestedMissions: true,
                reviews: true,
                skills: true,
                softwares: true,
                documents: true,
                extraBankInfo: true,
            }
        });
        if (user) {
            return NextResponse.json(user, {status: 200});
        } else {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}