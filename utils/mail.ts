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


export const sendOtp = (to: string, token: string) => {
	const mailOptions: MailOptions = {
		from: GMAIL,
		to: to,
		subject: "Otp for login in Reps",
		html: OtpEmail(token)
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error sending mail: ", error)
		} else {
			console.log("Email sent:", info.response)
		}
	})
}


const OtpEmail = (token: string) => {

	const HOST = process.env.HOST

	if (!HOST) {
		throw new Error("Missing environment variable: 'HOST'")
	}

	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom=""
    data-darkreader-inline-border-left=""
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; --darkreader-inline-border-top: 0px; --darkreader-inline-border-right: 0px; --darkreader-inline-border-bottom: 0px; --darkreader-inline-border-left: 0px; background-color: rgb(239, 239, 239); --darkreader-inline-bgcolor: #212425;"
    data-darkreader-inline-bgcolor="">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" data-darkreader-inline-border-top="" data-darkreader-inline-border-right=""
            data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""
            style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left; --darkreader-inline-border-top: 0px; --darkreader-inline-border-right: 0px; --darkreader-inline-border-bottom: 0px; --darkreader-inline-border-left: 0px;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: center;">
                    <!---->
                  </div>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255); --darkreader-inline-bgcolor: #181a1b;"
                    data-darkreader-inline-bgcolor="">
                    <div style="color: rgb(0, 0, 0); text-align: left; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color="">
                      <h1 style="margin: 1rem 0">Final step...</h1>
                      <p style="padding-bottom: 16px">Follow this link to verify your email address.</p>
                      <p style="padding-bottom: 16px"><a href="${HOST}/verify?token=${token}" target="_blank"
                          style="padding: 12px 24px; border-radius: 4px; color: rgb(255, 255, 255); background: rgb(43, 82, 245); display: inline-block; margin: 0.5rem 0px; --darkreader-inline-color: #e8e6e3; --darkreader-inline-bgimage: initial; --darkreader-inline-bgcolor: #0829b0;"
                          data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Confirm now</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>The Reps Team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center; --darkreader-inline-color: #a8a095;"
                    data-darkreader-inline-color="">
                    <p style="padding-bottom: 16px">Made with ♥ in India</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`
}
