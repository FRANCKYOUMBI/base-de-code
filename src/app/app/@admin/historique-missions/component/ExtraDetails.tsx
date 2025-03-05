import { UserType } from '@/types/Datatype'
import {format} from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'
interface Props {
    extra?: UserType,
}
export const ExtraDetails = ({extra}:Props) => {
    const period = format(new Date(extra?.createdAt ?? ''), 'dd MMM yyyy', {locale:fr});
    function handleGetTime(date: Date): string {
        return format(date, "HH:mm", { locale: fr });
    }
    return (
        <div className='shadow-normal rounded-[20px] w-full py-[12px] px-5 bg-white'>
            <div className={"flex flex-row gap-4 w-full  py-[12px] "}>
                <div className="">
                    <div className={"rounded-full bg-cover bg-center"}
                        style={{
                            width: 100,
                            height: 100,
                            backgroundImage: `url(${extra?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                        }} 
                    />
                </div>
                <div className="flex flex-col w-full justify-between items-start gap-2">
                    <div className="w-full">
                        <h5 className="w-[200px] text-[22px] text-[#000] font-normal leading-normal truncate">
                            {extra?.firstName} {extra?.lastName}
                        </h5>
                    </div>
                    <hr className=" bg-black w-full" />
                    <div className="flex flex-row justify-between items-center gap-4 w-full">
                        <p>{period}</p>
                        <div className=" rounded-full h-[55px] flex items-center justify-center text-white text-[25px] bg-violet w-[55px]">
                            {extra?.missionsAccepted?.length}
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" bg-black my-6 w-full" />
            <div className="flex flex-col gap-5">
                {extra?.missionsAccepted?.map((mission) => (
                    <div key={mission.uuid}  className="flex gap-[24px] px-[20px] py-[10px] shadow-profile-hotel rounded-[20px] cursor-pointer">
                        <div className="">
                            <div 
                                className="h-[80px] w-[80px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${mission.hotel?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                                }}
                            />
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col text-xs justify-between">
                                <h3 className='text-xs md:text-[20px] text-black font-bold md:font-[400] leading-[29px]'>
                                    {mission.hotel?.hotelName}
                                </h3>
                                <p>{mission.hotel?.address || "Non renseignée"}</p>
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
                                            <svg aria-hidden="true" className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        </button>
                                    ))}
                                </div>
                                <h5 className="text-xs">{format(new Date(mission?.createdAt!), "dd.MMM.yyy", {locale:fr})}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
