import {NextResponse} from "next/server";
import prisma from "@/services/prisma";
import {BankInfoType} from "@/types/Datatype";

export async function POST(request: Request) {
    const {userId, rib, paypal } = await request.json() as BankInfoType;
    try {
        const bankInfoCreated = await prisma.extraBankInfo.create({
            data: {
                rib: rib,
                paypal: paypal,
                user: {
                    connect: {
                        uuid: userId
                    }
                }
            }
        });
        return NextResponse.json(bankInfoCreated, {status: 201});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}


export async function PUT(request: Request):Promise<NextResponse<BankInfoType | any>> {
    const {uuid, rib, paypal } = await request.json() as BankInfoType;
    try {
        const bankInfoUpdated = await prisma.extraBankInfo.update({
            where: {
                uuid: uuid
            },
            data: {
                rib: rib,
                paypal: paypal,
            }
        });
        return NextResponse.json(bankInfoUpdated, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}