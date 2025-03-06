"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
// import Button from 'react-scroll/modules/components/Button';
import toast from "react-hot-toast";
import { isServerMessage } from "@/services/types";
import {
  userData,
  UserFormInput,
} from "@/services/types/user";
import { rolesList } from "./roles/table";
import { editUser } from "./user-list/actions";
import { createUser } from "@/app/[lang]/(hydrogen)/admin/users/create/action";
import { userFormInputSchema } from "@/validators/create-user.schema";
import FormBuilder, { Field, FieldGroup } from "@/components/form-builder";

export default function CreateUser({
  userId,
  user,
  isModalView = true,
}: {
  userId?: string;
  isModalView?: boolean;
  user?: userData;
}) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    console.log({ data });
    setLoading(true);
    if (userId) {
      setLoading(true);
      const reponse = await editUser(
        {
          password: data.password,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role.value,
          activated: data.activated,
        },
        userId
      );

      if (isServerMessage(reponse)) {
        toast.error(
            "une erreur s'est produite lors de la mise à jour de l'utilisateur"
        );
        setLoading(false);
      } else {
        toast.success("Utilisateur mis à jour avec succès");
        setLoading(false);
        router.push("/users");
      }
    } else {
      try {
        console.log("data", data);
        setLoading(true);

        await createUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role.value,
          activated: data.activated,
        });

        toast.success("Utilisateur créé avec succès.");
        setLoading(false);
        router.push("/users");
      } catch (error) {
        console.error("Failed to create user:", error);
        toast.error("Echec de la création de l'utilisateur.");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const fields: Array<FieldGroup | Field> = [
    {
      title: "Informations personnelles",
      description: "Entrez les informations de l'utilisateur",
      fields: [
        {
          name: "firstName",
          label: "Prénom",
          type: "text",
          placeholder: "Prénom",
          className: "col-span-1",
        },
        {
          name: "lastName",
          label: "Nom",
          type: "text",
          placeholder: "Nom",
          className: "col-span-1",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "exemple@email.com",
          className: "col-span-2",
        },
        {
          name: "password",
          label: "Mot de passe ",
          type: "password",
          className: "col-span-2",
          placeholder: "Mot de passe",
        },
        {
          name: "role",
          label: "Rôle",
          type: "select",
          placeholder: "Selectionner un rôle",
          isSearchable: true,
          options:
            rolesList.map((role) => ({
              value: role.name,
              label: role.description,
              checkerValue: !!user?.user.role.value, 
              checkerLabel: user?.user.role.label,
            })) ?? [],
        },
        {
          className: "mt-10",
          name: "activated",
          label: "Actif",
          type: "checkbox",
        },
      ],
    },
  ];

  if (!user && userId) {
    return <div>Chargement...</div>;
  }

  return (
    <FormBuilder<UserFormInput>
      fields={fields}
      isModalView={isModalView}
      validationSchema={userFormInputSchema}
      defaultValues={{
        firstName: user?.user?.firstName || "",
        lastName: user?.user?.lastName || "",
        email: user?.user?.email || "",
        role: user?.user?.role
          ? {
              value: user?.user?.role.value,
              label: user?.user?.role.label,
            }
          : undefined,
        activated: user?.user?.activated || false,
        password: "",
      }}
      onSubmit={onSubmit}
      submitButtonLabel={`${userId ? "Modifier" : "Créer"} l'utilisateur`}
      className=""
      isLoading={isLoading}
    />
  );
}