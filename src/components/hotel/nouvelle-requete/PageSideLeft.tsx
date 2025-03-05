'use client'
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import DateSelect from "@/components/forms/DateSelect";
import moment from "moment";
import {undefined} from "zod";
import Image from "next/image";
import {Software, Document} from "@prisma/client";
import {ICreateTask, ShiftType} from "@/types/missions";
import {Session} from "next-auth";
import {useModalContext} from "@/contexts/ModalContext";
import {BaseModal} from "@/components/modals/BaseModal";


interface Props {
    software: Software[];
    documents: Document[]
    session: Session | null
}

const PageSideLeft = ({software, documents, session}: Props) => {

    const { openModal, closeModal } = useModalContext();

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();
    const [multiDate, setMultiDate] = useState<boolean>(false);
    const [hourStart, setHourStart] = useState<moment.Moment>()
    const [hourEnd, setHourEnd] = useState<moment.Moment>()
    const [schift, setSchift] = useState<ShiftType>();
    const [totalHour, setTotalHour] = useState<string>('...');
    const [loading, setLoading] = useState<boolean>(false)

    const validate = (): boolean => {
        if (multiDate && !endDate) return false;
        if (!hourStart || !hourEnd) return false;
        return true
    }

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
                setSchift(ShiftType.EVENING)
            }
        }
    }, [hourStart, hourEnd])

    const createMission = async () => {
        if (validate()) {
            setLoading(true);
            const body: ICreateTask = {
                hourStart: hourStart!.format('HH:mm'),
                hourEnd: hourEnd!.format('HH:mm'),
                hours: moment(totalHour, "HH:mm").hours(),
                schift: schift,
                endDate: moment(endDate).format("YYYY-MM-DD"),
                startDate: moment(endDate).format("YYYY-MM-DD"),
                hotel_id: session?.user?.id ?? '',
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
        <div className={"flex flex-col flex-1 h-[calc('100%'_-_1rem)] relative"}>

            <div className={'absolute px-4 w-full z-10'}>
                <div className={'bg-white top-0 flex items-center gap-5 h-[170px]  shadow-normal p-[30px] w-full'}>
                    <div style={{background: `url(${session?.user?.image}) no-repeat center/cover`}}
                         className={'min-h-[80px] min-w-[80px] rounded-full border-[1px] border-black'}/>
                    <div>
                        <h4 className={'text-black text-[22px] font-bold'}>{session?.user?.hotelName}</h4>
                        <p className={'text-black text-[18px] italic'}>{session?.user?.address}</p>
                    </div>
                </div>
            </div>
            <div className={'overflow-scroll scrollbar-hide pt-[185px] w-full h-full p-4'}>

                <div className={'shadow-normal'}>
                    <div className={'p-8'}>
                        <div className={'flex items-center gap-3 mb-3'}>
                            <div className={'h-[30px] w-[30px] bg-secondary rounded-full'}/>
                            <h5 className={'uppercase font-bold text-black'}>Demander un extra</h5>
                        </div>
                        <div className={'flex flex-col gap-3'}>
                            <div className={'flex items-center gap-4'}>
                                <span>{multiDate ? 'Du' : 'Le'}</span>
                                <DatePicker
                                    onChange={(date) => {
                                        setStartDate(date ?? new Date());
                                    }}
                                    selected={startDate}
                                    maxDate={endDate}
                                    customInput={<DateSelect/>}
                                />
                            </div>
                            <div className={'flex items-center gap-4'}>
                                <input
                                    type={'checkbox'}
                                    className={'rounded-[5px] cursor-pointer outline-none border-2 border-black text-black'}
                                    checked={multiDate}
                                    onChange={() => setMultiDate(!multiDate)}
                                />
                                <span className={'text-black'}>Multi date</span>
                            </div>
                            <div className={'flex items-center gap-4'}>
                                <span>Au</span>
                                <DatePicker
                                    onChange={(date) => {
                                        setEndDate(date ?? new Date());
                                    }}
                                    minDate={startDate ?? undefined}
                                    selected={endDate}
                                    disabled={!multiDate}
                                    customInput={<DateSelect/>}
                                />
                            </div>
                        </div>

                        <div className={'flex gap-4 mt-5'}>
                            <div className={'flex flex-col gap-3'}>
                                <span>Heure de début</span>
                                <TimePicker
                                    showSecond={false}
                                    clearIcon={<div/>}
                                    placeholder={'...'}
                                    onChange={(newValue) => {
                                        setHourStart(newValue)
                                    }}
                                />
                            </div>
                            <div className={'flex flex-col gap-3'}>
                                <span>Heure de fin</span>
                                <TimePicker
                                    showSecond={false}
                                    placeholder={'...'}
                                    clearIcon={<div/>}
                                    onChange={(newValue) => {
                                        setHourEnd(newValue)
                                    }}
                                    className={'border-primary'}
                                />
                            </div>
                        </div>
                        <div className={'flex gap-4 mt-5 text-lg'}>
                            <div className={'flex flex-col flex-1 '}>
                                <span>Schift</span>
                                <div
                                    className={'border-2 border-black rounded-[10px] h-[40px] w-full flex items-center justify-center'}>
                                    {schift ?? '...'}
                                </div>
                            </div>
                            <div className={'flex flex-col flex-1'}>
                                <span>Nombres d'heure</span>
                                <div
                                    className={'border-2 border-black rounded-[10px] h-[40px] w-full flex items-center justify-center'}>
                                    {totalHour}
                                </div>
                            </div>
                        </div>
                        <button
                            className={`button-square ${validate() ? 'bg-primary' : 'bg-gray'} ${loading ? "opacity-60 cursor-not-allowed" : ""} w-full text-white mt-5`}
                            onClick={createMission}>
                            Demander un Extra
                        </button>
                    </div>
                    <div className={'border-t-[1px] border-t-gray p-8'}>
                        <div className={'flex items-center gap-3 mb-3'}>
                            <div className={'h-[30px] w-[30px] bg-gray rounded-full'}/>
                            <h5 className={'uppercase font-bold text-black'}>LOGICIEL DE GESTION</h5>
                        </div>
                        <ul className={'list-disc ml-14'}>
                            {software.map((soft) => <li key={soft.uuid}>{soft?.name}</li>)}
                        </ul>
                    </div>
                    <div className={'border-t-[1px] border-t-gray p-8'}>
                        <div className={'flex items-center gap-3 mb-4'}>
                            <div className={'h-[30px] min-h-[30px] w-[30px] min-w-[30px] bg-gray rounded-full'}/>
                            <div className={'flex gap-x-2 items-end flex-wrap'}>
                                <h5 className={'uppercase font-bold text-black'}>DOCUMENTATION EXTRA</h5>
                                <p className={'cursor-pointer underline text-primary text-[10px] font-bold'}>Mettre à
                                    jour les documents</p>
                            </div>
                        </div>
                        <div className={'grid grid-cols-5 gap-3 ml-8'}>
                            {
                                documents?.map((doc) => {
                                    return <div className={'flex flex-col items-center gap-2'} key={doc.uuid}>
                                        <Image src={'/document_purple_icon.svg'} alt={''} height={30} width={30}
                                               draggable={false} className={'select-none'}/>
                                        <h5 className={'text-[10px] underline truncate max-w-full'}>{doc.name}</h5>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageSideLeft;

export function SuccessModalContent() {
    return(
        <div className={"flex flex-col justify-center items-center py-10 gap-5 bg-white rounded-[16px]"}>
            <span className={"rounded-[8px] bg-gray text-[24px] text-center font-[700] text-white px-[32px] py-[16px]"}>VQUARIUS VGENCY</span>
            <h2 className={"text-[32px] text-center font-[700] text-primary"}>
                Votre requête a été envoyée !
            </h2>
            <img src="/checked-success.svg" alt="icon success"/>
        </div>
    )
}
