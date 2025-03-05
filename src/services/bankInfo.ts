import prisma from "@/services/prisma";
import {BankInfoType} from "@/types/Datatype";
export async function getBankInfoByUserUuid(userUuid?:string) {
    try {
        const bankInfo = await prisma.extraBankInfo.findFirstOrThrow({
            where: {
                userId:userUuid
            }
        });
        return bankInfo as BankInfoType;
    } catch (error) {
        return null
    }
}