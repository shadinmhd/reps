import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport"

const GMAIL = process.env.GMAIL
const GMAIL_PASS = process.env.GMAIL_PASS

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: GMAIL,
		pass: GMAIL_PASS
	}
})


export const sendOtp = (to: string, code: string) => {
	const mailOptions: MailOptions = {
		from: GMAIL,
		to: to,
		subject: "Otp for login in reps",
		html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Reps</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Reps. Use the following OTP to complete your Registration procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
    <p style="font-size:0.9em;">Regards,<br />Reps</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Reps</p>
    </div>
  </div>
</div>`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error sending mail: ", error)
		} else {
			console.log("Email sent:", info.response)
		}
	})
}

