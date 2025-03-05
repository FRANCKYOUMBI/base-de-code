import moment from "moment";
import {forwardRef, useState} from "react";
import Image from "next/image";

const DateSelect = forwardRef(({value, onClick, disabled}: any, ref) => {


        return (
            <div
                onClick={disabled ? null : onClick}
                className={`border-black border-[1px] p-2 rounded-md cursor-pointer flex justify-between gap-5 max-w-[300px] ${disabled ? 'bg-[#E5E5E5] opacity-40' : 'bg-white'}`}
                tabIndex={1}>
                <p>{moment(value).isValid() ? moment(value).format('ll') : "..."}</p>
                <Image src={'/calendar_icon.svg'} alt={'calendar'} className={'select-none'} height={25} width={25}
                       draggable={false}/>
            </div>
        );
    }
)


export default DateSelect;