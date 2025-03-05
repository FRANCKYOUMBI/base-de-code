'use client'

import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css';
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import 'moment/locale/fr'
import { getCurrentWeekDates } from "@/utils/date";
import { getSchift } from "@/utils/utilities";
import { Mission, ShiftType } from "@/types/missions";


const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() == secondDate.getDate();
}

const PageSideRight = () => {
  moment.locale('fr')
  const [startDate, endDate] = getCurrentWeekDates();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [missions, setMission] = useState<Mission[]>([])
  const dateArray: Date[] = [];
  let i = 0;

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
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

  const getMissions = async () => {
    const req = await fetch(`/api/missions?date=${moment(currentDate).format('YYYY-MM-DD')}`);
    if ([200, 201].includes(req.status)) {
      const data: Mission[] = await req.json();
      setMission(data)
    }
  }

  useEffect(() => {
    getMissions()
  }, [currentDate])


  return (
    <div className={'flex-1 min-w-full '}>
      <div className={'flex h-[128px] gap-1'}>

        <PreviousDate onClick={prevSlide} />
        <Swiper
          initialSlide={i - 1}
          slidesPerView={'auto'}
          className={'flex'}
          ref={swiperRef}
        >
          {dateArray.map((e) => {
            return <SwiperSlide
              className={'max-w-max mr-2 select-none'}

            >
              <div
                onClick={() => {
                  setCurrentDate(e)
                }}
                className={`uppercase min-w-[106px] min-h-[128px] border-[1px] border-solid border-[#373737] flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${isSameDate(e, currentDate) ? 'bg-primary text-white' : ''}`}>
                <p className={'text-sm'}>
                  {moment(e).format('dddd')}
                </p>
                <p className={'text-5xl'}>
                  {moment(e).format('D').padStart(2, '0')}
                </p>
                <p className={'text-sm'}>
                  {moment(e).format('MMMM')}
                </p>
              </div>
            </SwiperSlide>;
          })}
        </Swiper>
        <NextDate onClick={nextSlide} />
      </div>
      <div className={'w-full text-xl bg-primary py-2 mt-3 text-center text-white font-[500]'}>
        DEMANDES ENREGISTRÉES
      </div>
      <div className={'flex flex-col gap-2 mt-5'}>
        {missions.map((mission) => {
          return <SchiftComponent date={mission.from} date_order={mission.createdAt} reference={mission.reference} period={mission.shiftType} />
        })}
      </div>
    </div>
  )
}

export default PageSideRight;


const PreviousDate = ({ onClick }: { onClick: Function }) => {
  return (
    <div
      className={'h-full  flex items-center min-w-[30px] w-[30px] border-[0.5px] border-solid border-primary cursor-pointer select-none'}
      onClick={() => onClick()}
    >
      <Image draggable={false} src={'/right-arrow-1.svg'} alt={''} height={20} width={28}
        className={'rotate-180'} />
    </div>
  )
}

const NextDate = ({ onClick }: { onClick: Function }) => {

  return (
    <div
      className={'w-[30px] min-w-[30px] flex items-center h-full border-[0.5px] border-solid border-primary cursor-pointer select-none'}
      onClick={() => onClick()}>
      <Image draggable={false} src={'/right-arrow-1.svg'} alt={''} height={20} width={28} />
    </div>
  )
}

const SchiftComponent = ({ period, date_order, date, reference }: Schift) => {
  return (
    <div className={'flex gap-3'}>
      <div className={'w-[16px] h-[16px] mt-1 bg-[#B9B9B9] rounded-full'} />
      <div>
        <p className={'font-bold'}><span>{moment(date).format('ll')}: <span>{getSchift(period)}</span></span></p>
        <p>Reference N: {reference}</p>
        <p>Commande effectué le: { moment(date_order).format('ll')}</p>
      </div>
    </div>
  )
}

interface Schift {
  date: Date,
  reference: String,
  date_order: Date,
  period: ShiftType,
}
