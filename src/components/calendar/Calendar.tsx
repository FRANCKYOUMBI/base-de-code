'use client'
import React, { useState } from 'react'
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths,
} from "date-fns"
import { Mission, MissionStatus } from "@/types/missions";
import moment from "moment";
import { isSameDate } from "@/utils/date";

interface DateStateType {
    currentMonth: Date,
    selectedDate: Date
}

export interface CalendarPropsType {
    data?: Mission[],
    itemSelected?: any
}

export function Calendar(
    { data, itemSelected }: CalendarPropsType
) {

    const [dateState, setDateState] = useState<DateStateType>({
        currentMonth: new Date(),
        selectedDate: new Date()
    });

    function handleNextMonth() {
        setDateState({
            currentMonth: addMonths(dateState.currentMonth, 1),
            selectedDate: dateState.selectedDate
        })
    }

    function handlePrevMonth() {
        setDateState({
            currentMonth: subMonths(
                dateState.currentMonth, 1
            ),
            selectedDate: dateState.selectedDate
        })
    }

    function handleDateClick(day: Date) {
        setDateState({
            selectedDate: day,
            currentMonth: dateState.currentMonth
        });
    }

    function handleRenderHeader() {
        const dateFormat: string = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={handlePrevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{moment(dateState.currentMonth).format('MMMM yyyy')}</span>
                </div>
                <div className="col col-end" onClick={handleNextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    };

    function handleRenderDays() {
        const dayFormat: string = 'EEEE';
        const days = [];
        let startDate = startOfWeek(
            dateState.currentMonth
        );
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center font-[700] capitalize" key={i}>
                    {moment(addDays(startDate, i)).format('ddd')}
                </div>
            )
        }
        ;
        return <div className="ays row py-1">
            {days}
        </div>
    }

    function handleRenderCells() {
        const { currentMonth, selectedDate }: DateStateType = dateState;
        const monthStart: Date = startOfMonth(currentMonth);
        const monthEnd: Date = endOfMonth(monthStart);
        const startDate: Date = startOfWeek(monthStart);
        const endDate: Date = endOfWeek(monthEnd);

        const dateFormat: string = "d";
        const normalDateFormat: string = "dd MMM yyyy"
        const rows = [];

        let days = [];
        let day: Date = startDate;
        let formattedDate: string = "";
        while (day <= endDate) {
            for (let i: number = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay: Date = day;
                days.push(
                    <div
                        key={i}
                        className={`col cell mt-[10px] p-[5px] ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        onClick={() => handleDateClick(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        <ul className='flex flex-col gap-[5px]'>
                            {data?.filter(item => isSameDate(new Date(item.createdAt), day) || isSameDate(new Date(item.updatedAt), day) || isSameDate(new Date(item.acceptedAt ?? 1970), day)).map((item, index: number) => {
                                return (
                                    <div
                                        onClick={() => itemSelected(item)}
                                        className={'flex gap-1 items-center max-w-max'}
                                    >
                                        <div
                                            key={`calendar_cels_${index}`}
                                            className={`h-[16px] w-[16px] rounded-[100%] ${item.status == MissionStatus.DONE ? 'bg-black' : item.status == MissionStatus.CONFIRM ? 'bg-green' : item.status == MissionStatus.EXECUTE ? 'bg-primary' : 'bg-orange'}`}
                                        >
                                        </div>
                                        {item.shiftType == "MORNING" ? 'Matin' : item.shiftType == "EVENING" ? 'Soir' : "Nuit"}
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day.toISOString()}>
                    {days}
                </div>
            );
            days = [];
        };
        return <div className="body">{rows}</div>;

    }

    return (
        <div className='calendar mt-[15px]'>
            {/* {handleRenderHeader()} */}
            <div className="p-4">
                {handleRenderDays()}
                {handleRenderCells()}
            </div>
        </div>
    )
}
