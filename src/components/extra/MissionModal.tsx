import { Mission } from '@prisma/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { signOut } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
interface Props{
    closeModal: ()=>void
    mission:Mission
    hotelList:any
}
export const MissionModal = ({closeModal,mission,hotelList}:Props) => {
    function handleSelectHotel(hotelId: string) {
        return hotelList?.find((hotel: any) => hotel.uuid === hotelId);
    }
    const [isLoading, setIsloading] = useState<boolean>(false);
    async function handleChangeStatus(data:Mission) {
    // async function handleChangeStatus() {
        data.uuid = mission.uuid || "";
        setIsloading(true)
        try {
            const changeStatus = await fetch("/api/missions/"+ data.uuid, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const response = await changeStatus.json();
            if (changeStatus.status === 200) {
                closeModal();
                enqueueSnackbar(
                    response.message,
                    { variant: "success", persist: false }
                );
            } else if (changeStatus.status === 400) {
                enqueueSnackbar(
                    response.message,
                    { variant: "error", persist: false }
                );
            } else {
                enqueueSnackbar(
                    "Un problème lors de l'envoie de la requête",
                    { variant: "warning", persist: false }
                );
            }
            setIsloading(false)
        } catch (e) {
            enqueueSnackbar(
                "Un problème lors de l'envoie de la requête",
                { variant: "warning", persist: false }
            );
            setIsloading(false)
        }
    }
    return (
        <div className=" bg-white rounded-[20px] shadow-[0px_0px_10px_3px_rgba(0,0,0,0.25)]  px-[25px] pt-[10px] ">
            <div className="flex gap-4 md:gap-[24px]">
                <div className="">
                    <div className="bg-[url('/images/mission-image.jpeg')] h-[85px] w-[85px] bg-cover bg-[center_top] rounded-[100%] bg-no-repeat"></div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex text-xs flex-col justify-between">
                        <h3 className='text-xs md:text-[20px] font-bold text-black md:font-[400] leading-[29px]'>{handleSelectHotel(mission?.hotelId)?.hotelName}</h3>
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
            <hr className="my-[22px]" />
            <div className="mb-5">
                <div className="grid grid-cols-2 gap-y-5">
                    <div className=" font-bold md:font-normal md:text-[18px]">
                        <div>
                            <p className=" pb-5">Hôtel</p>
                            <p className=" pb-5">Lieu</p>
                            <p className=" pb-5">Shift</p>
                            <p className=" pb-5">Date</p>
                            <p className=" pb-5">Montant</p>
                            <p className=" pb-5">Total</p>
                        </div>
                    </div>
                    <div className=" md:text-[18px]">
                        <div className=" text-right">
                            <p className=" pb-5">{handleSelectHotel(mission?.hotelId)?.hotelName}</p>
                            <p className=" pb-5">{handleSelectHotel(mission?.hotelId)?.address || "Pass d'adresse"}</p>
                            <p className=" pb-5">{format(mission?.from!, "HH:mm", { locale: fr })} - {format(mission?.to!, "HH:mm", { locale: fr })}</p>
                            <p className=" pb-5">{format(new Date(mission?.createdAt!), 'dd MMM yyyy', { locale: fr })}</p>
                            <p className=" pb-5">15€/heure</p>
                            <p className=" pb-5">15€/heure</p>
                        </div>

                    </div>
                </div>
                <div className=" mt-4 pb-5 flex flex-col md:flex-row gap-y-4 md:justify-between w-full">
                    <button className="bg-primary w-full rounded-[20px] text-[18px] md:w-[195px] px-5 py-4 text-white" onClick={()=>handleChangeStatus(mission)}>Accepter</button>
                    <button className="bg-black w-full rounded-[20px] md:w-[195px] text-center text-[18px] px-5 py-4 text-white" onClick={()=>closeModal()}>Refuser</button>
                </div>
            </div>
        </div>
    )
}
