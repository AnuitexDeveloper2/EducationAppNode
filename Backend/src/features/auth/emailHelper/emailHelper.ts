import * as nodemailer from "nodemailer";       

const mailTransportert = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
        user: 'morgenshtern1988@gmail.com',
        pass: '25012005'
    }
})

     export const sendingEmail = (email: string ): any => {
        let mailOptions = {
            from: 'morgenshtern1988@gmail.com', 
            to: email,
            subject: "// Subject line",
            text: "Confirm registration by clicking on the link: ${https://localhost:50285/auth/confirmEmail}"
        };
        mailTransportert.sendMail(mailOptions,(error,info)=> {
            if (error) {
               return error
            }
            return true;
        })
};