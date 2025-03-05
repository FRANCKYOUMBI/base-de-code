"use client"

import {Swiper, SwiperRef, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import React, {Dispatch, Fragment, SetStateAction, useRef, useState} from "react";
import {format, eachMonthOfInterval} from "date-fns";
import {fr} from "date-fns/locale";
import moment from "moment/moment";
import Image from "next/image";

interface Props {
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>
}

const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
    return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth();
}

export function MissionsCarousel({date, setDate}: Props) {

    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);
    const dateArray: Date[] = [];
    let i = 0;
    for (let d = startDate; d <= endDate; d.setMonth(d.getMonth() + 1)) {
        if (moment(d).isBefore(new Date())) {
            i++;
        }
        dateArray.push(new Date(d));
    }

    const swiperRef = useRef<SwiperRef>(null);
    const prevSlide = () => {
        if (swiperRef?.current) {
            swiperRef?.current?.swiper?.slidePrev()
        }
    }
    const nextSlide = () => {
        if (swiperRef?.current) {
            swiperRef?.current?.swiper?.slideNext()
        }
    }

    function returnClass(month: Date) {
        if (isSameDate(month, date)) {
            return "min-w-[100px] justify-center select-none capitalize text-[16px] border-solid border-[1px] border-[#826af957] text-primary outline-none p-[5px] font-[700] bg-[#826af957] transition-all ease-in-out duration-[0.5s] h-[50px] flex items-center mx-[6px]"
        } else {
            return "cursor-pointer min-w-[100px] justify-center select-none capitalize text-[16px] border-solid border-[1px] border-[#939191] text-[#939191] outline-none p-[5px] font-[700] hover:border-[#826af957] hover:text-primary hover:bg-[#826af957] transition-all ease-in-out duration-[0.5s] h-[50px] items-center flex mx-[6px]"
        }
    }

    return (
        <Fragment>

            <div className={'flex items-center h-[50px]'}>
                <PreviousDate onClick={prevSlide}/>
                <Swiper
                    slidesPerView={'auto'}
                    className={''}
                    ref={swiperRef}
                >
                    {dateArray.map((item, index) =>
                        <SwiperSlide className={'max-w-max'}>
                            <div
                                key={index}
                                onClick={() => setDate(item)}
                                className={returnClass(item)}
                            >
                                {moment(item).format('MMM')} {item.getFullYear()}
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
                <NextDate onClick={nextSlide}/>
            </div>
        </Fragment>
    )
}


const PreviousDate = ({onClick}: { onClick: Function }) => {

    const swiper = useSwiper();

    return (
        <div
            className={'h-full  flex items-center min-w-[30px]  max-w-[30px] border-[0.5px] border-solid border-primary cursor-pointer select-none'}
            onClick={() => onClick()}
        >
            <Image draggable={false} src={'/right-arrow-1.svg'} alt={''} height={20} width={28}
                   className={'rotate-180'}/>
        </div>
    )
}

const NextDate = ({onClick}: { onClick: Function }) => {

    const swiper = useSwiper();

    return (
        <div
            className={'w-full min-w-[30px] max-w-[30px] flex items-center h-full border-[0.5px] border-solid border-primary cursor-pointer select-none'}
            onClick={() => onClick()}>
            <Image draggable={false} src={'/right-arrow-1.svg'} alt={''} height={20} width={28}/>
        </div>
    )
}

