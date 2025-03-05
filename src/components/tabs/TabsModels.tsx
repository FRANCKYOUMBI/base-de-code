'use client'
import {useEffect, useMemo, useState} from 'react'
import {Tab} from '@headlessui/react'
import {FilterBare} from './FilterBare';
import {Calendar} from '../calendar/Calendar';
import {useModalContext} from '@/contexts/ModalContext';
import {fr} from 'date-fns/locale';
import {format} from 'date-fns';
import {BaseModal} from '../modals/BaseModal';
import {ExecutedMission} from '../cards/MissionCards';
import {missions} from '@/data/missionData';
import moment from "moment";
import {Mission, ShiftType} from "@/types/missions";
import {MissionStatus} from "@prisma/client";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function BasicTabs({date}: { date: Date }) {
    const {openModal, closeModal} = useModalContext();
    const [isListed, setIsListed] = useState<boolean>(true);
    const [missions, setMissions] = useState<Mission[]>([])

    const executed = useMemo(() => missions.filter(e => e.status === MissionStatus.EXECUTE), [missions])

    const waiting = useMemo(() => missions.filter(e => e.status === MissionStatus.WAITING), [missions])
    const confirmed = useMemo(() => missions.filter(e => e.status === MissionStatus.CONFIRM), [missions])

    const fetchAllMissions = async () => {
        const req = await fetch(`/api/missions?date=${moment(date).format('YYYY-MM-DD')}&by=month`);
        if (req.status == 200) {
            const data = await req.json()
            setMissions(data)
        }

    }
    useEffect(() => {
        fetchAllMissions();
    }, [date])

    function handleClick(mission: Mission) {
        function returnHeader() {
            return mission.status === "EXECUTE"
                ? "Mission Exécutée"
                : mission.status === "CONFIRM"
                    ? "Extras confirmés" :
                    "Demandes en attente"

        }

        openModal(
            <BaseModal
                content={<ExecutedMission mission={mission}/>}
                closeModal={closeModal}
                header={returnHeader()}
                type={mission.status == MissionStatus.CONFIRM ? 'green' : mission.status == MissionStatus.WAITING ? 'orange' : 'primary'}
                width={614}
            />
        );
    };


    const tabColor = (index: number): string => index === 0 ? 'green' : index === 1 ? 'orange' : 'primary';

    const transition: string = "transition-all ease-in-out duration-[0.2s]"

    function setTabsItemsClass(): string {
        if (isListed) {
            return "py-[18px] font-[700] text-[16px] leading-[19px] outline-none focus:outline-none" + transition
        } else {
            return "py-[18px] font-[300] text-[16px] leading-[19px] outline-none"
        }
    }

    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex justify-between items-center border-solid border-b-[1px] border-[#373737]">
                    <div className="flex gap-[93px]">
                        <Tab
                            disabled={!isListed}
                            className={({selected}) =>
                                classNames(setTabsItemsClass(),
                                    selected
                                        ? `${isListed && 'outline-none border-solid border-b-[5px] border-black text-green'}`
                                        : ''
                                )
                            }
                        >
                            Extras confirmés ({confirmed.length})
                        </Tab>
                        <Tab
                            disabled={!isListed}
                            className={({selected}) =>
                                classNames(
                                    setTabsItemsClass(),
                                    selected
                                        ? `${isListed && 'outline-none border-solid border-b-[5px] border-black text-orange'}`
                                        : ''
                                )
                            }
                        >
                            Demandes en attente ({waiting.length})
                        </Tab>
                        <Tab
                            disabled={!isListed}
                            className={({selected}) =>
                                classNames(
                                    setTabsItemsClass(),
                                    selected
                                        ? `${isListed && 'outline-none border-solid border-b-[5px] border-black text-primary'}`
                                        : ''
                                )
                            }
                        >
                            Missions exécutées ({executed.length})
                        </Tab>
                    </div>
                    <button
                        className={`px-[32px] h-[35px] bg-pink text-[16px] font-[400] leading-[19px] hover:bg-[#a689af] ${transition}`}
                    >
                        Imprimer
                    </button>
                </Tab.List>
                <Tab.Panels className="mt-[14px]">
                    {["green", "orange", "primary"].map((status, catIndex: number) => (
                        <Tab.Panel
                            key={catIndex}
                        >
                            <FilterBare
                                toggleListCalender={setIsListed}
                                isListed={isListed}
                            />
                            {isListed ?
                                <ul
                                    className="grid grid-flow-row-dense grid-cols-2 grid-rows-3 gap-[30px] mt-[35px]"
                                >
                                    {(status == "green" ? confirmed : status == "orange" ? waiting : executed).map((post, index: number) => (
                                        <div
                                            className='flex gap-[14px] cursor-pointer'
                                            key={index}
                                            onClick={() => handleClick(post)}

                                        >
                                            <div
                                                className={`h-[16px] w-[16px] rounded-[100%] bg-${tabColor(catIndex)}`}></div>
                                            <li
                                                key={index}
                                                className="w-full"
                                            >
                                                <ul className="text-[14px] text-black">
                                                    <li className='font-[700]'>{moment(post.createdAt).format('ll')}: {post.shiftType == ShiftType.EVENING ? 'Soir' : post.shiftType == ShiftType.MORNING ? 'Matin' : 'Nuit'}</li>
                                                    <li>Référence N°: {post.reference}</li>
                                                    {/* <li>Commande effectuée le : {format(post.date, "dd MMM yyyy 'à' HH'h':mm", { locale: fr })}</li> */}
                                                </ul>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                                :
                                <Calendar
                                    data={missions}
                                    itemSelected={handleClick}
                                />
                            }
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
