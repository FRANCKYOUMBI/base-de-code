'use client'

import React, {useState} from "react";
import {HistoryStatCard} from "@/components/cards/CardsModels";

import 'swiper/css';
import "swiper/css/pagination";
import BasicTabs from "@/components/tabs/TabsModels";
import {MissionsCarousel} from "@/components/carousels/MissionsCarousel";
import prisma from "@/services/prisma";
import {Mission, MissionStatus} from "@prisma/client";
import HeaderCard from "@/components/hotel/historique-missions/HeaderCard";

export default function HistoriqueMissions() {
    const [date, setDate] = useState<Date>(new Date());
    return (
        <main className="p-[30px]">
            <div className="">
                <MissionsCarousel date={date} setDate={setDate}/>
            </div>
            <HeaderCard date={date}/>
            <div className="">
                <BasicTabs date={date}/>
            </div>
        </main>
    )
}