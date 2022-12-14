import { Injectable } from "@nestjs/common";
import { Vonage } from '@vonage/server-sdk';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

@Injectable()
export class VonageApi {
  async sendSms(phone: string, message: string) {

    const from = "Zsacker Cafe";
    if (phone.startsWith('0')) {
      phone = `63${phone.substring(1)}`;
    }
    const to: string = phone;
    const text: string = message;
    await vonage.sms.send({ to, from, text })
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
  }
}