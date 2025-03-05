import nodemailer from "nodemailer";
import fs from "fs";
import Handlebars from "handlebars";

export async function compileTemplate(templateName: string, data: any) {
  const buffer = fs.readFileSync(`./src/emails/${templateName}.hbs`);
  const fileContent = buffer.toString();
  const template = Handlebars.compile(fileContent);
  const result = template(data);
  return result;
}

export async function sendMail(
  to: string,
  subject: string,
  html: string,
  from: string = `"${process.env.EMAILS_FROM_NAME}" <${process.env.EMAILS_FROM_EMAIL}>`
) {
  try {
    const configOptions = {
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      host: process.env.SMTP_HOST || "",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    };
    const transporter = nodemailer.createTransport(configOptions);
    // send email
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return { info };
  } catch (error: any) {
    console.log({ error });
    return { error: error.message };
  }
}
