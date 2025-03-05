"use client"
import React, {useState} from "react";
import {useModalContext} from "@/contexts/ModalContext";
import {BaseModal} from "../modals/BaseModal";
import {RateMissionForm} from "../forms/RateMissionForm";
import {AskExtraForm} from "../forms/AskExtraForm";
import moment from "moment";
import {Mission, ShiftType} from "@/types/missions";

interface MissionProps {
    mission: Mission
}

export const ExecutedMission = ({mission}: MissionProps) => {
    const {closeModal, openModal} = useModalContext();
    const [showRatingForm, setShowRatingForm] = useState(false);

    function openNewRequestModal() {
        openModal(
            <BaseModal
                content={<AskExtraForm mission={mission}/>}
                closeModal={closeModal}
                header={"Nouvelle Requête"}
                width={614}
            />
        )
    }

    return (
        <div className="flex justify-start gap-[20px] items-start px-[20px] py-[30px]">
            <div className="">
                <div
                    className={`h-[165px] w-[165px] rounded-[100%]`}
                    style={{
                        backgroundImage: `url(${mission.acceptedBy?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                        backgroundSize: "cover"
                    }}
                >
                </div>
            </div>
            <div className="">
                <ul>
                    <li>Date: {moment(mission.createdAt).format('LLL')}</li>
                    <li>Shift: {mission.shiftType == ShiftType.MORNING ? 'Matin' : mission.shiftType == ShiftType.EVENING ? 'Soir' : 'Nuit'}</li>
                    <li>Effectué par: {mission.acceptedBy?.firstName}</li>
                </ul>
                {mission?.status === "EXECUTE" &&
                    <div className="mt-[40px]">
                        {!showRatingForm &&
                            <button
                                className="outline-none border-none text-primary text-[16px]"
                                onClick={() => setShowRatingForm(true)}
                            >
                                Ajouter un commentaire sur le Shift ?
                            </button>
                        }
                        {showRatingForm &&
                            <RateMissionForm
                                callback={() => closeModal()}
                            />
                        }
                    </div>
                }
                {mission?.status === "CONFIRM" &&
                    <button
                        onClick={openNewRequestModal}
                        type="button"
                        className={'button-square text-black bg-[#D9D9D9] hover:bg-[#c7c7c7] transition-all ease-in-out duration-[0.5s] rounded-none mt-[28px]'}>
                        Nouvelle requête
                    </button>
                }
            </div>
        </div>
    )
}