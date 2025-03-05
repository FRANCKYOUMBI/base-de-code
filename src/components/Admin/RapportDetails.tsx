import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { UserType } from "@/types/Datatype";
export function RapportDetails({ extra }: { extra: UserType | undefined }) {


    console.log(extra?.reviews);


    return (
        <div className="flex flex-col md:flex-row shadow-profile-hotel rounded-[20px] lg:h-[404px] w-full p-5">
            <div className=" w-[100%] flex items-center justify-center">
                <div className="shadow-normal flex flex-col w-[250px] justify-center items-center rounded-[20px] py-[14px] px-[24px]">
                    {/* <Image
                        // src="/extra-profil.png https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        src={`https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg`}
                        alt={"Profile extra"}
                        width={122}
                        height={122}
                        className={"rounded-full border-solid border-[4px] border-black/75"}
                    /> */}
                    <div
                        className={"rounded-full bg-cover bg-center border-solid border-[4px] border-black/75"}
                        style={{
                            width: 150,
                            height: 150,
                            backgroundImage: `url(${extra?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                        }}
                    />
                    <h2
                        className="text-[15px] text-black font-[700] text-center"
                    >
                        {extra?.firstName + " " + extra?.lastName}
                    </h2>
                    <h4 className="text-[12px] text-black font-[300] text-center">
                        {extra?.identifiant}
                    </h4>
                    <div className="flex flex-col justify-between items-center gap-[7px] w-[100%] mt-[8px]">
                        <div className="rounded-[30px] bg-[#EEE5E9] p-[5px] text-center w-[100%]">
                            <h4 className="text-[#373737] text-[15px] font-[700]">
                                Email:
                            </h4>
                            <p className="text-[#8c8989] text-[11px] font-[400]">
                                {extra?.email}
                            </p>
                        </div>
                        <div className="rounded-[30px] bg-[#EEE5E9] p-[5px] text-center w-[100%]">
                            <h4 className="text-[#373737] text-[15px] font-[700]">
                                Téléphone:
                            </h4>
                            <p className="text-[#8c8989] text-[11px] font-[400]">
                                {extra?.phoneNumber}
                            </p>
                        </div>
                        <div className="rounded-[30px] bg-[#EEE5E9] p-[5px] text-center w-[100%]">
                            <h4 className="text-[#373737] text-[15px] font-[700]">
                                Adresse:
                            </h4>
                            <p className="text-[#8c8989] text-[11px] font-[400]">
                                {extra?.address || "Non renseigné"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" overflow-y-scroll">
                {extra?.reviews?.map(review => (
                    <div className="mb-[13px]">
                        <div className=" shadow-rapport-details px-[24px] py-[14px]">{review.reviewText}</div>
                        <div className=" flex items-center mt-[5px]">
                            <Image
                                // src="/extra-profil.png"
                                src={`${review.user?.image}`}
                                alt={"Profile extra"}
                                width={50}
                                height={50}
                                className={"rounded-full "}
                            />

                            <div className=" flex justify-between">
                                <p className="ml-[6px] ">{review.user?.hotelName}</p>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}