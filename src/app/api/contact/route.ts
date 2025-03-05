import { sendMail } from "@/services/mail";
import { ContactFormType } from "@/components/forms/FormModels";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const body: ContactFormType = await req.json();
  const response = await sendMail(
    process.env.EMAILS_FROM_EMAIL ?? "",
    body.object,
    body.message,
    body.email
  );

  if (response.error) {
    return NextResponse.json(response, { status: 400 });
  }
  return NextResponse.json(response);
}
