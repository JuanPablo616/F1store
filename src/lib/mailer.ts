import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!user || !pass) {
  console.warn("EMAIL_USER or EMAIL_PASS not defined");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass
  }
});

export async function sendBasicMail(to: string, subject: string, html: string) {
  if (!user) throw new Error("EMAIL_USER not set");
  await transporter.sendMail({
    from: `F1 Store <${user}>`,
    to,
    subject,
    html
  });
}
