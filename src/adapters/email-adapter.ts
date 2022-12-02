import nodemailer from 'nodemailer'

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'aaa@gmail.com', // generated ethereal user
                pass: '123', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Artem N <aaa@gmail.com>',
            to: email,
            subject: subject,
            html: message
        });
    }
}