import prisma from "@/services/prisma";

export async function getAllHotels() {
    try {
        return await prisma.user.findMany({
            where: {
                status: {
                    not: 'DELETE'
                },
                role: "HOTEL"
            }
        });
    } catch (error: any) {
        return null;
    }
}