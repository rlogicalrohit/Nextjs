import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        console.log("userId", userId);

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // TODO: configure mail for usage
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f3ec58e546ab07",
                pass: "1df20349f0c05d"
            }
        });

        const mailOptions = {

            from: 'rohit@rp.ai', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"} or copy this link <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a></p>`, // html body
        }

        const mailRespose = await transport.sendMail(mailOptions)
        return mailRespose;
    } catch (error: any) {
        throw new Error(error.message)
    }
}