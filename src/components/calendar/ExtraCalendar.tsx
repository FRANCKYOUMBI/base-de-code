'use client'
import React, { useState } from 'react'
import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
} from "date-fns"
import { fr } from "date-fns/locale";
import { Mission } from '@prisma/client';

interface DateStateType {
    currentMonth: Date,
    selectedDate: Date
}
export interface CalendarPropsType {
    data: Mission[],
}
export function ExtraCalendar(Props: CalendarPropsType) {
    const { data } = Props;
    const [dateState, setDateState] = useState<DateStateType>({
        currentMonth: new Date(),
        selectedDate: new Date()
    });

    function handleDateClick(day: Date) {
        setDateState({
            selectedDate: day,
            currentMonth: dateState.currentMonth
        });
    }

    function handleRenderCells() {
        const { currentMonth, selectedDate }: DateStateType = dateState;
        const monthStart: Date = startOfMonth(currentMonth);
        const monthEnd: Date = endOfMonth(monthStart);
        const startDate: Date = startOfWeek(monthStart);
        const endDate: Date = endOfWeek(monthEnd);
        const normalDateFormat: string = "dd MMM yyyy"
        const rows = [];

        let days = [];
        let day: Date = startDate;
        let formattedDate: string = "";

        function handleFilterMissionByDate(date: Date): Mission[] {
            return data.filter(mission => format(mission.createdAt!, normalDateFormat) === format(date, normalDateFormat));
        }
        while (day <= endDate) {
            for (let i: number = 0; i < 9; i++) {
                formattedDate = format(day, normalDateFormat, { locale: fr });
                const cloneDay: Date = day;
                days.push(
                    <div
                        className={`w-full h-[68px] flex flex-col items-center justify-end mt-[2px] ${handleFilterMissionByDate(day).length > 0 ? 'bg-secondary text-white' : 'bg-[#D9D9D9]'}`}
                        key={i}
                        onClick={() => handleDateClick(cloneDay)}
                    >
                        {handleFilterMissionByDate(day).length > 0 &&
                            <span className="text-[18px] mb-2 h-[25px] w-[25px] bg-white text-primary rounded-full flex items-center justify-center">
                                {handleFilterMissionByDate(day).length}
                            </span>
                        }
                        <span className="text-[12px]">{formattedDate}</span>

                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="flex justify-between gap-[2px]" key={day.toISOString()}>
                    {days}
                </div>
            );
            days = [];
        };
        return <div className="body w-[800px] md:w-auto">{rows}</div>;

    }

    return (
        <div className='calendar mt-[15px]'>
            <div className="px-0 md:px-[20px] py-[7px] overflow-x-auto">
                {handleRenderCells()}
            </div>
        </div>
    )
}
