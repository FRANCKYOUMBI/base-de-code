import { Mission } from '@prisma/client'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'
interface Props{
    data:Mission
}
export const RequestComponent = ({data}:Props) => {
    return (
        <div className=" flex justify-center">
            <div className="bg-[url('/bg-requete.svg')] px-[25px] pt-[34px] h-[322px] w-[316px]">
                <div className="text-white">
                    <h2 className=" font-bold text-[30px]"> Hotel <br /> Continental</h2>
                    <p>Requête: no115</p>
                    <p>Date: {format(new Date(data?.createdAt!), 'dd MMM yyyy', { locale: fr })}</p>
                    <p>Shift: {format(data.from, "HH:mm", { locale: fr })}-{format(data.to, "HH:mm", { locale: fr })}</p>
                    <p>Prix: 100€</p>
                </div>
                <div className=" mt-4 pb-5 flex gap-y-4 justify-between w-full">
                    <button className="bg-green rounded-[20px] text-[18px] w-[123px] px-5 py-4">Accepter</button>
                    <button className="bg-red rounded-[20px] w-[123px] text-center text-[18px] px-5 py-4 text-white">Refuser</button>
                </div>
            </div>
        </div>
    )
}
