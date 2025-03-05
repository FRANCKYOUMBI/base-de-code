"use client"

import { UserType } from "@/types/Datatype"
import { RapportDetails } from '@/components/Admin/RapportDetails';
import { useState } from "react"
import { ExtraCard } from "@/app/app/@admin/extras/components/ExtraCard";
import { ExtraRapport } from "@/app/app/@admin/rapport/components/ExtraRapport";

export default function RapportLayout({ extras }: { extras: UserType[] | null }) {

    const [currentUser, setCurrentUser] = useState<UserType>()



    return (
        <>
            <div>
                {
                    !!currentUser && (

                        <RapportDetails extra={currentUser} />
                    )
                }
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {extras?.map((extra: UserType) =>
                    <ExtraRapport
                        key={extra.uuid}
                        extra={extra}
                        setCurrentUSer={setCurrentUser}
                    />
                )}
            </div>
        </>
    )
}