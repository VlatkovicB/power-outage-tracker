import nodemailer from "nodemailer"

export default async (context) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: '"Bojan ♥ Sanja" <latzkolol@gmail.com>',
    to: "latzkolol@gmail.com",
    subject: "⚡⚡⚡ Prekid napajanja strujom ⚡⚡⚡",
    html: context,
  })
}
