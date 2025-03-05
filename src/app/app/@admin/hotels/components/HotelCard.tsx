"use client";
import React from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { BaseModal } from "@/components/modals/BaseModal";
import { HotelDetails } from "@/app/app/@admin/hotels/components/HotelDetails";
import { UserType } from "@/types/Datatype";

export function HotelCard({ hotel }: { hotel: UserType | null }): JSX.Element {
    const { openModal, closeModal } = useModalContext();

    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<HotelDetails hotel={hotel} />}
                closeModal={closeModal}
                header={"Détails de l'hotel"}
                type={"primary"}
                width={1095}
            />
        )
    }

    return (
        <div className={"flex flex-row gap-4 shadow-normal rounded-[20px] bg-white py-[12px] px-5"}>
            <div className="">
                <div
                    className={"rounded-full bg-cover bg-center"}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundImage: `url(${hotel?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                    }}
                />
            </div>
            <div className="flex flex-col justify-between items-start gap-2">
                <div className="w-full">
                    <h5 className="w-[200px] text-[22px] text-[#000] font-normal leading-normal truncate">
                        {hotel?.hotelName}
                    </h5>
                    <p>
                        {hotel?.address || "Pas d'adresse"}
                    </p>
                    <p className={"leading-0"}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                type='button'
                                key={value}
                                className={`mr-1 focus:outline-none ${value <= 3 ? 'text-primary' : 'text-[#D9D9D9]'
                                    }`}
                            >
                                <svg aria-hidden="true" className="w-[14px] h-[14px]"
                                    fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"><title>First star</title>
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </button>
                        ))}
                    </p>
                </div>
                <div className="flex flex-row justify-between gap-4 w-full">
                    <button
                        onClick={handleOpenModal}
                        className="bg-secondary w-full rounded-[20px] px-[20px] py-[5px] text-white text-[12px] font-normal leading-normal hover:bg-primary transition duration-200 ease-in-out"
                    >
                        Détails
                    </button>
                </div>
            </div>
        </div>
    )
}