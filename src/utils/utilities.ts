import { ShiftType } from "@prisma/client";

export const getSchift = (shift?: ShiftType): string => {
    if(!shift) return '...';
    return shift == "AFTERNOON" ? "Après-midi" : shift == "MORNING" ? "Matin" : "Soirée"
}