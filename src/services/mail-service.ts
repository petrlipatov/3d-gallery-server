import nodemailer from "nodemailer";

class Service {
  transporter;
  constructor() {
    // console.log("SMTP Config:", {
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   user: process.env.SMTP_USER,
    //   pass: process.env.SMTP_PASSWORD,
    // });

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 5000,
      socketTimeout: 5000,
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error("❌ SMTP Connection Error:", error);
      } else {
        console.log("✅ SMTP Server is ready");
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
      <div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export const mailService = new Service();
