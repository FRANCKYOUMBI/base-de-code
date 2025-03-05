import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { ICreateMissionServer, ICreateTask, MissionStatus, ShiftType } from "@/types/missions";
import prisma from "@/services/prisma";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";
import { Mission } from "@prisma/client";

export async function POST(req: Request) {
  const body: ICreateTask = await req.json()
  let reference = faker.string.alphanumeric(6).toLocaleUpperCase();

  console.log('body: ', body.hotel_id)

  try {
    const mission = await prisma.mission.create({
      data: {
        from: new Date(`${body.startDate}T${body.hourStart}:00`).toISOString(),
        to: new Date(`${body.endDate}T${body.hourEnd}:00`).toISOString(),
        key: faker.string.alphanumeric(12).toLocaleUpperCase(),
        reference: reference,
        shiftType: body.schift,
        hours: body.hours,
        hotel: {
          connect: {
            uuid: body.hotel_id,
          }
        },
        status: MissionStatus.CONFIRM,
      },
      include: {
        hotel: true,
      }
    })
    if (mission satisfies Mission) {
      return NextResponse.json(mission, { status: 200 })
    } else {
      return NextResponse.json(mission, { status: 400 })
    }
  } catch (e) {
    console.log('error: ', e)
    return NextResponse.json(e, { status: 500 })
  }
}
