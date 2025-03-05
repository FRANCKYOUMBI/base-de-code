"use client";
import React from "react";
import {useModalContext} from "@/contexts/ModalContext";
import {BankInfoType} from "@/types/Datatype";
import {BaseModal} from "@/components/modals/BaseModal";
import {BanInfoForm} from "@/app/app/@extra/profile/components/BankInfoForm";
interface BankInfoProps {
    bankInfo: BankInfoType | null;
    userId?: string;
}
export function BankInfo({bankInfo, userId}:BankInfoProps):React.JSX.Element {
    const { openModal, closeModal } = useModalContext();
    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<BanInfoForm bankInfo={bankInfo} userId={userId}/>}
                closeModal={closeModal}
                type={"primary"}
                header={"Modifier les informations de paiement"}
            />
        );
    }
    return (
        <div
            className="w-[100%] shadow-profile-hotel p-[30px] flex flex-col justify-center items-start gap-[10px] rounded-[20px]"
        >
            <h4 className="text-[20px] md:text-[24px] font-[600]">Informations de paiement</h4>
            <p className="flex w-[100%] md:justify-between gap-4 items-center text-ellipsis overflow-hidden"><span>RIB</span><span>********************************************** </span></p>
            <p className="flex w-[100%] md:justify-between gap-4 items-center text-ellipsis overflow-hidden"><span>Paypal</span> <span>********************************************** </span></p>
            <div className="w-[100%] flex justify-start items-start">
                <button
                    onClick={handleOpenModal}
                    className="button-rounded w-[293px] bg-secondary mt-[27px] text-white px-[60px] py-[5px]"
                >
                    Modifier
                </button>
            </div>
        </div>
    )
}

