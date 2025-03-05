'use client'
import { ExtraRegistration, ExtraRegistrationType } from '@/components/forms/FormModels'
import Link from 'next/link'
import React, { useState } from 'react'

export default function InscriptionExtra() {
    const [successData, setSuccessData] = useState<ExtraRegistrationType>();
    return (
        <main className='bg-black/50'>
            <div
                className={`bg-inscription-extra-page bg-fixed bg-[length:1398px_1292px] bg-[top_-80px_left_-300px] md:bg-[length:2806px_1871px] md:bg-[top_-80px_left_-109px] bg-no-repeat px-[15px] md:px-[40px] lg:px-[200px] pt-[45px] lg:pt-[90px] pb:[60px] lg:pb-[150px] min-h-[100vh]`}
            >
                <div className="container flex justify-between">
                    <div className="w-auto lg:w-[591px]">
                        {successData ?
                            <div className="flex flex-col justify-center items-center">
                                <div
                                    className='bg-white rounded-[20px] px-[20px] lg:px-[40px] pt-[28px] pb-[50px] mt-[50px] flex flex-col items-center justify-center gap-[15px]'
                                >
                                    <img src="/checked-success.svg" alt="register-success" className="w-[30px] h-[30px] md:h-auto md:w-auto" />
                                    <h2 className='text-primary font-[900] text-[18px] text-center md:text-[24px] leading-[25px]'>Votre compte a été créé avec succès !</h2>
                                    <p className='text-black font-[400] text-[16px] md:text-[20px] leading-[24px] md:leading-[35px] text-center'>
                                        Un email de confirmation vous a été envoyé à l’adresse: <strong>{successData.email} </strong>
                                        Ainsi que votre identifiant unique de connexion
                                    </p>
                                </div>
                                <Link
                                    href="/connexion"
                                    className='bg-primary text-white py-[12px] px-[120px] rounded-[20px] text-center mt-[-30px] hover:bg-[#3e21a7] transition-all ease-in duration-[0.3s'
                                >
                                    Continuer
                                </Link>
                            </div> :
                            <>
                                <h1 className='text-black text-[35px] md:text-[45px] lg:text-[60px] font-[700] leading-[45px] md:leading-[60px] lg:leading-[70px]'>Inscription Extra</h1>
                                <p className='text-[20px] text-black leading-[35px] mt-[20px]'>
                                    Créez votre compte et découvrez une nouvelle façon simplifiée et efficace de gérer vos missions.
                                </p>
                                <div className="mt-[25px]">
                                    <ExtraRegistration
                                        callBack={(data: ExtraRegistrationType) => setSuccessData(data)}
                                    />
                                </div>
                                <div className="text-center mt-[25px]">
                                    <Link
                                        href='/connexion'
                                        className="underline text-[#373737] text-[20px] font-[400] leading-[25px] hover:text-primary transition-all ease-in duration-[0.3s]"
                                    >
                                        Vous avez déjà un compte ? Connectez-vous ici
                                    </Link>
                                </div>
                            </>
                        }
                    </div>
                    <div className="bg-orange"></div>
                </div>
            </div>
        </main>
    )
}
