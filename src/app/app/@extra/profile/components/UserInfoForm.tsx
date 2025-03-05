import React, { useState } from "react";
import { Session, User } from "next-auth";
import { InputField } from "@/components/forms/Fields";
import { useForm } from "react-hook-form";
import { phoneRegex } from "@/utils/regex";
import { useModalContext } from "@/contexts/ModalContext";
import { enqueueSnackbar } from "notistack";
import { User as UserType } from "@prisma/client"
import {revalidatePath} from "next/cache";

interface UserInfoFormProps {
    user: UserType;
}

export function UserInfoForm({ user }: UserInfoFormProps): React.JSX.Element {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const { closeModal } = useModalContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UserType>({
        defaultValues: {
            lastName: user?.lastName,
            firstName: user?.firstName,
            phoneNumber: user?.phoneNumber,
            address: user?.address,
            hotelName: user?.hotelName
        }
    });

    async function handleUpdateProfile(data: UserType) {
        data.uuid = user?.uuid;
        {
            if (data.role === "HOTEL") {
                try {
                    setIsloading(true);
                    const response = await fetch(`/api/hotel/profile`, {
                        method: "PUT",
                        body: JSON.stringify(data)
                    }) as Response;
                    if (response.ok) {
                        setIsloading(false);
                        reset();
                        closeModal();
                        enqueueSnackbar(
                            "Vos informations ont été mise à jour avec succès",
                            { variant: "success", persist: false }
                        );
                    }
                } catch (error) {
                    setIsloading(false);
                    enqueueSnackbar(
                        "Un problème est survenu lors de la mise à jour de vos informations",
                        { variant: "error", persist: false }
                    );
                }
            } else {
                try {
                    setIsloading(true);
                    const response = await fetch(`/api/extra/profile`, {
                        method: "PUT",
                        body: JSON.stringify(data)
                    }) as Response;
                    if (response.ok) {
                        setIsloading(false);
                        reset();
                        closeModal();
                        enqueueSnackbar(
                            "Vos informations ont été mise à jour avec succès",
                            { variant: "success", persist: false }
                        );
                    }
                } catch (error) {
                    console.log(error)
                    setIsloading(false);
                    enqueueSnackbar(
                        "Un problème est survenu lors de la mise à jour de vos informations",
                        { variant: "error", persist: false }
                    );
                }
            }
        }

    }

    return (
        <div className="flex flex-col gap-4 px-6 py-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpdateProfile)}>
                {user?.role != "HOTEL" ?
                    <>
                        <div className="mb-[5px] w-[100%]">
                            <InputField
                                register={register}
                                errors={errors}
                                name={"firstName"}
                                validationSchema={{
                                    required: "Veillez nom "
                                }}
                                placeholder="Nom"
                                type="text"
                                label={"Nom"}
                            />
                        </div>
                        <div className="mb-[5px] w-[100%]">
                            <InputField
                                register={register}
                                errors={errors}
                                name={"lastName"}
                                validationSchema={{
                                    required: "Veillez entrer votre prénom "
                                }}
                                placeholder="Prénom"
                                type="text"
                                label={"Prénom"}
                            />
                        </div>
                    </> :
                    <div className="mb-[5px] w-[100%]">
                        <InputField
                            register={register}
                            errors={errors}
                            name={"hotelName"}
                            validationSchema={{
                                required: "Veillez entrer votre prénom "
                            }}
                            placeholder="Nom de l'hôtel"
                            type="text"
                            label={"Nom de l'hôtel"}
                        />
                    </div>}
                <div className="mb-[5px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"phoneNumber"}
                        validationSchema={{
                            required: "Veillez entrer un numéro de téléphone valide",
                            validate: {
                                matchPattern: (value: string) => phoneRegex.test(value) || "Veillez entrer un numéro de téléphone valide"
                            }
                        }}
                        placeholder="Téléphne"
                        type="text"
                        label={"Téléphne"}
                    />
                </div>
                <div className="mb-[5px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"address"}
                        validationSchema={{
                            required: "Veillez fournir une adresse."
                        }}
                        placeholder="Adresse"
                        type="text"
                        label={"Adresse"}
                    />
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button
                        type={"submit"}
                        disabled={isLoading}
                        className={`button-rounded w-[293px] bg-primary mt-[27px] text-white px-[60px] py-[10px] ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}