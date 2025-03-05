"use client"
import React, {useState} from "react";
import {InputField} from "@/components/forms/Fields";
import {useForm} from "react-hook-form";
import {passwordRegex} from "@/utils/regex";
import {PasswordForm} from "@/types/Datatype";
import {enqueueSnackbar} from "notistack";
import {useModalContext} from "@/contexts/ModalContext";
import {signOut} from "next-auth/react";

export function UpdatePassWordForm({userEmail}: {userEmail?:string}) {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PasswordForm>();
    const { closeModal } = useModalContext();
    async function handleUpdatePassword(data:PasswordForm) {
        data.email = userEmail || "";
        setIsloading(true)
        try {
            // Hello123654789
            const passwordChanged = await fetch("/api/extra/reset-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const response = await passwordChanged.json();
            if (passwordChanged.status === 200) {
                reset();
                closeModal();
                signOut({redirect: true, callbackUrl: "/"})
                enqueueSnackbar(
                    response.message,
                    { variant: "success", persist: false }
                );
            } else if (passwordChanged.status === 400) {
                enqueueSnackbar(
                    response.message,
                    { variant: "error", persist: false }
                );
            } else {
                enqueueSnackbar(
                    "Un problème est survenu lors de la mise à jour de votre mot de passe",
                    { variant: "warning", persist: false }
                );
            }
            setIsloading(false)
        } catch (e) {
            enqueueSnackbar(
                "Un problème est survenu lors de la mise à jour de votre mot de passe",
                { variant: "warning", persist: false }
            );
            setIsloading(false)
        }
    }
    return (
        <div className="flex flex-col gap-4 px-6 pt-2 pb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className="mb-[10px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"oldPassword"}
                        validationSchema={{
                            required: "Mot de passe actuel requis"
                        }}
                        placeholder="Ancien mot de passe"
                        type="password"
                        label={"Mot de passe actuel"}
                    />
                </div>
                <div className="mb-[22px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"newPassword"}
                        validationSchema={{
                            required: "Nouveau mot de passe requis ",
                            validate: {
                                matchPattern: (value: string) => passwordRegex.test(value) || "Entrer un mot de passe solide"
                            }
                        }}
                        placeholder="Nouveau mot de passe"
                        type="password"
                        label={"Nouveau mot de passe"}
                    />
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button
                        type={"submit"}
                        disabled={isLoading}
                        className={`button-rounded w-[293px] bg-primary mt-[10] text-white px-[60px] py-[10px] ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}