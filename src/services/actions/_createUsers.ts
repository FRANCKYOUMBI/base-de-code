'use server'
import { sendMail, compileTemplate } from "@/services/mail"
import jwt from "jsonwebtoken";

import { HotelRegistrationType, ExtraRegistrationType} from "@/components/forms/FormModels";
import { createUser } from "../users";
import { revalidatePath } from "next/cache";
import { UserStatus } from "@prisma/client";

export async function createHotelAction(hotel: HotelRegistrationType) {
    const response = await createUser({
        email: hotel.email,
        phoneNumber: hotel.phone,
        password: hotel.password,
        hotelName: hotel.hotelName,
        firstName: undefined,
        lastName: undefined,
        status: UserStatus.INACTIVE,
    }, 'HOTEL');
    // revalidatePath('/');
    if (response.error)
        return { error: response.error }
    // send email to user with link
    const token = jwt.sign({uuid: response.user?.uuid}, process.env.SECRET_KEY ||  "", {expiresIn: '24h'});
    const data = {
        name: hotel.hotelName,
        url: `https://develop.vquariusvgency.com/validate/${token}`
    }
    const email = hotel.email;
    const subject = 'Vquarius Agency - Vérification de votre adresse email';
    const html = await compileTemplate('mail-verify-email', data);
    try {
        await sendMail(email, subject, html);
    }catch(error){}
    return { message: "Votre compte a été créé avec succès !"}
}

export async function createExtraAction(extra: ExtraRegistrationType) {
    const response = await createUser({
        email: extra.email,
        phoneNumber: extra.phone,
        password: extra.password,
        hotelName: undefined,
        firstName: extra.firstName,
        lastName: extra.lastName,
        status: UserStatus.INACTIVE,
    }, 'EXTRA');
    // revalidatePath('/');
    if (response.error)
        return { error: response.error }
    // send email to user with link
    const token = jwt.sign({uuid: response.user?.uuid}, process.env.SECRET_KEY ||  "", {expiresIn: '24h'});
    const data = {
        name: extra.firstName,
        url: `https://develop.vquariusvgency.com/validate/${token}`
    }
    const email = extra.email;
    const subject = 'Vquarius Agency - Vérification de votre adresse email';
    const html = await compileTemplate('mail-verify-email', data);
    try {
        await sendMail(email, subject, html);
    }catch(error){}
    return { message: "Votre compte a été créé avec succès !"}
}