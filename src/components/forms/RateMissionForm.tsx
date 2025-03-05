"use client"
import React, { useState } from 'react'
import { TextArea } from './Fields';
import { useForm } from 'react-hook-form';

interface FormType {
    comment: string,
    starts: number
}

interface RatingMissionFormProps {
    callback: any
}

export function RateMissionForm({ callback }: RatingMissionFormProps) {
    const [rating, setRating] = useState<number>(0);
    const handleRatingChange = (value: number) => {
        setRating(value);
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormType>();

    function handleRegisterComment(data: FormType) {
        data.starts = rating;
        console.log(data);
        callback()
    }

    return (
        <form
            onSubmit={handleSubmit(handleRegisterComment)}
        >
            <TextArea
                register={register}
                errors={errors}
                name={"comment"}
                validationSchema={{
                    required: true
                }}
                placeholder="Laisser un commentaire"
            />
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    type='button'
                    key={value}
                    onClick={() => handleRatingChange(value)}
                    className={`mr-1 focus:outline-none ${rating >= value ? 'text-primary' : 'text-[#D9D9D9]'
                        }`}
                >
                    <svg aria-hidden="true" className="w-[28px] h-[28px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
            ))}
            <div className="mt-[10px]">
                <button
                    type="submit"
                    className={'button-square text-primary bg-pink hover:bg-primary/20 transition-all ease-in-out duration-[0.5s]'}>
                    Envoyer
                </button>
            </div>
        </form>
    )
}
