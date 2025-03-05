import { z } from "zod";
import { messages } from "@/config/messages";
import { fileSchema, validateEmail } from "./common-rules";

// form zod validation schema
export const updateProfileSchema = z.object({
  firstName: z.string()
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z.string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
      avatarUuid: z.array(fileSchema).optional(),
 
 
});

// generate form types from zod validation schema
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
