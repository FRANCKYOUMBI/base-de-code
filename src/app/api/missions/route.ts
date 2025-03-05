import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { Simulate } from "react-dom/test-utils";
import wheel = Simulate.wheel;
import { MissionStatus } from "@prisma/client";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const date = new Date(searchParams.get('date') ?? '');
    const by = searchParams.get('by') ?? 'day';

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const session = await getServerSession(authOptions);

    if (session) {
        try {
            if (by == 'month') {
                const missions = await prisma.$transaction([
                    prisma.mission.findMany(
                        {
                            where: {
                                hotelId: session?.user?.id,
                                status: MissionStatus.DONE,
                                updatedAt: {
                                    gte: startOfMonth,
                                    lte: endOfMonth
                                },
                            },
                            include: {
                                hotel: true,
                                acceptedBy: true,
                            }
                        }
                    ),

                    prisma.mission.findMany(
                        {
                            where: {
                                hotelId: session?.user?.id,
                                status: MissionStatus.CONFIRM,
                                acceptedAt: {
                                    gte: startOfMonth,
                                    lte: endOfMonth
                                },
                            },
                            include: {
                                hotel: true,
                                acceptedBy: true,
                            }
                        }
                    ),
                    prisma.mission.findMany(
                        {
                            where: {
                                hotelId: session?.user?.id,
                                status: MissionStatus.EXECUTE,
                                updatedAt: {
                                    gte: startOfMonth,
                                    lte: endOfMonth
                                },
                            },
                            include: {
                                hotel: true,
                                acceptedBy: true,
                            }
                        }
                    ),

                    prisma.mission.findMany(
                        {
                            where: {
                                hotelId: session?.user?.id,
                                status: MissionStatus.WAITING,
                                updatedAt: {
                                    gte: startOfMonth,
                                    lte: endOfMonth
                                }
                            },
                            include: {
                                hotel: true,
                                acceptedBy: {
                                    include: {
                                        avatar: true
                                    }
                                },
                            }
                        }
                    )
                ]);
                return NextResponse.json(missions.flat(), { status: 200 })
            } else {
                const missions = await prisma.mission.findMany(
                    {
                        where: {
                            hotelId: session?.user?.id,
                            createdAt: {
                                lt: start,
                                gte: end
                            },
                        },
                    }
                );
                return NextResponse.json(missions.flat(), { status: 200 })
            }
        } catch (e) {
            return NextResponse.json({ detail: e }, { status: 500 })
        }
    } else {
        return NextResponse.json({
            detail: "Aucun utilisateur connecté"
        }, { status: 400 })
    }
}