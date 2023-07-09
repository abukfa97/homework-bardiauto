import nodemailer from 'nodemailer';
import mailDetails from '../model/mailDetailsInterface';
import { getMail } from '../mailTemplate/successfulReservation';

export default class ReservationService {
    private static instance : ReservationService;
    private transporter!: nodemailer.Transporter;

    constructor() {}
    static getInstance(){
        if(!ReservationService.instance){
            ReservationService.instance = new ReservationService();
        }
        return ReservationService.instance;
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