import React, { Dispatch, SetStateAction } from 'react'

interface FilterBareType {
    toggleListCalender: Dispatch<SetStateAction<boolean>>,
    isListed: boolean
}
export function FilterBare({ toggleListCalender, isListed }: FilterBareType) {

    return (
        <div className='flex flex-row justify-end items-center gap-[20px] relative'>
            {isListed &&
                <div className='flex justify-between absolute left-0 gap-[100px]'>
                    <button className='border-solid border-[1px] border-[#D9D9D9] text-black font-[700] text-[16px] leading-[19px] p-[10px]'>
                        Toutes
                    </button>
                    <div className="flex justify-center items-center gap-[10px]">
                        <h6 className='text-black font-[700] text-[16px] leading-[19px] p-[10px]'>
                            Effectuée le :
                        </h6>
                        <ul className='flex p-[10px] gap-[32px] border-solid border-[1px] border-[#D9D9D9] text-[#D9D9D9] text-[16px] font-[800] leading-[19px]'>
                            <li>02</li>
                            <li>05</li>
                            <li>08</li>
                            <li>11</li>
                            <li>20</li>
                            <li>22</li>
                            <li>25</li>
                        </ul>
                    </div>
                </div>
            }
            <div className="flex justify-center items-center gap-[10px]">
                <h6 className='text-black font-[700] text-[16px] leading-[19px] p-[10px]'>
                    Vue :
                </h6>
                <button
                    onClick={() => toggleListCalender(true)}
                    className={`border-none ${isListed ? "bg-black/40" : "bg-black/10"} text-[#000] font-[700] text-[16px] leading-[19px] p-[10px] hover:bg-black/40`}
                >
                    Liste
                </button>
                <button
                    onClick={() => toggleListCalender(false)}
                    className={`border-none ${!isListed ? "bg-black/40" : "bg-black/10"} text-[#000] font-[700] text-[16px] leading-[19px] p-[10px] hover:bg-black/40`}
                >
                    Calendier
                </button>
            </div>
        </div>
    )
}
