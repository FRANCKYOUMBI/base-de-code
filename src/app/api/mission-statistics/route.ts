import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import prisma from "@/services/prisma";
import {MissionsStatistics} from "@/types/Datatype";
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;
import {MissionStatus} from "@prisma/client";

export async function POST(req: Request): Promise<NextResponse<MissionsStatistics | { detail: any }>> {
    const body: { date: Date } = await req.json();
    const date = new Date(body.date)
    const session = await getServerSession(authOptions);

    const startOfMonth = new Date( date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date( date.getFullYear(), date.getMonth() + 1,  0);
    if (session) {
        try {
            const done = await prisma.mission.count({
                where: {
                    hotelId: session?.user?.id ?? '',
                    status: MissionStatus.DONE,
                    updatedAt: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    },
                },
            })

            const confirmed = await prisma.mission.count({
                where: {
                    hotelId: session?.user?.id ?? '',
                    status: MissionStatus.CONFIRM,
                    acceptedAt: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                }
            })
            const executed = await prisma.mission.count({
                where: {
                    hotelId: session?.user?.id ?? '',
                    status: MissionStatus.EXECUTE,
                    updatedAt: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                }
            })

            const waiting = await prisma.mission.count({
                where: {
                    hotelId: session?.user?.id,
                    status: MissionStatus.WAITING,
                    updatedAt: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                }
            })

            return NextResponse.json({
                executed: executed,
                waiting: waiting,
                done: done,
                confirmed: confirmed
            }, {status: 200})
        } catch (e) {
            return NextResponse.json({detail: e}, {status: 500})
        }
    } else {
        return NextResponse.json({
            detail: "Aucun utilisateur connecté"
        }, {status: 400})
    }
}