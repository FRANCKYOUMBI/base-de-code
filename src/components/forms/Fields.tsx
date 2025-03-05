'use client';
import React, { useEffect, useState } from "react"
import { InputHTMLAttributes, Fragment, TextareaHTMLAttributes } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'placeholder'> {
    register: UseFormRegister<any>,
    validationSchema?: RegisterOptions,
    errors: FieldErrors,
    name: string,
    placeholder?: string,
    label?: string,
    labelWhite?: boolean
}

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'placeholder' | 'className'> {
    register: UseFormRegister<any>,
    validationSchema?: RegisterOptions,
    errors: FieldErrors,
    name: string,
    placeholder?: string,
}

export function InputField({
    register,
    errors,
    validationSchema,
    name,
    placeholder,
    label,
    labelWhite,
    ...props }: InputFieldProps) {
    return (
        <Fragment>
            {label &&
                <label
                    htmlFor={name}
                    className={`text-[20px] font-[400] leading-[35px] ${labelWhite && "text-white"}`}
                >
                    {label}
                </label>
            }
            <input
                id={name}
                type={"text"}
                placeholder={placeholder}
                className={`${!!errors[name] && 'border-red-500 focus:border-red-500'} w-full bg-white border-solid border-[2px] border-[#D9D9D9]   rounded-md px-5 py-[10px] placeholder-placeholder focus:border-primary ring-0 focus:ring-0 placeholder:text-[#37373766]`}
                {...register(name, validationSchema)}
                {...props}
            />
            {errors[name] && errors[name]?.message && <span
                className={`text-[14px] font-[400] text-red-500`}
            >
                {errors[name]?.message as string}
            </span> 
            }
        </Fragment>

    )
}

export function TextArea({
    register,
    errors,
    validationSchema,
    name,
    placeholder,
    ...props
}: TextAreaProps) {

    return (
        <textarea
            rows={5}
            placeholder={placeholder}
            className={`${!!errors[name] ? 'border-red-500 focus:border-red-500' : ''} w-full h-full bg-white border-solid border-[2px] border-[#D9D9D9] focus:border-yellow ring-black_shade focus:border-primary ring-0 focus:ring-0 rounded-md p-5 py-4 resize-none placeholder:text-[#37373766]`}
            {...register(name, validationSchema)}
            {...props}
        />
    )
}

type TimeChangeHandler = (time: string) => void;
interface TimePickerProps {
    onTimeChange: TimeChangeHandler;
}

export function TimePickerField({ onTimeChange }: TimePickerProps) {
    const [hours, setHours] = useState(new Date().getHours());
    const [minutes, setMinutes] = useState(new Date().getMinutes());

    const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHours(parseInt(e.target.value));
        onTimeChange(`${e.target.value}:${minutes}`);
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMinutes(parseInt(e.target.value));
        onTimeChange(`${hours}:${e.target.value}`);
    };

    useEffect(() => {
        onTimeChange(`${hours}:${minutes}`);
    }, [hours, minutes]);

    return (
        <div
            className={'border-solid border-[1px] border-[#E5E5E5] rounded-[20px] h-[66px] w-full flex items-center justify-center px-[10px] bg-[#E5E5E5] text-[#B9B9B9] text-[20px]'}
        >
            <select
                className="time-picker-select w-full h-full ring-0 focus:ring-0 cursor-pointer"
                value={hours}
                onChange={handleHourChange}
            >
                {Array.from(Array(24).keys()).map((hour) => (
                    <option key={hour} value={hour}>
                        {hour.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>
            :
            <select
                className="time-picker-select w-full h-full ring-0 focus:ring-0 cursor-pointer"
                value={minutes}
                onChange={handleMinuteChange}
            >
                {Array.from(Array(60).keys()).map((minute) => (
                    <option
                        key={minute}
                        value={minute}
                    >
                        {minute.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>
        </div>
    )
}