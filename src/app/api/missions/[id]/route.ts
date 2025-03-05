import { Mission} from "@prisma/client";
import {NextResponse} from "next/server";
import {changeStatusMission} from "@/services/mission";

export async function PUT(request: Request, response: NextResponse) {
    const requestData = await request.json();
    const missionId = request.url.split("missions/")[1]
    try {
        const userUpdated = await changeStatusMission(missionId);
       if (userUpdated.success) {
           return NextResponse.json({message: userUpdated.success}, {status: 200});
       } else if (userUpdated.echec) {
           return NextResponse.json({message: userUpdated.echec}, {status: 400});
       }  else {
           return NextResponse.json({message: userUpdated.error}, {status: 500});
       }
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}