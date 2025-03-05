
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BankInfoType } from "@/types/Datatype";
import { InputField } from "@/components/forms/Fields";
import { useModalContext } from "@/contexts/ModalContext";
import { enqueueSnackbar } from "notistack";

interface BankInfoProps {
    bankInfo: BankInfoType | null;
    userId?: string;
}
export function BanInfoForm({ bankInfo, userId }: BankInfoProps): React.JSX.Element {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const { closeModal } = useModalContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<BankInfoType>({
        defaultValues: {
            rib: bankInfo?.rib,
            paypal: bankInfo?.paypal
        }
    });

    async function handleMangeBankInfo(data: BankInfoType) {
        setIsloading(true);
        if (!bankInfo) {
            data.userId = userId;
            const response = await fetch("/api/extra/bank-info", {
                method: "POST",
                body: JSON.stringify(data)
            }) as Response;
            if (response.ok) {
                setIsloading(false);
                closeModal();
                reset();
                enqueueSnackbar(
                    "Vos informations de payement ont été mise à jour avec succès",
                    { variant: "success", persist: true }
                );
            }
            setIsloading(false);
        } else {
            bankInfo.paypal = data.paypal;
            bankInfo.rib = data.rib;
            const response = await fetch(`/api/extra/bank-info`, {
                method: "PUT",
                body: JSON.stringify(bankInfo)
            }) as Response;
            if (response.ok) {
                setIsloading(false);
                closeModal();
                reset();
                enqueueSnackbar(
                    "Vos informations de payement ont été mise à jour avec succès",
                    { variant: "success", persist: false }
                );
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 px-6 py-8">
            <h4 className="text-[24px] font-[600]">Informations de paiement</h4>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleMangeBankInfo)}>
                <div className="mb-[10px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"rib"}
                        validationSchema={{
                            required: "Veillez entrez votre RIB "
                        }}
                        placeholder="RIB"
                        type="text"
                        label={"RIB"}
                    />
                </div>
                <div className="mb-[22px] w-[100%]">
                    <InputField
                        register={register}
                        errors={errors}
                        name={"paypal"}
                        validationSchema={{
                            required: "Veillez entrez votre Paypal "
                        }}
                        placeholder="Paypal"
                        type="text"
                        label={"Paypal"}
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