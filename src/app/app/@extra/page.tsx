import { ExtraCalendar } from '@/components/calendar/ExtraCalendar'
import { ExtraAreaChart } from '@/components/charts/ChartModel'
import React from 'react';
import { getUserByUuid } from "@/services/users";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ShowHistory from "@/app/app/@extra/components/ShowHistory";
import ListMissions from "@/app/app/@extra/components/ListMissions";
import { isSameMonth, addMonths, isThisWeek, isMonday, isTuesday, isWednesday, isThursday, isFriday } from "date-fns";
import { Mission } from '@prisma/client';
import { getAllHotels } from "@/services/hotels";

export default async function ExtraHomePage() {
    const session: Session | null = await getServerSession(authOptions);
    const user = await getUserByUuid(session?.user?.id || "");
    const userMissions = user?.missionsAccepted as unknown as Mission[];

    const hotelList = await getAllHotels();
    // The hotel selected

    // Get the date range for the last month
    const currentDate = new Date();

    // Filter missions from the last month
    const lastMonth = addMonths(currentDate, -1);
    const missionsLastMonth = userMissions?.filter((mission) =>
        isSameMonth(new Date(mission.createdAt), lastMonth)
    );

    // Filter missions from this week
    const missionsThisWeek = userMissions?.filter(
        (mission) =>
            isThisWeek(new Date(mission.createdAt), { weekStartsOn: 1 })
    );

    // Mission for each date from Monday to Friday
    const missionsThisWeekByDay = [
        missionsThisWeek?.filter((mission) => isMonday(new Date(mission.createdAt))).length,
        missionsThisWeek?.filter((mission) => isTuesday(new Date(mission.createdAt))).length,
        missionsThisWeek?.filter((mission) => isWednesday(new Date(mission.createdAt))).length,
        missionsThisWeek?.filter((mission) => isThursday(new Date(mission.createdAt))).length,
        missionsThisWeek?.filter((mission) => isFriday(new Date(mission.createdAt))).length,
    ]
    return (
        <main className='hotel_container lg:mt-[60px] lg:px-[30px]'>
            <div className='container mx-auto '>
                <div className='pl-5 lg:pl-0'>
                    <div className="flex flex-col xl:flex-row justify-between gap-[12px]">
                        <ShowHistory
                            missions={userMissions}
                        />
                        <ListMissions
                            hotels={hotelList}
                            missions={userMissions}
                        />
                    </div>
                    <div className="shadow-profile-hotel mt-[50px]">
                        <ExtraCalendar
                            data={userMissions}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row mt-[80px] pb-[90px] gap-5">
                        <div className="w-full md:w-[96%] rounded-[20px] shadow-profile-hotel p-2 md:p-5">
                            <ExtraAreaChart data={missionsThisWeekByDay} />
                        </div>
                        <div className="bg-black px-[29px] py-[70px] rounded-[20px] shadow-profile-hotel text-center text-white">
                            <h1 className='text-[130px] font-[700] leading-[130px]'>
                                {missionsLastMonth?.filter((mission) => mission.status === "DONE").length}
                            </h1>
                            <p className='text-[18px] font-[700] leading-[20px] '>MISSIONS TERMINÉES LE MOIS DERNIER</p>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}
