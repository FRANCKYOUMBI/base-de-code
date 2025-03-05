"use client";
import 'swiper/css';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import React, {useRef} from "react";
import {UserType} from "@/types/Datatype";
import {HotelCard} from "@/app/app/@admin/hotels/components/HotelCard";


export function HomeHotelsCarrousel({hotels}: {hotels:UserType[]}) {
    const swiperRef = useRef<SwiperRef>(null);
    const i = 0;
    return (
        <div className={'flex'}>
            <Swiper
                initialSlide={i - 1}
                slidesPerView={'auto'}
                style={{
                    padding: '20px 10px'
                }}
                ref={swiperRef}
            >
                {hotels.map((hotels, index) => {
                    return <SwiperSlide
                        className={'max-w-max mr-5 select-none'}
                    >
                        <HotelCard hotel={hotels} />
                    </SwiperSlide>;
                })}
            </Swiper>
        </div>
    )
}