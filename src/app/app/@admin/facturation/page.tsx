import Link from "next/link";
import {isFriday, isMonday, isThisWeek, isThursday, isTuesday, isWednesday} from "date-fns";
import {getAllMission} from "@/services/mission";
import {ExtraAreaChart} from "@/components/charts/ChartModel";
import {ListBilling} from "@/app/app/@admin/facturation/components/ListBilling";

export default async function BillingPage () {
    const requests = await getAllMission();
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
        <div className={'container mx-auto relative mb-[72px] md:mb-[172px]'}>
            <div className={'bg-black rounded-[20px] md:h-[334px] w-full  mx-auto flex flex-col md:flex-row items-center overflow-hidden'}>
                <div className={' relative flex md:pl-[55px]'}>
                    <div className={"bg-[url('/coupon.svg')] h-[250px] w-[250px] bg-no-repeat"}></div>
                </div>
                <div className={'flex-1 flex w-full h-full justify-end'}>
                    <div
                        className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                        <div className=" text-white z-10 m-5">
                            <Link href="#" className="button-rounded bg-white text-black text-center z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                FACTURATION
                            </Link>
                            <p className="mt-4 text-lg text-center" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p>
                        </div>
                    </div>
                </div>
            </div>
            <ListBilling requests={requests!} />
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

    )
}