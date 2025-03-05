// import { getDocuments, getMissionById } from "@/services/getData";
// import prisma from "@/services/prisma";
// import { Document, Mission} from "@prisma/client";

// export async function createDocument(data:Document) {
//   try {
//     const document = await getDocuments();
//     if (document) {
//       const document = await prisma.document.update({
//         data: {
//             createdAt:data.createdAt,
//         },
//       });
//       return { success: "Document ajouter avec succès" };
//     } else {
//       return { echec: "Echec de l'ajout du document" };
//     }
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }