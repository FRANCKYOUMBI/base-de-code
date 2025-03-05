import {NextResponse} from "next/server";
import {changePassword} from "@/services/users";
import {PasswordForm} from "@/types/Datatype";

export async function PUT(request: Request, response: NextResponse) {
    const requestData = await request.json() as PasswordForm;
    try {
        const userUpdated = await changePassword(requestData);
       if (userUpdated.success) {
           return NextResponse.json({message: userUpdated.success}, {status: 200});
       } else if (userUpdated.badPassword) {
           return NextResponse.json({message: userUpdated.badPassword}, {status: 400});
       } else if (userUpdated.notExist) {
           return NextResponse.json({message: userUpdated.notExist}, {status: 404});
       } else {
           return NextResponse.json({message: userUpdated.error}, {status: 500});
       }
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}