"use client";
import 'swiper/css';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import React, {useRef} from "react";
import {UserType} from "@/types/Datatype";
import {HotelCard} from "@/app/app/@admin/hotels/components/HotelCard";
import {ExtraCard} from "@/app/app/@admin/extras/components/ExtraCard";


export function HomeExtraCarrousel({extras}: {extras:UserType[]}) {
    const swiperRef = useRef<SwiperRef>(null);
    const i = 0;
    return (
        <div className={'flex'}>
            <Swiper
                initialSlide={i - 1}
                slidesPerView={'auto'}
                className={'py-[40px]'}
                style={{
                    padding: '20px 10px'
                }}
                ref={swiperRef}
            >
                {extras.map((extra, index) => {
                    return <SwiperSlide
                        className={'max-w-max mr-5 select-none'}
                    >
                        <ExtraCard extra={extra} />
                    </SwiperSlide>;
                })}
            </Swiper>
        </div>
    )
}