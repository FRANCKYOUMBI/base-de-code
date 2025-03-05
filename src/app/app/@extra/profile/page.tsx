import React from 'react'
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BankInfoType } from "@/types/Datatype";
import { getBankInfoByUserUuid } from "@/services/bankInfo";
import { BankInfo } from "@/app/app/@extra/profile/components/BankInfo";
import { UserInfos } from "@/app/app/@extra/profile/components/UserInfos";
import { getUserByUuid } from '@/services/users';
import { PasswordInfo } from "@/app/app/@extra/profile/components/PasswordInfo";
import { User } from '@prisma/client';

export const metadata = {
    title: 'Mon profile | Vquarius Agency',
    description: '',
}

export default async function MonProfile() {
    const session: Session | null = await getServerSession(authOptions);
    const bankInfo: BankInfoType | null = await getBankInfoByUserUuid(session?.user?.id || "");
    const user = await getUserByUuid(session?.user?.id || "") as unknown as User;

    return (
        <main className='hotel_container'>
            <div className=' container mx-auto'>
                <div className='pl-5 lg:pl-0'>
                    <div className={'relative mb-[72px] md:mb-[40px]'}>
                        <div
                            className={`bg-[url('/images/inscription-hotel.jpeg')] rounded-[20px] w-full h-[334px] mx-auto flex items-center overflow-hidden bg-cover bg-no-repeat bg-[position:center]`}>
                            <div className={'w-[27%] hidden md:block'}>
                            </div>
                            <div className={'flex-1 flex w-full h-full justify-end'}>
                                <div
                                    className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary/90 rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary/90 before:rounded-[20px]"}>
                                    <div className=" text-white z-10 m-5">
                                        <h2 className=" font-bold lg:text-2xl">Qu’est ce qu’un extra ?</h2>
                                        <p className="mt-4 sm:text-sm lg:text-lg" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-8 w-[100%] mt-7">
                        <div className="w-full xl:w-[50%] shadow-profile-hotel p-[30px] flex flex-col justify-start items-center gap-[15px] rounded-[20px]">
                            <UserInfos user={user} avatar={session?.user?.image || null} />
                        </div>

                        <div className="w-full xl:w-[50%] flex flex-col justify-start items-center gap-[20px]">
                            <BankInfo bankInfo={bankInfo} userId={session?.user?.id} />
                            <div
                                className="w-[100%] shadow-profile-hotel p-[30px] flex flex-col justify-start items-start gap-[30px] rounded-[20px]"
                            >
                                <h4 className="text-[20px] md:text-[24px] font-[600]">
                                    Informations sur les disponnibilités
                                </h4>
                                <div className="flex justify-between items-center gap-[8px] w-full">
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                    <div className="h-[95px] w-[71px] bg-[#D9D9D9]"></div>
                                </div>
                                <button
                                    className="button-rounded w-full bg-secondary text-white px-[60px] py-[5px]"
                                >
                                    Editer
                                </button>
                            </div>
                            <PasswordInfo userEmail={user?.email} />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse gap-8 w-[100%] mt-7">
                        <div
                            className="w-full lg:w-[50%] shadow-profile-hotel p-[30px] flex flex-col gap-[10px] rounded-[20px]"
                        >
                            <h4 className="text-[20px] md:text-[24px] font-[600]">Justificatifs</h4>
                            <div className="w-full grid grid-cols-2 gap-x-6 md:gap-x-[70px] gap-y-6 md:gap-y-[30px]">
                                <div className="">
                                    <p>Identité</p>
                                    <div className="w-full  h-[83px] bg-[#D9D9D9]">

                                    </div>
                                </div>
                                <div className="">
                                    <p>Domicile</p>
                                    <div className="w-full  h-[83px] bg-[#D9D9D9]"></div>
                                </div>
                                <div className="">
                                    <p>Cv</p>
                                    <div className="w-full  h-[83px] bg-[#D9D9D9]"></div>
                                </div>
                                <button
                                    className="button-rounded flex items-center justify-center bg-secondary text-white w-full "
                                >
                                    Editer
                                </button>
                            </div>

                        </div>
                        <div
                            className="w-full lg:w-[50%] shadow-profile-hotel p-[30px] flex flex-col justify-start items-start gap-[30px] rounded-[20px]"
                        >
                            <h4 className=" text-[20px] md:text-[24px] font-[600]">
                                Compétences et logiciels maîtrisés
                            </h4>
                            <div className="flex flex-col justify-between items-start gap-[8px] w-full">
                                <div className="w-full">
                                    <p>Excel</p>
                                    <div className="w-[85%] h-[15px] bg-secondary rounded-[30px]"></div>
                                </div>
                                <div className="w-full">
                                    <p>Word</p>
                                    <div className="w-[55%] h-[15px] bg-secondary rounded-[30px]"></div>
                                </div>
                                <div className="w-full">
                                    <p>Google</p>
                                    <div className="w-[90%] h-[15px] bg-secondary rounded-[30px]"></div>
                                </div>
                                <div className="w-full">
                                    <p>Gestion app</p>
                                    <div className="w-[50%] h-[15px] bg-secondary rounded-[30px]"></div>
                                </div>
                                <div className="w-full">
                                    <p>Windows</p>
                                    <div className="w-full h-[15px] bg-secondary rounded-[30px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
