'use client'

import { useForm, useWatch } from "react-hook-form"
import { InputField, TextArea } from "./Fields"
import Link from "next/link"
import { sendMail, compileTemplate } from "@/services/mail"
import { Fragment, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createExtraAction, createHotelAction } from "@/services/actions/_createUsers"
import { enqueueSnackbar } from 'notistack'
import { signIn } from "next-auth/react"

export interface ContactFormType {
    completeName: string,
    email: string,
    object: string,
    message: string
}
interface LoginFormType {
    email: string,
    password: string,
    remember: boolean;
}

export interface HotelRegistrationType {
    hotelName: string,
    address: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
}

export interface ExtraRegistrationType {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
}

interface RegistrationFormType {
    callBack: any,
}

export function ContactForm() {
    const { register, control, handleSubmit, formState: { errors } } = useForm<ContactFormType>();

    async function handleSaveContact(data: ContactFormType) {
        console.log({ data })
        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response) => {
            console.log('client response: ', response)
        }).catch((error) => {
            console.log('client error: ', error)
        });
    }
    return (
        <form onSubmit={handleSubmit(handleSaveContact)} className="flex flex-col items-center justify-center">
            <div className="mb-[22px] w-[100%]">
                <InputField
                    register={register}
                    errors={errors}
                    name={"completeName"}
                    validationSchema={{
                        required: "Veillez entrez votre nom et prénom "
                    }}
                    placeholder="Nom et prénom"
                    type="text"
                />
            </div>
            <div className="mb-[22px] w-[100%]">
                <InputField
                    register={register}
                    errors={errors}
                    name={"email"}
                    validationSchema={{
                        required: "Veillez entrez l'adresse email",
                    }}
                    placeholder="Adresse email"
                    type="email"
                />
            </div>
            <div className="mb-[22px] w-[100%]">
                <InputField
                    register={register}
                    errors={errors}
                    name={"object"}
                    validationSchema={{
                        required: "Veillez entrez l'objet"
                    }}
                    placeholder="Objet"
                    type="text"
                />
            </div>
            <div className="mb-[22px] w-[100%]">
                <TextArea
                    register={register}
                    errors={errors}
                    name={"message"}
                    validationSchema={{
                        required: "Veillez entrez le message"
                    }}
                    placeholder="Message"
                />
            </div>
            <div className="mt-1 w-full">
                <button
                    type="submit"
                    className={'button-square text-white bg-black w-[100%] lg:w-[480px] hover:bg-black/90 transition-all ease-in-out duration-[0.5s]'}>
                    Envoyer
                </button>
            </div>
        </form>
    )
}

// Login is define here 
export function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
    let [isPending, startTransition] = useTransition();
    const [alreadyShowSuccess, setAlreadyShowSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()
    const account = searchParams.get('account')
    if (account === "validated" && !alreadyShowSuccess) {
        enqueueSnackbar(
            "Votre compte a été validé avec succès, veuillez vous connecter",
            { variant: "success", persist: true }
        );
        setAlreadyShowSuccess(true);
    }
    async function handleLogin(data: LoginFormType) {
        startTransition(async () => {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });
            if (!result) {
                enqueueSnackbar("Une erreur s'est produite, veuillez réessayer plus tard", { variant: "error" });
                return;
            }
            if (result.error) {
                enqueueSnackbar("Email ou mot de passe invalide!", { variant: "warning" });
                return;
            }
            console.log(result);
            router.replace("/app");
        });
    }
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-5">
                <InputField
                    label="Email"
                    register={register}
                    errors={errors}
                    name={"email"}
                    validationSchema={{
                        required: "Veuillez entrer votre email"
                    }}
                    placeholder="Entrez votre email"
                    type="text"
                />
            </div>
            <div className="mb-10">
                <InputField
                    label="Mot de passe"
                    register={register}
                    errors={errors}
                    name={"password"}
                    validationSchema={{
                        required: "Veuillez entrer votre mot de passe"
                    }}
                    placeholder="Entrez votre mot de passe"
                    type="password"
                />
            </div>
            <div className="mb-5 flex flex-col md:flex-row justify-start gap-[20px] md:justify-between items-center">
                <div className="relative flex gap-x-3">
                    {/* <label htmlFor="offers" className="font-[500] text-[15px] leading-[15px] flex items-center justify-start gap-[20px]">
                        <input id="offers" name="offers" type="checkbox" className="h-[35px] w-[35px] rounded-[10px] border-solid border-[2px] border-[#D9D9D9] text-primary focus:ring-primary" />
                        Se souvenir de moi
                    </label> */}
                </div>
                <Link
                    href="#"
                    className="font-[500] text-[15px] leading-[15px] hover:text-primary transition-all ease-in duration-[0.3s]"
                >
                    Mot de passe oublié
                </Link>
            </div>
            <div className="mt-10 w-full">
                <button
                    type="submit"
                    disabled={isPending}
                    className="button-square rounded-[10px] text-white bg-black hover:bg-black/95 transition-all ease-in-out duration-[0.5s] w-full disabled:bg-black/70 disabled:opacity-50"
                >
                    Connexion
                </button>
            </div>
        </form >
    )
}


export function SocialLogin() {
    return (
        <Fragment>
            <div className="mb-[16px]">
                <button onClick={() => signIn("google")} className="flex justify-center items-center py-[10px] gap-[32px] bg-white text-black font-[600] text-[16px] leading-[22px] shadow-md:text-[18px] md:leading-[24px] w-full rounded-[10px]">
                    Se connecter avec Google
                    <img src="/google_logo.png" alt="google-login" className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] " />
                </button>
            </div>
            <div className="mb-[16px]">
                <button onClick={() => signIn("apple")} className="flex justify-center items-center py-[10px] gap-[32px] bg-white text-black font-[600] text-[16px] leading-[22px] shadow-md:text-[18px] md:leading-[24px] w-full rounded-[10px]">
                    Se connecter avec Apple
                    <img src="/apple_logo.png" alt="google-login" className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] " />
                </button>
            </div>
            <div className="mb-[16px]">
                <button onClick={() => signIn("azure-ad-b2c")} className="flex justify-center items-center py-[10px] gap-[32px] bg-white text-black font-[600] text-[16px] leading-[22px] shadow-md:text-[18px] md:leading-[24px] w-full rounded-[10px]">
                    Se connecter avec Outlook
                    <img src="/outlook_logo.png" alt="google-login" className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] " />
                </button>
            </div>
        </Fragment>
    )
}

export function HotelRegistration({ callBack }: RegistrationFormType) {
    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<HotelRegistrationType>();
    let [isPending, startTransition] = useTransition();

    async function handleRegisterHotel(data: HotelRegistrationType) {
        // callBack(data)
        console.log({ data })
        startTransition(async () => {
            const response = await createHotelAction(data)
            console.log({ response })
            if (response.error) {
                enqueueSnackbar(response.error, { variant: "warning" })
            } else {
                reset()
                callBack(data)
            }
        })
    }
    return (
        <form
            onSubmit={handleSubmit(handleRegisterHotel)}
            className="flex flex-col justify-start items-start gap-[20px]"
        >
            <div className="w-full">
                <InputField
                    label="Nom de l’hôtel"
                    register={register}
                    errors={errors}
                    name={"hotelName"}
                    validationSchema={{
                        required: "Veuillez entrer le nom de votre hôtel"
                    }}
                    type="text"
                    labelWhite
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Adresse"
                    register={register}
                    errors={errors}
                    name={"address"}
                    validationSchema={{
                        required: "Veuillez entrer l'adresse de votre hôtel"
                    }}
                    type="text"
                    labelWhite
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Email"
                    register={register}
                    errors={errors}
                    name={"email"}
                    validationSchema={{
                        required: "Veuillez entrer votre email",
                        validate: {
                            matchPattern: (v) =>
                                /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(v) ||
                                "Entrez une adresse email valide",
                        },
                    }}
                    type="email"
                    labelWhite
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Numéro de téléphone"
                    register={register}
                    errors={errors}
                    name={"phone"}
                    validationSchema={{
                        required: "Veuillez entrer votre numéro de téléphone",
                        validate: {
                            matchPattern: (v) =>
                                /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(v) ||
                                "Entrez un numéro de téléphone valide",
                        },
                    }}
                    type="tel"
                    labelWhite
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Mot de passe"
                    register={register}
                    errors={errors}
                    name={"password"}
                    validationSchema={{
                        required: "Veuillez entrer votre mot de passe",
                        validate: {
                            matchPattern: (v) =>
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
                                "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre",
                        },
                    }}
                    type="password"
                    labelWhite
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Confirmation de mot de passe"
                    register={register}
                    errors={errors}
                    name={"confirmPassword"}
                    validationSchema={{
                        required: "Veuillez confirmer votre mot de passe",
                        validate: (value: string) => {
                            if (watch("password") != value) {
                                return "Les mots de passe ne correspondent pas";
                            }
                        },
                    }}
                    type="password"
                    labelWhite
                />
            </div>
            <div className="w-full mt-[50px]">
                <button
                    type="submit"

                    disabled={isPending}
                    className="w-full py-[10px] lg:py-[12px] bg-primary text-white text-[18px] font-[600] leading-[35px] rounded-[10px] hover:bg-primary/80 transition-all ease-in duration-[0.3s] disabled:bg-secondary disabled:opacity-50"
                >
                    Inscription
                </button>
            </div>
        </form>
    )
}

export function ExtraRegistration({ callBack }: RegistrationFormType) {
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm<ExtraRegistrationType>();
    let [isPending, startTransition] = useTransition();

    async function handleRegisterExtra(data: ExtraRegistrationType) {
        console.log({ data })
        startTransition(async () => {
            const response = await createExtraAction(data)
            console.log({ response })
            if (response.error) {
                enqueueSnackbar(response.error, { variant: "warning" })
            } else {
                reset()
                callBack(data)
            }
        })
    }
    return (
        <form
            onSubmit={handleSubmit(handleRegisterExtra)}
            className="flex flex-col justify-start items-start gap-[20px]"
        >
            <div className="w-full">
                <InputField
                    label="Prénom"
                    register={register}
                    errors={errors}
                    name={"firstName"}
                    validationSchema={{
                        required: "Votre prénom est requis"
                    }}
                    type="text"
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Nom"
                    register={register}
                    errors={errors}
                    name={"lastName"}
                    validationSchema={{
                        required: "Votre nom est requis"
                    }}
                    type="text"
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Email"
                    register={register}
                    errors={errors}
                    name={"email"}
                    validationSchema={{
                        required: "Veuillez entrer votre email",
                        validate: {
                            matchPattern: (v) =>
                                /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(v) ||
                                "Entrez une adresse email valide",
                        },
                    }}
                    type="email"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Numéro de téléphone"
                    register={register}
                    errors={errors}
                    name={"phone"}
                    validationSchema={{
                        required: "Veuillez entrer votre numéro de téléphone",
                        validate: {
                            matchPattern: (v) =>
                                /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(v) ||
                                "Entrez un numéro de téléphone valide",
                        },
                    }}
                    type="tel"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Mot de passe"
                    register={register}
                    errors={errors}
                    name={"password"}
                    validationSchema={{
                        required: "Veuillez entrer votre mot de passe",
                        validate: {
                            matchPattern: (v) =>
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
                                "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre",
                        },
                    }}
                    type="password"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Confirmation de mot de passe"
                    register={register}
                    errors={errors}
                    name={"confirmPassword"}
                    validationSchema={{
                        required: "Veuillez confirmer votre mot de passe",
                        validate: (value: string) => {
                            if (watch("password") != value) {
                                return "Les mots de passe ne correspondent pas";
                            }
                        },
                    }}
                    type="password"

                />
            </div>
            <div className="w-full mt-[50px]">
                <button
                    type="submit"

                    disabled={isPending}
                    className="w-full py-[10px] lg:py-[12px] bg-primary text-white text-[18px] font-[600] leading-[35px] rounded-[10px] hover:bg-primary/80 transition-all ease-in duration-[0.3s] disabled:bg-secondary disabled:opacity-50"
                >
                    Inscription
                </button>
            </div>
        </form>
    )
}