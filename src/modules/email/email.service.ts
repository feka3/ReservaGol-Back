import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'imogene.bergstrom79@ethereal.email',
                pass: 'ufsr4jVGgHJJ5gweyJ'
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        const info = await this.transporter.sendMail({
            from: '"Reserva Gol" <noreply@reservagol.com>',
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
    }
}
