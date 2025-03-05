import React from 'react'

interface HistoryStatCardType {
    type: 'green' | "orange" | "primary" | "black",
    mainText: string | number,
    subText: string
    style?: string
}

export function HistoryStatCard({type, mainText, subText, style}: HistoryStatCardType) {
    return (
        <div className={`px-[10px] py-[32px] rounded-[20px] flex flex-col justify-center items-center  bg-${type} ${style != undefined ? style : ''}`}>
            <h1 className='text-[70px] font-[700] leading-[90px] text-white'>
                {mainText}
            </h1>
            <h4 className='text-[18px] font-[700] leading-[25px] text-center text-white px-[40px]'>
                {subText}
            </h4>
        </div>
    )
}
