import otpModel from "@/models/otp.model";
import userModel from "@/models/user.model";
import connectDb from "@/utils/database";
import { sendOtp } from "@/utils/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { createOtp } from "@/utils/auth"

connectDb()

// TODO: encrypt password
// TODO: replace otp method with magic link

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	try {
		if (req.method == "POST") {
			const { username, email, password } = req.body
			console.log(req.body)
			console.log(username, email, password)

			if (!username || !email || !password) {
				return res.status(400).send({
					success: false,
					message: "Please fill all fields"
				})
			}

			const userSearch = await userModel.findOne({
				$or: [
					{ username },
					{ email }
				]
			})

			if (userSearch) {
				return res.status(400).send({
					success: false,
					messsage: "username or email allready in use"
				})

			}

			const user = await new userModel({
				username,
				email,
				password
			}).save()

			const otpCode = createOtp()
			console.log(otpCode)

			const otp = await new otpModel({
				code: otpCode,
				user: user._id
			}).save()

			sendOtp(email, otpCode)

			res.status(200).send({
				success: true,
				message: "user created success fully"
			})
		}

		res.status(405).send({
			success: false,
			message: `${req.method} is not allowed on this route`
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default handler
