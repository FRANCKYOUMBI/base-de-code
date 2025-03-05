import React, {useState} from 'react'
import {UserType} from "@/types/Datatype";
import {HotelDetails} from "@/app/app/@admin/historique-missions/component/HotelDetails";

export const HotelHistorique = ({hotels}: {hotels:UserType[]}) => {
    const [
        selectedHotel,
        setSelectedHotel
    ] = useState<UserType>(hotels[0]);
    return (
        <div className="flex w-full justify-start items-start gap-5 mt-5">
            <div className="w-[65%]">
                <HotelDetails hotel={selectedHotel} />
            </div>
            <div className="w-[45%] flex flex-col gap-5">
                {hotels.map((hotel) => (
                    <div onClick={() => setSelectedHotel(hotel)} className="flex gap-[24px] px-[20px] py-[10px] shadow-profile-hotel rounded-[20px] cursor-pointer">
                        <div className="">
                            <div
                                className={"rounded-full bg-cover bg-center"}
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundImage: `url(${hotel?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                                }}
                            />
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col text-xs">
                                <h3 className='w-[200px] text-xs md:text-[20px] text-black font-bold md:font-[400] leading-[29px] truncate'>{hotel.hotelName}</h3>
                                <p className='mt-[6px] text-sm leading-normal'>{hotel.address || "Adresse non indiquée"}</p>
                                <div className="mt-[10px]">
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
                            <div className=" rounded-full h-[55px] flex items-center justify-center text-white text-[25px] bg-violet w-[55px]">
                                {hotel.missionsCreated?.length}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       
    )
}
