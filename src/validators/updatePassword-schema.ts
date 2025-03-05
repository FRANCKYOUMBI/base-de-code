import { create } from "lodash";
import { z } from "zod";

// form zod validation schema
export const updatePasswordSchema = z.object({

  currentPassword:z.string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)",
  }),
password: z.string()
.min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)",
}),

});

// generate form types from zod validation schema
export type updatePasswordFormType = z.infer<typeof updatePasswordSchema>;
    