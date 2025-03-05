'use client'

import {HistoryStatCard} from "@/components/cards/CardsModels";
import React, {useEffect, useState} from "react";
import {MissionsStatistics} from "@/types/Datatype";


export default function HeaderCard({date}: { date: Date }) {

    const [stats, setStats] = useState<MissionsStatistics>({
        done: 0,
        confirmed: 0,
        waiting: 0,
        executed: 0,
    });

    const fetchStats = async () => {
        const req: Response = await fetch('/api/mission-statistics', {
            method: "POST", body: JSON.stringify({
                date: date
            })
        });
        if (req.status == 200) {
            const data = await req.json();
            setStats(data);
        }
    }

    useEffect(() => {
        fetchStats();
    }, [date])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4  gap-[10px] justify-between mt-[30px]">
            <HistoryStatCard
                type="black"
                mainText={stats.done}
                subText="DEMANDES EFFECTUÉES"
            />
            <HistoryStatCard
                type="green"
                mainText={stats.confirmed}
                subText="EXTRAS CONFIRMÉS"
            />
            <HistoryStatCard
                type="orange"
                mainText={stats.waiting}
                subText="DEMANDES EN ATTENTE"
            />
            <HistoryStatCard
                type="primary"
                mainText={stats.executed}
                subText="MISSIONS EXÉCUTÉES"
            />
        </div>
    )
}