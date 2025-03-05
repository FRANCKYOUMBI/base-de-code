import { ExtraCalendar } from '@/components/calendar/ExtraCalendar'
import { ExtraBarChart } from '@/components/charts/ChartModel'
import React from 'react'
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByUuid } from "@/services/users";
import { addMonths, format, isSameMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { Mission } from '@prisma/client';
import {getAllHotels} from "@/services/hotels";

export default async function HistoriqueMissions() {

    // Get the user's session
    const session: Session | null = await getServerSession(authOptions);

    // Get the user's data
    const user = await getUserByUuid(session?.user?.id || "");

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

    // Filter missions with status 'DONE' from the last month
    const missionsLastMonthDone = missionsLastMonth?.filter((mission) => mission.status === "DONE");

    // Format the date and get the time
    function handleGetTime(date: Date): string {
        return format(date, "HH:mm", { locale: fr });
    }

    // Get hotel list
    const hotelList = await getAllHotels();
    // The hotel selected
    function handleSelectHotel(hotelId: string) {
        return hotelList?.find(hotel => hotel.uuid === hotelId);
    }
    return (
        <div className='hotel_container py-[30px]'>
            <div className="flex flex-col md:flex-row justify-between gap-[40px]">
                <div className="w-full md:w-[50%] flex flex-col gap-[30px]">
                    <div className="flex justify-between flex-col md:flex-row gap-[12px] text-white text-center">
                        <div className="bg-black px-[29px] py-[70px] rounded-[20px] shadow-profile-hotel">
                            <h1 className='text-[130px] font-[700] leading-[130px]'>
                                {missionsThisMonthDone?.length}
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
                <div className="w-full md:w-[50%] rounded-[20px] shadow-profile-hotel">
                    <ExtraBarChart />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-[10px] mt-[50px]">
                <div className="shadow-profile-hotel w-full,  md:w-[82%] rounded-[20px]">
                    <ExtraCalendar
                        data={userMissions}
                    />
                </div>
                <div
                    className="bg-black w-full md:w-[18%] px-[29px] py-[70px] rounded-[20px] shadow-profile-hotel h-full text-center text-white"
                >
                    <h1 className='text-[130px] font-[700] leading-[130px]'>
                        {missionsLastMonthDone?.length}
                    </h1>
                    <p className='text-[18px] font-[700] leading-[20px]'>MISSIONS TERMINÉES LE MOIS DERNIER</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[20px] mt-[50px]">
                <div className="w-full md:w-[50%] flex flex-col gap-[30px]">
                    <div className="flex justify-between items-center w-full">
                        <div
                            className='button-square py-[20px] bg-black text-white px-[60px] text-[18px] font-[400] w-full text-center'
                        >
                            MOIS DERNIER
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        {missionsLastMonth?.filter(item => item.status === "DONE")?.map((mission, index) => (
                            <div key={index} className="flex gap-[24px] px-[20px] py-[10px] shadow-profile-hotel rounded-[20px]">
                                <div className="">
                                    <div className="bg-[url('/images/mission-image.jpeg')] h-[85px] w-[85px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"></div>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex w-[70%] flex-col justify-between">
                                        <h3 className='text-xs md:text-[20px] text-black font-bold md:font-[400] md:leading-[29px] truncate'>
                                            {handleSelectHotel(mission?.hotelId)?.hotelName}
                                        </h3>
                                        <p>{handleSelectHotel(mission?.hotelId)?.address || "Pass d'adresse"}</p>
                                        <p>Shift :
                                            {handleGetTime(new Date(mission?.from!))} - {handleGetTime(new Date(mission?.to!))}
                                        </p>
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
                                                    <svg aria-hidden="true" className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                </button>
                                            ))}
                                        </div>
                                        <h5>
                                            {format(new Date(mission?.createdAt!), 'dd MMM yyyy', { locale: fr })}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-[30px]">
                    <div className="flex justify-between items-center w-full">
                        <div
                            className='button-square py-[20px]  bg-primary text-white px-[60px] text-[18px] font-[400] w-full text-center'
                        >
                            MOIS EN COURS
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        {missionsThisMonth?.map((mission, index: number) => (
                            <div key={index} className="flex gap-[24px] px-[20px] py-[10px] shadow-profile-hotel rounded-[20px]">
                                <div className="">
                                    <div className="bg-[url('/images/mission-image.jpeg')] h-[85px] w-[85px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"></div>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex w-[70%] flex-col justify-between">
                                        <h3 className='text-xs md:text-[20px] text-black font-bold md:font-[400] md:leading-[29px] truncate'>
                                            {handleSelectHotel(mission?.hotelId)?.hotelName}
                                        </h3>
                                        <p>{handleSelectHotel(mission?.hotelId)?.address || "Pass d'adresse"}</p>
                                        <p>Shift :
                                            {handleGetTime(new Date(mission?.from!))} - {handleGetTime(new Date(mission?.to!))}
                                        </p>
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
                                                    <svg aria-hidden="true" className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                </button>
                                            ))}
                                        </div>
                                        <h5>
                                            {format(new Date(mission?.createdAt!), 'dd MMM yyyy', { locale: fr })}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
