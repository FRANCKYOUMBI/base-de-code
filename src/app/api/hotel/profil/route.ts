import prisma from "@/services/prisma";
import {UserType} from "@/types/Datatype";
import {NextResponse} from "next/server";

export async function PUT(request: Request, response: NextResponse) {
    const {uuid, address, phoneNumber, hotelName} = await request.json() as UserType;
    try {
        const userUpdated = await prisma.user.update({
            where: {
                uuid: uuid
            },
            data: {
                address: address,
                phoneNumber: phoneNumber,
                hotelName: hotelName
            }
        });
        return NextResponse.json(userUpdated, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}