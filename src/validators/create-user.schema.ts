import { z } from "zod";
import { messages } from "@/config/messages";
import { validateEmail } from "./common-rules";

// form zod validation schema
export const userFormInputSchema = z.object({
  firstName: z.string()
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z.string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
      password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères avec un chiffre" })
      .regex(new RegExp("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$"), { message: "Le mot de passe doit contenir au moins 6 caractères avec un chiffre" }),
  email: z.string()
      .email('Format d\'email invalide'),
  activated: z.boolean(),
  role: z.object({
      value: z.string(),
      label: z.string(),
    })
 
 
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof userFormInputSchema>;
