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

const initialValues: LoginSchema = {
  email: "",
  password: "",
  rememberMe: true,
};

interface SignInFormProps {
  lang: string;
}

export default function SignInForm({ lang }: SignInFormProps) {
  const [reset, setReset] = useState({});
  const [loading, setloading] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setloading(true);
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response) {
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
        console.log({ response });
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
            duration: 5000,
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
              placeholder="Entrez votre email"
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
