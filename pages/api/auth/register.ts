import userModel from "@/models/user.model";
import connectDb from "@/utils/database";
import { sendOtp } from "@/utils/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { createVerificationToken } from "@/utils/auth"
import { encryptPass } from "@/utils/password";

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	try {
		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "POST") {
			const { username, email, password } = req.body

			if (!username || !email || !password) {
				return res.status(400).send({
					success: false,
					message: "Please fill all fields"
				})
			}

			const hashedPassword = await encryptPass(password)
			const token = createVerificationToken(email)
			const now = new Date()

			await new userModel({
				username,
				email,
				password: hashedPassword,
				token,
				tokenExpiry: new Date(now.getTime() + (100 * 60 * 5))
			}).save()

			sendOtp(email, token)

			return res.status(200).send({
				success: true,
				message: "user created success fully"
			})
		}

		res.status(405).send({
			success: false,
			message: `${req.method} is not allowed on this route`
		})
	} catch (error: any) {
		console.log(error)

		if (error.code == 11000) {
			res.status(400).send({
				success: false,
				message: `${Object.keys(error.keyPattern)[0]} is allready used`
			})
		}

		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default handler
