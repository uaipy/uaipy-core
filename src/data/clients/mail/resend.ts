import { Resend } from 'resend';

interface ISendEmailParams {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
}

export class ResendClient {
    constructor(private readonly resend: Resend) {}

    async sendEmail({ from, html, subject, text, to }: ISendEmailParams) {
        await this.resend.emails.send({
            from: from,
            to: to,
            subject,
            text,
            html
        });
    }
}
