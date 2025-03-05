"use client"
import React from "react";
import {useModalContext} from "@/contexts/ModalContext";
import {BaseModal} from "@/components/modals/BaseModal";
import {UpdatePassWordForm} from "@/app/app/@extra/profile/components/PasswordForm";
export function PasswordInfo({userEmail}:{userEmail?:string}) {
    const { openModal, closeModal } = useModalContext();
    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<UpdatePassWordForm userEmail={userEmail} />}
                closeModal={closeModal}
                header={"Modifier le mot de passe"}
                type={"primary"}
            />
        );
    }
    return (
        <div
            className="w-[100%] shadow-profile-hotel p-[30px] flex flex-col justify-center items-start gap-[10px] rounded-[20px]"
        >
            <h4 className="text-[20px] md:text-[24px] font-[600]">Reinitialiser mon mot de passe</h4>
            <p className="flex w-[100%] justify-start md:justify-between gap-4 items-center text-ellipsis overflow-hidden"><span>Mot de passe </span><span>********************************************** </span></p>
            <div className="w-[100%] flex justify-start items-start">
                <button
                    onClick={handleOpenModal}
                    className="button-rounded w-[293px] bg-secondary mt-[27px] text-white px-[60px] py-[5px]"
                >
                    Editer
                </button>
            </div>
        </div>
    )
}