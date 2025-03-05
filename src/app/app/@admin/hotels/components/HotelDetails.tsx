import React from "react";
import { UserType } from "@/types/Datatype";
export function HotelDetails({ hotel }: { hotel: UserType | null }) {
    console.log(hotel);

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 justify-between gap-5 p-5">
            <div className="shadow-normal flex flex-col justify-center items-center rounded-[20px] p-8">
                <div
                    className={"rounded-full bg-cover bg-center border-solid border-[4px] border-black/75"}
                    style={{
                        width: 150,
                        height: 150,
                        backgroundImage: `url(${hotel?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                    }}
                />
                <h2
                    className="text-[22px] text-black font-[700] leading-[26px] text-center"
                >
                    {hotel?.hotelName}
                </h2>
                <h4 className="text-[18px] text-black font-[300] text-center">
                    {hotel?.identifiant}
                </h4>
                <div className="flex flex-col justify-between items-center gap-[20px] w-[100%] mt-5">
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Email:
                        </h4>
                        <p className="text-[#8c8989] text-[15px] leading-[26px] font-[400]">
                            {hotel?.email}
                        </p>
                    </div>
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Téléphone:
                        </h4>
                        <p className="text-[#8c8989] text-[15px] leading-[26px] font-[400]">
                            {hotel?.phoneNumber}
                        </p>
                    </div>
                    <div className="rounded-[30px] bg-[#EEE5E9] p-[15px] text-center w-[100%]">
                        <h4 className="text-[#373737] text-[18px] leading-[22px] font-[700]">
                            Adresse:
                        </h4>
                        <p className="text-[#8c8989] text-[15px] leading-[26px] font-[400]">
                            {hotel?.address || "Non renseigné"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div
                    className="w-[100%] shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >

                    <h4 className="text-[18px] font-[600]">
                        Informations sur les logiciels utilisés
                    </h4>
                    <div className="flex justify-between items-center gap-[5px] w-full">
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                    </div>
                </div>
                <div
                    className="w-[100%] shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600]">
                        Informations sur les plages horaires
                    </h4>
                    <div className="flex justify-between items-center gap-[5px] w-full">
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                        <div className="h-[45px] w-[71px] bg-[#D9D9D9]"></div>
                    </div>
                </div>
                <div
                    className="w-full shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600] m-0">
                        Profile recherché
                    </h4>
                    <div className="flex flex-col justify-between items-start gap-[8px] w-full">
                        {hotel?.softwares?.map((software, index: number) => (
                            <div key={index} className="w-full">
                                <p>{software.software?.name}</p>
                                <div className="w-[85%] h-[8px] bg-secondary rounded-[30px]"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="w-full shadow-profile-hotel p-[15px] flex flex-col justify-start items-start gap-[10px] rounded-[20px]"
                >
                    <h4 className="text-[18px] font-[600] m-0">
                        Justificatifs
                    </h4>
                    <div className="flex flex-row justify-between items-start gap-[8px] w-full">
                        {hotel?.documents?.slice(0, 4).map((document, index) => (
                            <a href={document.file?.url} target="_blank" rel="noopener noreferrer">
                                {
                                    document?.name?.includes('pdf') ?
                                        <img
                                            src={"/document_purple_icon.svg"}
                                            alt="document file pdf"
                                            className="!w-[100px] !h-[100px]"
                                        />
                                        :
                                        <img
                                            src={"/file.png"}
                                            alt="document file pdf"
                                            className="!w-[100px] !h-[100px]"
                                        />
                                }
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}