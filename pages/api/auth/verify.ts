import userModel from "@/models/user.model"
import connectDb from "@/utils/database"
import { NextApiRequest, NextApiResponse } from "next"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "POST") {
			const { token } = req.body

			const user = await userModel.findOne({ token })

			if (!token) {
				return res.status(400).send({
					success: false,
					message: "Please provide the token"
				})
			}

			if (!user) {
				return res.status(400).send({
					success: false,
					message: "The verification link is Invalid"
				})
			}

			if (user.tokenExpiry < new Date()) {
				return res.status(400).send({
					success: false,
					message: "The verification links is Expired"
				})
			}

			user.verified = true
			await user.save()

			return res.status(200).send({
				success: true,
				message: "Verification completed"
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
