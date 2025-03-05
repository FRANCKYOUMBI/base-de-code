"use client";
import React, { Fragment } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { BaseModal } from "@/components/modals/BaseModal";
import { UserInfoForm } from "@/app/app/@extra/profile/components/UserInfoForm";
import { User } from "@prisma/client";

interface UserInfosProps {
    user: User,
    avatar: string | null,
}
export function UserInfos({ user, avatar }: UserInfosProps) {
    const { openModal, closeModal } = useModalContext();
    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<UserInfoForm user={user} />}
                closeModal={closeModal}
                header={"Modifier les informations"}
                type={"primary"}
            />
        );
    }
    return (
        <Fragment>
            <div className="text-center flex flex-col justify-start items-center">
                <img
                    className="w-[150px] h-[150px] md:w-[210px] md:h-[210px] rounded-[100%] border-[10px] border-solid border-black/70"
                    src={avatar || ""}
                    alt={user?.lastName || "Aquarius"}
                />
                <div className="text-center">
                    {
                        user.role != "HOTEL" ?
                            <>
                                <h2
                                    className="text-[25px] md:text-[30px] text-black font-[700] leading-[36px] px-[80px] text-center"
                                >
                                    {user.firstName + " " + user.lastName}
                                </h2>
                                <h4 className="text-[20px] md:text-[25px] text-black font-[300] text-center">
                                    {user.identifiant}
                                </h4>
                            </>
                            :
                            <>
                                <h2
                                    className="text-[24px] text-black font-[700] leading-[36px] px-[80px] text-center"
                                >
                                    {user.hotelName}
                                </h2>
                                <h4 className="text-[18px] text-primary/90 text-center">
                                    Identifiant : {user.identifiant}
                                </h4>
                            </>
                    }


                    <button
                        onClick={handleOpenModal}
                        className="button-rounded bg-secondary text-white px-[60px] py-[5px] mt-[14px]"
                    >
                        Editer
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center gap-[30px] w-[100%]">
                <div className="rounded-[30px] bg-[#F5F5F5] p-[15px] text-center w-[100%]">
                    <h4 className="text-[#373737] text-[15px] md:text-[20px] md:leading-[26px] font-[700]">
                        Email:
                    </h4>
                    <p className="text-[#8c8989] text-[11px] md:text-[20px] md:leading-[26px] font-[300]">
                        {user.email}
                    </p>
                </div>
                <div className="rounded-[30px] bg-[#F5F5F5] p-[15px] text-center w-[100%]">
                    <h4 className="text-[#373737] text-[15px] md:text-[20px] md:leading-[26px] font-[700]">
                        Téléphone:
                    </h4>
                    <p className="text-[#8c8989] text-[11px] md:text-[20px] md:leading-[26px] font-[300]">
                        {user.phoneNumber}
                    </p>
                </div>
                <div className="rounded-[30px] bg-[#F5F5F5] p-[15px] text-center w-[100%]">
                    <h4 className="text-[#373737] text-[15px] md:text-[20px] md:leading-[26px] font-[700]">
                        Adresse:
                    </h4>
                    <p className="text-[#8c8989] text-[11px] md:text-[20px] md:leading-[26px] font-[300]">
                        {user.address}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}