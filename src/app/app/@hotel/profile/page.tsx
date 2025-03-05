import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInfos } from "../../@extra/profile/components/UserInfos";
import { getUserByUuid } from "@/services/users";
import { PasswordInfo } from "../../@extra/profile/components/PasswordInfo";
import {User} from "@prisma/client";
import { AddDocument } from "@/components/hotel/profile/AddDocument";
// import { useState } from "react";
export default async function ProfilHotel() {
    const session: Session | null = await getServerSession(authOptions);
    const user = await getUserByUuid(session?.user?.id || "") as unknown as User;
//     const [file, setFile] = useState(null);

//   const handleFileChange = (event:any) => {
//     const file = event.target.files[0];
//     setFile(file);
//   };
    return (
        <main className="flex items-center hotel_container justify-center mt-[30px]">
            <div className="flex gap-8 w-[100%]">
                <div className="w-[40%] shadow-profile-hotel p-[30px] flex flex-col justify-center items-center gap-[30px] rounded-[20px]">
                    <UserInfos user={user} avatar={session?.user?.image || null} />
                </div>

                <div className="w-[60%] flex flex-col justify-start items-center gap-[20px]">
                    <PasswordInfo userEmail={user.email} />
                    <AddDocument/>
                </div>
            </div>

        </main>
    )
}