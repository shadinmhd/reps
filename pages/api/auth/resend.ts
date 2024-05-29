import userModel from "@/models/user.model";
import { decodeToken } from "@/utils/jwt";
import { sendOtp } from "@/utils/mail";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "GET") {
			const token = req.headers.authorization
			const id = decodeToken(token!)
			const user = await userModel.findById(id)

			if (!user) {
				return res.status(400).send({
					success: false,
					message: "User not found"
				})
			}

			sendOtp(user.email, user.token)

			return res.status(200).send({
				success: true,
				message: "Email send successfully"
			})
		}

		res.status(405).send({
			success: false,
			message: `${req.method} is not allowed`
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
