"use client"
import { useModalContext } from '@/contexts/ModalContext';
import { Mission } from '@prisma/client'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react'
import { MissionModal } from './MissionModal';
import { BaseModal } from '../modals/BaseModal';
interface Props {
    mission: Mission;
    hotelList: any;
}
export const MissionsComponent = ({ mission, hotelList }: Props) => {
    const { openModal, closeModal } = useModalContext();
    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<MissionModal hotelList={hotelList} closeModal={closeModal} mission={mission} />}
                closeModal={closeModal}
                header={"Modifier le mot de passe"}
                type={"primary"}
                title={true}
            />
        );
    }
    function handleSelectHotel(hotelId: string) {
        return hotelList?.find((hotel: any) => hotel.uuid === hotelId);
    }
    return (
        <div className="flex gap-3 md:gap-[24px] px-2 py-2 items-center md:px-[20px] md:py-[10px] shadow-profile-hotel rounded-[20px] cursor-pointer" onClick={handleOpenModal}>
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
    )
}
