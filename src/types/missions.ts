import {User} from "@/types/account";

export interface Mission {
    uuid: string
    reference: string
    key: string
    from: Date
    to: Date
    hours: number
    status: MissionStatus
    shiftType: ShiftType
    hotelId: string
    hotel?: User,
    acceptedBy?: User,
    acceptedById?: string
    acceptedAt?: Date
    createdAt: Date
    updatedAt: Date
}

export enum ShiftType {
    MORNING = 'MORNING',
    AFTERNOON = 'AFTERNOON',
    EVENING = 'EVENING'
};

export enum MissionStatus {
    PERFORM = 'PERFORM',
    WAITING = 'WAITING',
    CONFIRM = 'CONFIRM',
    EXECUTE = 'EXECUTE',
    CANCEL = 'CANCEL',
    DONE = 'DONE'
};

export interface ICreateTask {
    startDate: string,
    endDate: string,
    hourStart: string,
    hourEnd: string,
    schift: ShiftType | undefined,
    hours: number,
    hotel_id: string,
}

export interface ICreateMissionServer {
    from: string,
    to: string,
    key: string,
    reference: string,
    shiftType: ShiftType | undefined,
    hours: number,
    hotelId: string,
    status: MissionStatus
}