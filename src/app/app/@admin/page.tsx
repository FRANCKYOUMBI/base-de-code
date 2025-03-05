import {getAllMission} from "@/services/mission";
import {HomeRequestCarrousel} from "@/app/app/@admin/components/HomeRequestCarrousel";
import Link from "next/link";
import {ExtraCalendar} from "@/components/calendar/ExtraCalendar";
import {getUsersByRole} from "@/services/users";
import {HomeHotelsCarrousel} from "@/app/app/@admin/components/HomeHotelsCarrousel";
import {HomeExtraCarrousel} from "@/app/app/@admin/components/HomeExtrasCarrousel";
import {ExtraAreaChart} from "@/components/charts/ChartModel";
import {isFriday, isMonday, isThisWeek, isThursday, isTuesday, isWednesday} from "date-fns";


export default async function AdminHomePage () {
    const requests = await getAllMission();
    const extras = await getUsersByRole('EXTRA');
    const hotels = await getUsersByRole('HOTEL');
    // requests with status WAITING
    const waitingRequests = requests?.filter((request) => request.status === 'WAITING');

    const missionsThisWeek = requests?.filter(
        (mission) =>
            isThisWeek(new Date(mission.createdAt), { weekStartsOn: 1 }) && mission.status === "DONE"
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
        <div className={''}>
            <div className={"flex flex-col gap-10"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Requettes
                        <span className={"bg-primary rounded-[30px] py-1 px-4 text-white"}>
                            {waitingRequests?.length}
                        </span>
                    </h1>
                    <Link
                        href={'/app/requests'}
                        className={"bg-primary text-white hover:bg-secondary rounded-[30px] px-4 py-2 font-bold ease-in-out transition-all duration-[500ms]"}
                    >
                        Voir la suite
                    </Link>
                </div>
                <HomeRequestCarrousel requests={ waitingRequests?.splice(0, 6)! } />
            </div>
            <hr className=" bg-black my-6" />
            <div className={"flex flex-col gap-5 mt-10"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Calendrier
                    </h1>
                    <Link
                        href={'/app/calendier'}
                        className={"bg-primary text-white hover:bg-secondary rounded-[30px] px-4 py-2 font-bold ease-in-out transition-all duration-[500ms]"}
                    >
                        Voir la suite
                    </Link>
                </div>
                <ExtraCalendar data={requests!} />
            </div>
            <hr className=" bg-black my-6" />
            <div className={"flex flex-col gap-0 mt-10"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Extras
                        <span className={"bg-primary rounded-[30px] py-1 px-4 text-white"}>
                            {extras?.length}
                        </span>
                    </h1>
                    <Link
                        href={'/app/calendier'}
                        className={"bg-primary text-white hover:bg-secondary rounded-[30px] px-4 py-2 font-bold ease-in-out transition-all duration-[500ms]"}
                    >
                        Voir la suite
                    </Link>
                </div>
                <HomeExtraCarrousel extras={extras?.splice(0, 6)!} />
            </div>
            <hr className=" bg-black my-6" />
            <div className={"flex flex-col gap-0 mt-10"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Hotels
                        <span className={"bg-primary rounded-[30px] py-1 px-4 text-white"}>
                            {hotels?.length}
                        </span>
                    </h1>
                    <Link
                        href={'/app/calendier'}
                        className={"bg-primary text-white hover:bg-secondary rounded-[30px] px-4 py-2 font-bold ease-in-out transition-all duration-[500ms]"}
                    >
                        Voir la suite
                    </Link>
                </div>
                <HomeHotelsCarrousel hotels={ hotels?.splice(0, 6)! } />
            </div>
            <hr className=" bg-black my-6" />
            <div className={"flex flex-col gap-5 mt-10"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Historique des missions
                    </h1>
                </div>
                <div className=" flex">
                    <div className={'container mx-auto'}>
                        <div
                            className={"bg-[url('/hextrabg.svg')]  rounded-[20px] h-[122px] max-w-[600px] mx-auto flex items-center overflow-hidden"}>
                            <div className={'w-[30%]'}>
                            </div>
                            <div className={'flex-1 flex w-full h-full justify-end'}>
                                <div
                                    className={" relative flex items-center justify-center h-full w-9/12 bg-primary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-[-30px] before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-primary before:rounded-[20px]"}>
                                    <div className=" z-10 m-5">
                                        <h2 className="text-white mb-5 text-[18px] font-semibold uppercase">Pour les extras </h2>
                                        <Link href={"/app/historique-missions"} className="px-[25px] py-2 rounded-[30px] bg-white z-[2] text-[12px] sm:text-sm md:text-lg">
                                            Afficher
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'container mx-auto'}>
                        <div
                            className={"bg-[url('/hmissionbg.svg')] rounded-[20px] h-[122px] max-w-[600px] mx-auto flex items-center overflow-hidden"}>
                            <div className={'w-[30%]'}>
                            </div>
                            <div className={'flex-1 flex w-full h-full justify-end'}>
                                <div
                                    className={" relative flex items-center justify-center h-full w-9/12 bg-primary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-[-30px] before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-primary before:rounded-[20px]"}>
                                    <div className="z-10 m-5">
                                        <h2 className="text-white mb-5 text-[18px] font-semibold uppercase">Pour les hôtels </h2>
                                        <Link href={"/app/historique-missions"} className="px-[25px] py-2 rounded-[30px] bg-white z-[2] text-[12px] sm:text-sm md:text-lg ">
                                            Afficher
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" bg-black my-6" />
            <div className={"flex flex-col gap-5 mt-10 mb-20"}>
                <div className="flex justify-between items-center">
                    <h1 className={"text-2xl font-[600] flex gap-2 text-[#373737] items-center text-[25px]"}>
                        Facturation
                    </h1>
                    <Link
                        href={'/app/facturation'}
                        className={"bg-primary text-white hover:bg-secondary rounded-[30px] px-4 py-2 font-bold ease-in-out transition-all duration-[500ms]"}
                    >
                        Voir la suite
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-[25%] h-full bg-secondary text-white p-10 rounded-[20px]">
                        <h2 className="text-[45px] font-bold italic leading-[76px] text-center">
                            4783€
                        </h2>
                        <p className={"text-[18px] font-bold leading-[30px] text-center"}>
                            MOIS EN COURS
                        </p>
                    </div>
                    <div className="w-[25%] h-full bg-black text-white p-10 rounded-[20px]">
                        <h2 className="text-[45px] font-bold italic leading-[76px] text-center">
                            3529€
                        </h2>
                        <p className={"text-[18px] font-bold leading-[30px] text-center"}>
                            MOIS PRÉCÉDANT
                        </p>
                    </div>
                    <div className="w-[50%] shadow-normal rounded-[20px]">
                        <ExtraAreaChart data={missionsThisWeekByDay} />
                    </div>
                </div>
            </div>

        </div>
    )
}