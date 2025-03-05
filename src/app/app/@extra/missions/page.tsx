// "use client"
import React, { useState } from "react";
import { HistoryStatCard } from "@/components/cards/CardsModels";
import { getExtraRequestMissions, getMission, getMissions } from "@/services/getData";
import { getUserByUuid } from "@/services/users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { addMonths, format, isSameMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { Mission } from "@prisma/client";
import { getAllHotels } from "@/services/hotels";
import { MissionsComponent } from "@/components/extra/MissionsComponent";
import moment from "moment";

export default async function Missions() {


    // Get the user's session
    const session: Session | null = await getServerSession(authOptions);

    // Get the user's data
    const user = await getUserByUuid(session?.user?.id || "")

    // Get the user's missions
    const userMissions = user?.missionsAccepted as unknown as Mission[]

    // Filter missions with status 'WAITING'
    const waitingMissions = userMissions?.filter(mission => mission.status === "WAITING");

    // Get the current month and year
    const currentDate = new Date();

    // Get the current month
    const currentMonth = addMonths(currentDate, 0);

    // Filter missions in current month
    const missionsThisMonth = userMissions?.filter((mission) =>
        isSameMonth(new Date(mission.createdAt!), currentMonth)
    );

    // Filter missions with status 'DONE' in current month
    const missionsThisMonthDone = missionsThisMonth?.filter((mission) => mission.status === "DONE");

    // Get the date range for the last month
    const lastMonth = addMonths(currentDate, -1);

    // Filter missions from the last month
    const missionsLastMonth = userMissions?.filter((mission) =>
        isSameMonth(new Date(mission.createdAt!), lastMonth)
    );
    // getExtraMissions
    const extraMission = await getExtraRequestMissions()
    // Filter missions with status 'DONE' from the last month
    const missionsLastMonthDone = missionsLastMonth?.filter((mission) => mission.status === "DONE");

    // Format the date and get the time
    function handleGetTime(date: Date): string {
        return moment(date).format("HH:mm");
    }

    // Get hotel list
    const hotelList = await getAllHotels();
    // The hotel selected
    function handleSelectHotel(hotelId: string) {
        return hotelList?.find(hotel => hotel.uuid === hotelId);
    }

    return (
        <main className="hotel_container">
            <div className="container mx-auto grid gap-4 xl:grid-cols-2  ">
                <div className="pl-5 lg:pl-0 ">
                    <div>
                        <div className="flex justify-between items-center w-full">
                            <h3 className='text-[22px] lg:text-[40px] leading-[26px] md:leading-[47px] font-[600]'>Historique</h3>
                        </div>
                        <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-10 mt-[30px]">
                            <HistoryStatCard
                                type="black"
                                mainText={`${missionsLastMonthDone?.length}`}
                                subText="MISSIONS TERMINÉES LE MOIS DERNIER"
                                style=" h-[334px] flex flex-col justify-center"
                            />
                            <HistoryStatCard
                                type="primary"
                                mainText={`${missionsThisMonthDone?.length}`}
                                subText="MISSIONS TERMINÉES CE MOIS"
                                style=" h-[334px] flex flex-col justify-center"
                            />
                        </div>
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex justify-between items-center w-full">
                            <h3 className='text-[22px] lg:text-[40px] leading-[26px] md:leading-[47px] font-[600]'>En cours</h3>
                        </div>
                        <div className="flex flex-col gap-[12px] mt-[30px]">
                            {missionsThisMonth?.map((mission, index: number) => (
                                <div key={index} className="flex gap-3 md:gap-[24px] px-[20px] py-[10px] shadow-profile-hotel rounded-[20px]">
                                   <div key={index} className="flex gap-3 md:gap-[24px] px-2 py-2 items-center md:px-[20px] md:py-[10px] shadow-profile-hotel rounded-[20px]">
                                    <div className="">
                                        <div className="bg-[url('/images/mission-image.jpeg')] h-[50px] w-[50px] md:h-[80px] md:w-[80px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"></div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col text-xs justify-between">
                                            <h3 className='text-xs md:text-[20px] text-black font-bold md:font-[400] leading-[29px] w-24 md:w-[237px] lg:w-[100px] xl:w-[200px] truncate'>{handleSelectHotel(mission?.hotelId)?.hotelName}</h3>
                                            <p>{handleSelectHotel(mission?.hotelId)?.address || "Pass d'adresse"}</p>
                                            <p>Shift : {format(mission?.from!, "HH:mm", { locale: fr })} - {format(mission?.to!, "HH:mm", { locale: fr })}</p>
                                        </div>
                                        <div className="flex flex-col justify-between ">
                                            <div className="">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <button
                                                        type='button'
                                                        key={value}
                                                        className={`mr-1 focus:outline-none ${value <= 3 ? 'text-primary' : 'text-[#D9D9D9]'
                                                            }`}
                                                    >
                                                        <svg aria-hidden="true" className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    </button>
                                                ))}
                                            </div>
                                            <h5 className="text-xs">{format(new Date(mission?.createdAt!), 'dd MMM yyyy', { locale: fr })}</h5>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="pl-5 lg:pl-0">
                    <div>
                        <div className="flex justify-between items-center w-full">
                            <h3 className='text-[22px] lg:text-[40px] leading-[26px] md:leading-[47px] font-[600]'>Mois dernier</h3>
                        </div>
                        <div className="flex flex-col gap-[12px] mt-[25px]">
                            {missionsLastMonth?.filter(item => item.status === "DONE")?.map((mission, index) => (
                                <div key={index} className="flex gap-3 md:gap-[24px] px-2 py-2 items-center md:px-[20px] md:py-[10px] shadow-profile-hotel rounded-[20px]">
                                    <div className="">
                                        <div className="bg-[url('/images/mission-image.jpeg')] h-[50px] w-[50px] md:h-[80px] md:w-[80px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"></div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col text-xs justify-between">
                                            <h3 className='text-xs md:text-[20px] text-black font-bold md:font-[400] leading-[29px] w-24 md:w-[237px] lg:w-[100px] xl:w-[200px] truncate'>{handleSelectHotel(mission?.hotelId)?.hotelName}</h3>
                                            <p>{handleSelectHotel(mission?.hotelId)?.address || "Pass d'adresse"}</p>
                                            <p>Shift : {format(mission?.from!, "HH:mm", { locale: fr })} - {format(mission?.to!, "HH:mm", { locale: fr })}</p>
                                        </div>
                                        <div className="flex flex-col justify-between ">
                                            <div className="">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <button
                                                        type='button'
                                                        key={value}
                                                        className={`mr-1 focus:outline-none ${value <= 3 ? 'text-primary' : 'text-[#D9D9D9]'
                                                            }`}
                                                    >
                                                        <svg aria-hidden="true" className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    </button>
                                                ))}
                                            </div>
                                            <h5 className="text-xs">{format(new Date(mission?.createdAt!), 'dd MMM yyyy', { locale: fr })}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex justify-between items-center w-full">
                            <h3 className='text-[22px] lg:text-[40px] leading-[26px] md:leading-[47px] font-[600]'>En attentes</h3>
                        </div>
                        <div className="flex flex-col gap-[12px] mt-[30px]">
                            {waitingMissions?.map((mission, index) => (
                                <MissionsComponent mission={mission} key={index} hotelList={hotelList} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}