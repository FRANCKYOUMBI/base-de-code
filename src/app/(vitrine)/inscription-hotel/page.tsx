'use client'
import React, {useEffect, useState} from 'react';
import { HotelRegistration, HotelRegistrationType } from '@/components/forms/FormModels';
import Link from 'next/link';

export default function InscriptionHotel() {
    const [successData, setSuccessData] = useState<HotelRegistrationType>();


    useEffect(() => {
        fetch('/auth/connexion').then(async (res) => {
            const data = await res.json();
        })
    }, [])

    return (
        <main className=' bg-black/50'>
            <div
                className={`bg-inscription-hotel-page bg-[length:1398px_1252px] bg-fixed bg-[top_-100px_left_-300px] md:bg-[length:2340px_1360px] md:bg-[top_-40px_left_-514px] px-[15px] md:px-[40pxl] lg:px-[200px] pt-[45px] lg:pt-[90px] pb:[60px] lg:pb-[150px] min-h-[100vh] bg-no-repeat`}
            >
                <div className="container flex justify-between">
                    <div className="bg-green"></div>
                    <div className="w-[591px]">
                        {successData ?
                            <div className="flex flex-col justify-center items-center">
                                <div
                                    className='bg-white rounded-[20px] px-[40px] pt-[28px] pb-[50px] mt-[50px] flex flex-col items-center justify-center gap-[15px]'
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
                                <h1 className='text-white text-[35px] md:text-[45px] lg:text-[60px] font-[700] leading-[45px] md:leading-[60px] lg:leading-[70px]'>Inscription Hôtel</h1>
                                <p className='text-[20px] text-white leading-[35px] mt-[20px]'>
                                    Créez votre compte et accédez à une interface simplifiée et efficace de gestion des Extra.
                                </p>
                                <div className="mt-[25px]">
                                    <HotelRegistration
                                        callBack={(data: HotelRegistrationType) => setSuccessData(data)}
                                    />
                                </div>
                                <div className="text-center mt-[25px]">
                                    <Link
                                        href='/connexion'
                                        className="underline text-white text-[20px] font-[400] leading-[25px] hover:text-primary transition-all ease-in duration-[0.3s]"
                                    >
                                        Vous avez déjà un compte ? Connectez-vous ici
                                    </Link>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};
