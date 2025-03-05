import prisma from "@/services/prisma";
import { FakeMissionType } from "@/types/Datatype";

export async function getFormations() {
  try {
    const formation = await prisma.training.findMany({
      include:{
        image:{
          select:{
            url:true
          }
        }
      }
    });
    return formation;
  } catch (error) {
    return null;
  }
}
export async function getMission() {
  try {
    const mission = await prisma.mission.findMany();
    return mission;
  } catch (error) {
    return null;
  }
}
export async function getMissionById(missionId:string) {
  try {
    const mission = await prisma.mission.findUnique({
      where: {
        uuid: missionId,
      },
    });
    return mission;
  } catch (error) {
    return null;
  }
}

export async function getMissions(userId:string) {
  try {
    const mission = await prisma.mission.findMany({
      where: {
        uuid: userId,
      },
      
      include: {
        hotel: {
          select: {
            hotelName: true,
            email: true,
            uuid: true,
            phoneNumber: true,
            address: true,
            identifiant: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return mission;
  } catch (error) {
    return null;
  }
}

export async function getDocuments() {
  try {
    const document = await prisma.document.findMany();
    return document;
  } catch (error) {
    return null;
  }
}

export async function getExtraMission(userId: string) {
  try {
    return await prisma.mission.findMany({
      where: {
        acceptedById: userId,
      },
    });
  } catch (error) {
    return null;
  }
}
export async function getExtraRequestMissions() {
  try {
    const extraMission = await prisma.mission.findMany({
      include:{
        requestedExtras:{
          include:{
            extra:{
              select:{
                hotelName:true,
                status:true
              }
            },
            mission:{}
          }
        }
      }
    });
    return extraMission;
  } catch (error) {
    return null;
  }
}
// export async function getExtraRequestMissions() {
//   try {
//     const extraMission = await prisma.mission.findMany({
//       include:{
//         requestedExtras:{
//           select:{
//             mission:{
//               select:{
//                 hotel:{
//                   select: {
//                     hotelName: true,
//                     email: true,
//                     uuid: true,
//                     phoneNumber: true,
//                     address: true,
//                     identifiant: true,
//                     createdAt: true,
//                     updatedAt: true,
//                 }
//                 }
//               }
//             }
//           }
//         }
//       }
//     });
//     return extraMission;
//   } catch (error) {
//     return null;
//   }
// }