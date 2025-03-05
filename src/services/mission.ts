import prisma from "@/services/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Mission} from "@prisma/client";
export async function changeStatusMission(missionId: string) {
  try {
    const missionById = missionId
    if (missionById) {
      const mission = await prisma.mission.update({
        where: {
          uuid: missionById,
        },
        data: {
          status: "CONFIRM",
        },
      });
      return { success: "Mission accepter avec succès" };
    } else {
      return { echec: "Echec de la réquête" };
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAllMission() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return prisma.mission.findMany({
      include: {
      hotel: {
        select: {
          uuid: true,
          hotelName: true,
          email: true,
          phoneNumber: true,
          address: true,
          identifiant: true,
          status: true,
          avatar: true,
          missionsAccepted: true,
          missionsCreated: true,
          requestedMissions: true,
          reviews: true,
          createdAt: true,
          updatedAt: true
        }
      },
      acceptedBy: {
        select: {
          uuid: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          address: true,
          identifiant: true,
          status: true,
          avatar: true,
          missionsAccepted: true,
          missionsCreated: true,
          requestedMissions: true,
          reviews: true,
          createdAt: true,
          updatedAt: true

        }
      },
      reviews: true,
      requestedExtras: true
    },
      orderBy: {
        createdAt: "desc"
      }
  }) as unknown as Mission[];
  } else {
    return null
  }
}