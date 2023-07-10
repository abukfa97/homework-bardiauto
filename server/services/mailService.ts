import nodemailer from 'nodemailer';
import mailDetails from '../model/mailDetailsInterface';
import { getMail } from '../mailTemplate/successfulReservation';

export default class MailService {
    private static instance : MailService;
    private transporter!: nodemailer.Transporter;

    constructor() {}
    static getInstance(){
        if(!MailService.instance){
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    private createConnection(){
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS,
            }
        });
    }

    async sendMail(mailDetails: mailDetails){
        this.createConnection();
        try {
            const info = await this.transporter.sendMail(mailDetails);
            console.log(`Email sent successfully!\nMESSAGE ID: ${info.messageId}`);
        } catch (error) {
            console.log(error);
        }
        return this.transporter.close();
    }

    createMailDetails(targetAddress: string, subject: string ,msg: string ): mailDetails{
        const details: mailDetails = {
            from: process.env.MAIL_SENDER ? process.env.MAIL_SENDER : "",
            to: targetAddress,
            subject: subject,
            text: msg,
            html: getMail(msg)
        }
        return details;
    }
    
}