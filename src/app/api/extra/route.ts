import {getServerSession} from "next-auth"; // https://next-auth.js.org/getting-started/client
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {getUsersByRole} from "@/services/users";

export async function GET(request:Request) {
   try {
       const session = await getServerSession(authOptions);
       const response = NextResponse;
       if (session && session?.user) {
           const extras = await getUsersByRole("EXTRA");
           return response.json(extras, {status: 200});
       } else {
           return response.json({message: "You are not authorized"}, {status: 401});
       }
   } catch (error) {
       return NextResponse.json({message: error}, {status: 500});
   }
}