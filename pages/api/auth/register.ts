import otpModel from "@/models/otp.model";
import userModel from "@/models/user.model";
import connectDb from "@/utils/database";
import { sendOtp } from "@/utils/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { createOtp } from "@/utils/auth"
import { MongooseError } from "mongoose";

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
