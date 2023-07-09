import nodemailer from 'nodemailer';
import mailDetails from '../model/mailDetailsInterface';



const transporter  = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
    }
});

const sendMail = async (mailDetails: mailDetails) => {
    try {
        const info = await transporter.sendMail(mailDetails);
        console.log(`Email sent successfully!\nMESSAGE ID: ${info.messageId}`);
    } catch (error) {
        console.log(error)
    }   
}