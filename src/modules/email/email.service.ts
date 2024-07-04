import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'reservagol.deportes@gmail.com',
                pass: process.env.PASS_APP_GMAIL
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        const info = await this.transporter.sendMail({
            from: '"Reserva Gol" <reservagol.deportes@gmail.com>',
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
    }
}
