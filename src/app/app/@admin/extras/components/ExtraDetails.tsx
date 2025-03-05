import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import {UsersOnSkillsType, UserType} from "@/types/Datatype";
export function ExtraDetails({extra}: {extra: UserType|null}) {

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 justify-between w-full gap-5 p-5">
            <div className="shadow-normal flex flex-col justify-center items-center rounded-[20px] p-8">
                <div
                    className={"rounded-full bg-cover bg-center border-solid border-[4px] border-black/75"}
                    style={{
                        width: 150,
                        height: 150,
                        backgroundImage: `url(${extra?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                    }}
                />
                <h2
                    className="text-[22px] text-black font-[700] leading-[26px] text-center"
                >
                    {extra?.firstName + " " + extra?.lastName}
                </h2>
                <h4 className="text-[18px] text-black font-[300] text-center">
                    {extra?.identifiant}
                </h4>
                <div className="flex flex-col justify-between items-center gap-[20px] w-[100%] mt-5">
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Email:
                        </h4>
                        <p title={extra?.email} className="text-[#8c8989] text-[15px] leading-[26px] font-[400] truncate">
                            {extra?.email}
                        </p>
                    </div>
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Téléphone:
                        </h4>
                        <p className="text-[#8c8989] text-[15px] leading-[26px] font-[400]">
                            {extra?.phoneNumber}
                        </p>
                    </div>
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Adresse:
                        </h4>
                        <p className="text-[#8c8989] text-[15px] leading-[26px] font-[400]">
                            {extra?.address || "Non renseigné"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div
                    className="w-[100%] shadow-profile-hotel p-[15px] flex flex-col justify-center items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600]">Informations de paiement</h4>
                    <p className="flex w-[100%] md:justify-between gap-4 items-center text-ellipsis overflow-hidden"><span>RIB</span><span>
                        {extra?.extraBankInfo?.rib || "Non renseigné"}
                    </span></p>
                    <p className="flex w-[100%] md:justify-between gap-4 items-center text-ellipsis overflow-hidden"><span>Paypal</span> <span>
                        {extra?.extraBankInfo?.paypal || "Non renseigné"}
                    </span></p>
                </div>
                <div
                    className="w-full shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600] m-0">
                        Compétences et logiciels maîtrisés
                    </h4>
                    <div className="flex flex-col justify-between items-start gap-[8px] w-full">
                        {extra?.skills?.length === 0 ? (
                            <p className="text-[#8c8989] text-[18px] leading-[26px] font-[400]">
                                Aucune compétence renseignée
                            </p>
                        ) : (
                            <>
                                {extra?.skills?.map((skill: UsersOnSkillsType, index) => (
                                    <div className="w-full" key={index}>
                                        <p>{skill.skill?.name}</p>
                                        <div
                                            className="h-[8px] bg-secondary rounded-[30px]"
                                            style={{width: `${skill.percent}%`}}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div
                    className="w-full shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600] m-0">
                        Justificatifs
                    </h4>
                    <div className="flex flex-col justify-between items-start gap-[8px] w-full">

                    </div>
                </div>
            </div>
        </div>
    )
}