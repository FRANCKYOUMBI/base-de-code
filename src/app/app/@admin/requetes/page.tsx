import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RequestComponent } from "@/components/Admin/RequestComponent";
import { getExtraRequestMissions } from "@/services/getData";
import { getUserByUuid } from "@/services/users";
import { Mission } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
export default async function RequestPage() {
    const requestExtras = await getExtraRequestMissions();
    // Filter missions with status 'WAITING'
    // const waitingMissions = requestExtras?.filter(mission => mission.requestedExtras.);

    // Get the user's session
    const session: Session | null = await getServerSession(authOptions);
    // const user = await getMissions(session?.user?.id || "");
    const user = await getUserByUuid(session?.user?.id || "")

    // Get the user's missions
    const userMissions = user?.missionsAccepted as unknown as Mission[]

    // Filter missions with status 'WAITING'
    const waitingMissions = userMissions?.filter(mission => mission.status === "WAITING");
    return (
        <div className={'container mx-auto relative mb-[72px] md:mb-[172px]'}>
            <div className={'bg-black rounded-[20px] md:h-[334px] w-full  mx-auto flex flex-col md:flex-row items-center overflow-hidden'}>
                <div className={' relative flex md:pl-[55px]'}>
                    <div
                        className={"bg-[url('/notification.svg')] h-[250px] w-[250px]"}></div>
                    <div className="absolute h-[100px] w-[100px] md:h-[120px] md:w-[120px] right-0 top-5 md:right-[-70px] md:top-[-20px] rounded-full bg-white flex items-center justify-center font-bold text-5xl">{requestExtras?.length}</div>
                </div>
                <div className={'flex-1 flex w-full h-full justify-end'}>
                    <div
                        className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                        <div className=" text-white z-10 m-5">
                            <Link href="/contact" className="button-rounded bg-white text-black text-center z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                REQUÊTES
                            </Link>
                            <p className="mt-4 text-lg text-center" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" bg-black my-6" />
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[50px] ">
                {
                    waitingMissions?.map((requestExtras, index) => (
                        <RequestComponent key={index} data = {requestExtras} />
                    ))
                }
            </div>

        </div>
    )
}