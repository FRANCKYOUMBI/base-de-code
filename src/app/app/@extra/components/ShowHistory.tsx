import React from "react";
import Link from "next/link";
import { Mission } from "@prisma/client";

export default function ShowHistory({ missions }: { missions: Mission[] }) {
    const waitingMissions = missions.filter(mission => mission.status === "WAITING");
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter missions done in the current month
    const missionsThisMonth = missions?.filter((mission) => {
        const createdAtDate = new Date(mission.createdAt!);
        const missionMonth = createdAtDate.getMonth();
        const missionYear = createdAtDate.getFullYear();
        return missionMonth === currentMonth && missionYear === currentYear && mission.status === 'DONE';
    });
    return (
        <div className="w-full xl:w-[50%] flex flex-col gap-[30px]">
            <div className="flex justify-between items-center w-full">
                <h3 className='text-[22px] lg:text-[40px] leading-[26px] md:leading-[47px] font-[600]'>Historique</h3>
                <Link
                    href="/app/historique-missions"
                    className='button-rounded py-[10px] lg:py-[auto] bg-primary text-white px-[20px] md:px-[60px] text-[18px] font-[400] transition-all ease-in-out duration-[0.5s] hover:bg-secondary'
                >
                    Voir plus
                </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-[12px] text-white text-center">
                <div className="bg-black px-[29px] py-[70px] rounded-[20px] shadow-profile-hotel">
                    <h1 className='text-[130px] font-[700] leading-[130px]'>
                        {missionsThisMonth?.length}
                    </h1>
                    <p className='text-[18px] font-[700] leading-[20px] '>MISSIONS TERMINÉES CE MOIS</p>
                </div>
                <div className="bg-primary px-[29px] py-[70px] rounded-[20px] shadow-profile-hotel">
                    <h1 className='text-[130px] font-[700] leading-[130px]'>
                        {waitingMissions?.length}
                    </h1>
                    <p className="text-[18px] font-[700] leading-[20px] px-[40px]">MISSIONS EN ATTENTE</p>
                </div>
            </div>
        </div>
    )
}