'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password, Button, Input, Text, Loader } from 'rizzui';
import { routes } from '@/config/routes';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { signUpSchema, SignUpSchema } from '@/validators/signup.schema';
import { Form } from '@/components/form';
import { PiArrowRightBold } from 'react-icons/pi';
import { useTranslation } from '@/app/i18n/client';
import toast from 'react-hot-toast';
import { isServerMessage } from '@/services/types';
import { register } from './actions';

const initialValues: SignUpSchema = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
};

interface SignUpFormProps {
    lang: string;
}

export default function SignUpForm({ lang }: SignUpFormProps) {
    const isMedium = useMedia('(max-width: 1200px)', false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation(lang!, 'auth');

    const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
        setLoading(true);
        try {
            const response = await register({
                firstname: data.firstname,
                lastname: data.lastname || "",
                email: data.email,
                password: data.password
            });

            if (isServerMessage(response)) {
                toast.error("Une erreur s'est produite lors de votre inscription");
            } else {
                toast.success("Inscription réussie!");
                router.push("/auth/login");
            }
        } catch (error) {
            toast.error("Une erreur inattendue s'est produite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="xl:pe-12 2xl:pe-20">
            <Form<SignUpSchema>
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: initialValues,
                }}
            >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">

                        <Input
                            type="text"
                            size={isMedium ? 'lg' : 'xl'}
                            placeholder={t('translate_key_placeholder_firstName_field')}
                            className="[&>label>span]:font-medium"
                            {...register('firstname')}
                            error={errors.firstname?.message}
                        />
                        <Input
                            type="text"
                            size={isMedium ? 'lg' : 'xl'}
                            placeholder={t('translate_key_placeholder_lastName_field')}
                            className="[&>label>span]:font-medium"
                            {...register('lastname')}
                            error={errors.firstname?.message}
                        />

                        <Input
                            type="email"
                            size={isMedium ? 'lg' : 'xl'}
                            placeholder={t('translate_key_placeholder_email_field')}
                            className="[&>label>span]:font-medium"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Password
                            placeholder={t('translate_key_placeholder_password_field')}
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Password
                            placeholder={t('translate_key_placeholder_confirm_password_field')}
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                        <div className="flex items-center justify-between w-full">
                            <p>
                                Vous avez déjà un compte ? {""}
                                <Link
                                    href={routes.signIn}
                                    className="h-auto p-0 text-sm font-medium transition-colors text-primary hover:no-underline"
                                >
                                  Connectez-vous
                                </Link>
                            </p>
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            size="lg"
                            disabled={loading}
                        >
                            <span>  S'inscrire </span>{" "}
                            {loading ? (
                                <Loader variant="spinner" />
                            ) : (
                                <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
                            )}
                        </Button>

                    </div>
                )}
            </Form>
        </div>
    );
}
