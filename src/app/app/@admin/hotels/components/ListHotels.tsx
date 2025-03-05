"use client";

import { UserType } from '@/types/Datatype'
import React, {Fragment, useState}from 'react'
import { HotelCard } from './HotelCard'

export function ListHotels({ hotels }: { hotels: UserType[] }) {
    const [filterTerm, setFilterTerm] = useState<string>();
    
    function handleFilterHotel(): UserType[] {
        if (filterTerm) {
            return hotels.filter(hotel => hotel?.hotelName?.toLowerCase().includes(filterTerm.toLowerCase()))
        } else {
            return hotels;
        }
    }
    return (
        <Fragment>
            <div className="flex flex-row justify-between gap-5 px-0 md:px-24">
                <input
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    type="text"
                    placeholder={"Trouver un hôtel..."}
                    className={"bg-gray border-0 w-full ring-0 focus:border-0 focus:ring-0 rounded-[15px] py-[15px] px-[30px] placeholder:text-[20px] placeholder:text-[#373737] placeholder:font-light"}
                />
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {handleFilterHotel().length > 0 ? 
                    <>
                        {handleFilterHotel()?.map((hole: UserType) =>
                            <HotelCard
                                key={hole.uuid}
                                hotel={hole}
                            />
                        )}
                    </> : 
                    <div className="flex flex-col items-center justify-center">
                        <h2 className='text-[18px] font-bold'>{"Aucun hôtel trouvé"}</h2>
                    </div>
                }
            </div>
        </Fragment>
  )
}
