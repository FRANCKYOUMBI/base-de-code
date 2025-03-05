import { create } from "lodash";
import { z } from "zod";

// form zod validation schema
export const updateUserSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial" })
  .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$"), { message: "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  role: z.string().min(1, { message: "le role est requis" }),
  createdAt: z.string() .optional(),
  updatedAt: z.string().optional(), 
  enabled: z.boolean().optional(),

  activated: z.boolean({ message: "Le statut d'activation est requis" }),
});

// generate form types from zod validation schema
export type updateUserFormType = z.infer<typeof updateUserSchema>;
