import React, {useEffect, useState} from 'react';
import moment from "moment";
import {TimePickerField} from './Fields';
import {useModalContext} from '@/contexts/ModalContext';
import {ICreateTask, Mission, ShiftType} from '@/types/missions';
import {BaseModal} from "@/components/modals/BaseModal";
import {SuccessModalContent} from "@/components/hotel/nouvelle-requete/PageSideLeft";
import {useSession} from "next-auth/react";

interface FormProps {
    mission: Mission
}
export function AskExtraForm({ mission }: FormProps) {
    const { openModal, closeModal } = useModalContext();
    const session = useSession();
    const [
        loading,
        setLoading
    ] = useState<boolean>(false);
    const [hourStart, setHourStart] = useState<moment.Moment>();
    const [hourEnd, setHourEnd] = useState<moment.Moment>();
    const [schift, setSchift] = useState<ShiftType>();
    const [totalHour, setTotalHour] = useState<string>('...');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();

    useEffect(() => {
        if (typeof hourStart != 'undefined' && typeof hourEnd != 'undefined') {
            setTotalHour(moment.utc(hourEnd?.diff(hourStart, 'millisecond')).format('HH:mm'));
        }
        if (hourStart?.hours()) {
            if (hourStart?.hours() >= 0 && hourStart?.hours() <= 11) {
                setSchift(ShiftType.MORNING)
            } else if (hourStart?.hours() >= 12 && hourStart?.hours() <= 17) {
                setSchift(ShiftType.AFTERNOON)
            } else {
                setSchift(ShiftType.AFTERNOON);
            }
        }
    }, [hourStart, hourEnd]);

    const validate = (): boolean => {
        return !(!hourStart || !hourEnd);
    }

    const createMission = async () => {
        if (validate()) {
            setLoading(true);
            const body: ICreateTask = {
                hourStart: hourStart!.format('HH:mm'),
                hourEnd: hourEnd!.format('HH:mm'),
                hours: moment(totalHour, "HH:mm").hours(),
                schift: schift,
                endDate: moment(endDate).format("YYYY-MM-DD"),
                startDate: moment(startDate).format("YYYY-MM-DD"),
                hotel_id: session?.data?.user?.id ?? '',
            }
            await fetch('/api/missions/extra', {
                method: 'POST',
                body: JSON.stringify(body)
            }).finally(() => {
                setLoading(false);
                openModal(
                    <BaseModal
                        closeModal={closeModal}
                        content={<SuccessModalContent />}
                        header={"Succès"}
                        type={"primary"}
                        title={true}
                    />
                )
            })
        }
    }

    return (
        <div className='px-[15px] py-[30px]'>
            <div className={'grid gap-4 grid-cols-4'}>
                <div className={'flex flex-col'}>
                    <span className='text-[16px]'>Heure de début</span>
                    <TimePickerField
                        onTimeChange={(time: string) => {
                            setHourStart(moment(time, 'HH:mm'));
                        }}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <span className='text-[16px]'>Heure de début</span>
                    <TimePickerField
                        onTimeChange={(time: string) => {
                            setHourEnd(moment(time, 'HH:mm'));
                        }}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <span className='text-[16px]'>Schift</span>
                    <div className={'border-solid border-[1px] border-[#B9B9B9] rounded-[20px] h-[66px] w-full flex items-center justify-center px-[10px] text-[#B9B9B9] text-[20px]'}>
                        {schift === "MORNING"? "Matin": schift === "AFTERNOON" ? "Après midi" : "Soir"}
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <span className='text-[16px]'>Nombres d'heure</span>
                    <div className={'border-solid border-[1px] border-[#B9B9B9] rounded-[20px] h-[66px] w-full flex items-center justify-center px-[10px] text-[#B9B9B9] text-[20px]'}>
                        {totalHour}
                    </div>
                </div>
            </div>
            <button onClick={createMission} disabled={!validate()} className={'button-square bg-primary w-full text-white mt-10'}>
                Demander un Extra
            </button>
        </div>
    )
}
