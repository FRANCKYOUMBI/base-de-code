"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { PiArrowRightBold } from "react-icons/pi";
import { Password, Button, Input, Loader } from "rizzui";
import { loginSchema, LoginSchema } from "@/validators/login.schema";
import { navigate } from "@/app/[lang]/auth/login/actions.ts";
import { Form } from "@/components/form";
import { routes } from "@/config/routes";
import { t } from "i18next";

const initialValues: LoginSchema = {
  email: "",
  password: "",
  rememberMe: true,
};

interface SignInFormProps {
  lang: string;
  onAuthComplete?: () => void;
}

export default function SignInForm({ lang, onAuthComplete }: SignInFormProps) {
  const [reset, setReset] = useState({});
  const [loading, setloading] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setloading(true);
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response) {
      onAuthComplete?.();  // Close modal before showing toast
      if (response.error) {
        toast.error(
          <div className="rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {response.error}
                </h3>
              </div>
            </div>
          </div>
        );
      } else {
        toast.success(
          <div className="rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Bienvenue à nouveau!
                </h3>
              </div>
            </div>
          </div>,
          {
            duration: 3000,
          }
        );
        await navigate(`/${lang}/admin`);
      }
    }
    setloading(false);
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder={t("text-email")}
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between w-full">
              <p>
                <Link
                  href={routes.auth.forgotPassword}
                  className="h-auto p-0 text-sm font-medium transition-colors text-primary hover:no-underline"
                >
                  Mot de passe oublié ?
                </Link>
              </p>
            </div>
            <Button
              className="w-full"
              type="submit"
              size="lg"
              disabled={loading}
            >
              <span>Se connecter</span>{" "}
              {loading ? (
                <Loader variant="spinner" />
              ) : (
                <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
