"use client";

import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { UserList } from "@/services/types/user";
import { isServerMessage, ServerMessage } from "@/services/types";
import { useState } from 'react';
import { Button } from "rizzui";
import { updateProfileSchema } from "@/validators/update-profile";
import { UpdatePasswordInput, UpdateUserProfileFormInput } from "@/services/types/auth";
import { updatePasswordSchema } from "@/validators/updatePassword-schema";
import { updatePassword, updateProfile } from "@/app/[lang]/(hydrogen)/forms/profile/action";
import FormBuilder, { Field, FieldGroup } from "@/components/form-builder";

interface AccountFormProps {
  user: UserList;
  onCancel: () => void;
}

export default function AccountForm({ user, onCancel }: AccountFormProps) {

  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const onSubmit: SubmitHandler<UpdateUserProfileFormInput> = async (data) => {

    setLoading(true);

    const response = await updateProfile(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUuid: data.avatarUuid?.[0]?.uuid,
      },
    );

    if (isServerMessage(response)) {
      toast.error(
        "une erreur s'est produite lors de la mise à jour de votre  profil"
      );
      setLoading(false);
    } else {
      toast.success("Informations mises à jour avec succès");
      window.location.reload();
      setLoading(false);
      onCancel();
    }
  }

  const onSubmitPassword: SubmitHandler<UpdatePasswordInput> = async (data) => {
    setLoadingPassword(true);
    console.log(data);
    const response = await updatePassword({
      currentPassword: data.currentPassword,
      password: data.password,
    });

    if (isServerMessage(response)) {
      toast.error(
        "une erreur s'est produite lors de la modification de votre  mot de passe " + (response as ServerMessage).message
      );
      setLoadingPassword(false);
    } else {
      toast.success("Mot de passe  mis à jour avec succès");
      setLoadingPassword(false);
      onCancel();
    }
  }

  const fields: Array<FieldGroup | Field> = [
    {
      title: "Informations personnelles",
      description: "Modifiez vos informations personnelles",
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
        }
      ],
    },
    {
      title: "Avatar",
      description: "Téléchargez une nouvelle photo de profil",
      fields: [
        { name: "avatarUuid", label: "Avatar", type: "upload", accept: "image" },
      ],
    },
  ];

  const PasswordFields: Array<FieldGroup | Field> = [
    {
      title: "Mot de passe",
      description: "Modifiez votre mot de passe",
      fields: [
        {
          name: "currentPassword",
          label: "Mot de passe actuel",
          type: "password",
          placeholder: "Mot de passe actuel",
          className: "col-span-2",
        },
        {
          name: "password",
          label: "Nouveau mot de passe",
          type: "password",
          placeholder: " Nouveau mot de passe",
          className: "col-span-2",
        },

      ],
    },
  ];

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <FormBuilder<UpdateUserProfileFormInput>
        fields={fields}
        validationSchema={updateProfileSchema}
        defaultValues={{
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          avatarUuid: user.avatar ?
            [
              {
                uuid: user.avatar.uuid,
                file_name: user.avatar.file_name,
                size: user.avatar.size,
                url: user.avatar.url,
              },
            ]
            : [],
        }}
        onSubmit={onSubmit}
        submitButtonLabel="Enregistrer les modifications"
        isLoading={loading}
      />
      <div className="mt-8">
        <FormBuilder<UpdatePasswordInput>
          fields={PasswordFields}
          validationSchema={updatePasswordSchema}
          defaultValues={{
            currentPassword: "",
            password: "",

          }}
          onSubmit={onSubmitPassword}
          submitButtonLabel="Modifier mon mot de passe"
          isLoading={loadingPassword}
        />
      </div>

      <Button
        onClick={onCancel}
        className="mt-8"
        variant="outline"
      >
        Annuler
      </Button>
    </div>
  );
}