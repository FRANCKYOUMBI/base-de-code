"use client"
import 'swiper/css';
import React, {useRef} from "react";
import { Mission } from '@prisma/client'
import {RequestComponent} from "@/components/Admin/RequestComponent";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";

export function HomeRequestCarrousel({requests}: {requests:Mission[]}) {
    const swiperRef = useRef<SwiperRef>(null);
    const i = 0;
    return (
        <div className={'flex'}>
            <Swiper
                initialSlide={i - 1}
                slidesPerView={'auto'}
                className={''}
                ref={swiperRef}
            >
                {requests.map((mission, index) => {
                    return <SwiperSlide
                        className={'max-w-max mr-2 select-none'}
                    >
                        <RequestComponent key={index} data = {mission} />
                    </SwiperSlide>;
                })}
            </Swiper>
        </div>
    )
}