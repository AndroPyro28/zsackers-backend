import { Injectable } from '@nestjs/common/decorators';
import * as nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.NODEMAILER_GMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export interface sendEmailModel {
  subject: string,
  content: string,
  emailTo: string
}

@Injectable()
export class SMTP {
  constructor() { }

  sendEmail({
    subject,
    content,
    emailTo,
  }: sendEmailModel) {

    const details = {
      from: process.env.NODEMAILER_GMAIL,
      to: emailTo,
      subject,
      text: subject,
      html: content,
    };

    mailTransporter.sendMail(details, (err, info) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Email sent: " + info.response);
        return true;
      }
    })
  }
}