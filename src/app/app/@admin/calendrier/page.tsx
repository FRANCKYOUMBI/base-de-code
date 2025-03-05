import Link from "next/link";
import {getAllMission} from "@/services/mission";
import {ExtraCalendar} from "@/components/calendar/ExtraCalendar";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {getUsersByRole} from "@/services/users";
import React from "react";
export default async function CalendarPage () {
    const requests = await getAllMission();
    const today = new Date();
    const hotels = await getUsersByRole("HOTEL");
    // Request accepted this month
    const requestAccepted = requests?.filter(
        request => request.status === "CONFIRM" && format(request.createdAt!, "MM yyyy") === format(today, "MM yyyy")
    );
    return (
        <div className={'container mx-auto relative mb-[72px] md:mb-[172px]'}>
            <div className={'bg-black rounded-[20px] md:h-[334px] w-full  mx-auto flex flex-col md:flex-row items-center overflow-hidden'}>
                <div className={' relative flex md:pl-[55px]'}>
                    <div className={"bg-[url('/calendar-white.svg')] h-[250px] w-[250px] bg-no-repeat"}></div>
                </div>
                <div className={'flex-1 flex w-full h-full justify-end'}>
                    <div
                        className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                        <div className=" text-white z-10 m-5">
                            <Link href="#" className="button-rounded bg-white text-black text-center z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                CALENDRIER
                            </Link>
                            <p className="mt-4 text-lg text-center" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" bg-black my-6" />
            <ExtraCalendar data={requests!} />
            <div className=" flex gap-10 justify-between mt-[30px]">
                <div className="w-[50%] shadow-normal p-3 rounded-[20px]">
                    <div className="flex w-full gap-10">
                        <div className="text-[#373737] text-center p-5">
                            <h2 className="text-[55px] font-bold leading-[40px]">
                                {format(today, "dd")}
                            </h2>
                            <p className={"text-[25px] font-bold leading-[30px] capitalize"}>
                                {format(today, "MMM", {locale:fr})}
                            </p>
                            <p className={"text-[25px] font-bold leading-[20px] capitalize"}>
                                {format(today, "yyyy", {locale:fr})}
                            </p>
                        </div>
                        <div className="bg-primary rounded w-full flex items-center justify-center">
                            <p className={"text-[25px] font-normal leading-[20px] capitalize text-center text-white"}>
                                Réservations
                            </p>
                        </div>
                    </div>
                    <hr className=" bg-black my-6" />
                    <div className="w-full flex flex-col gap-5">
                        {hotels?.splice(0, 4).map((hotel) => (
                            <div className="flex gap-[24px] px-[20px] py-[10px] w-full shadow-profile-hotel rounded-[20px]">
                                <div className="">
                                    <div
                                        className={"rounded-full bg-cover bg-center"}
                                        style={{
                                            width: 77,
                                            height: 77,
                                            backgroundImage: `url(${hotel?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col text-xs">
                                        <h3 className='w-[200px] text-xs md:text-[20px] text-black font-bold md:font-[400] leading-[29px] truncate'>{hotel.hotelName}</h3>
                                        <p className='mt-[6px] text-sm leading-normal'>{hotel.address || "Adresse non indiquée"}</p>
                                        <div className="mt-[10px]">
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
                                    </div>
                                    <div className=" rounded-full h-[55px] flex items-center justify-center text-white text-[25px] bg-violet w-[55px]">
                                        {hotel.missionsCreated?.length}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="shadow-normal rounded-[20px] p-8 flex flex-col">
                        <h2 className="text-black font-extrabold text-[35px] flex items-center gap-2">
                            <span className={"text-[55px]"}>03</span> Réservations
                        </h2>
                        <Link
                            href={"#"}
                            className={"bg-black py-3 w-full text-center text-white rounded-[20px] hover:bg-primary ease-in-out duration-[0.5s]"}
                        >Afficher</Link>
                    </div>

                    <div className="shadow-normal rounded-[20px] p-8 flex flex-col">
                        <h2 className="text-black font-extrabold text-[35px] flex items-center gap-2">
                            <span className={"text-[55px]"}>{requestAccepted?.length}</span> Missions acceptées
                        </h2>
                        <Link
                            href={"#"}
                            className={"bg-black py-3 w-full text-center text-white rounded-[20px] hover:bg-primary ease-in-out duration-[0.5s]"}
                        >Afficher</Link>
                    </div>

                    <div className="shadow-normal rounded-[20px] p-8 flex flex-col">
                        <h2 className="text-black font-extrabold text-[35px] flex items-center gap-2">
                            <span className={"text-[55px]"}>02</span> Rendez-Vous
                        </h2>
                        <Link
                            href={"#"}
                            className={"bg-black py-3 w-full text-center text-white rounded-[20px] hover:bg-primary ease-in-out duration-[0.5s]"}
                        >Afficher</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}