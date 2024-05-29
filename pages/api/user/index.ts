import userModel from "@/models/user.model"
import { NextApiRequest, NextApiResponse } from "next"
import { decodeToken } from "@/utils/jwt"
import connectDb from "@/utils/database"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "GET") {
			const { authorization } = req.headers

			if (!authorization) {
				return res.status(400).send({
					success: false,
					message: "User auth token is missing"
				})
			}

			const token = decodeToken(authorization)

			const user = await userModel.findById(token).select("-password")

			if (!user) {
				return res.status(400).send({
					success: false,
					message: "user not found"
				})
			}

			return res.status(200).send({
				success: true,
				message: "User data fetched successfully",
				user
			})
		}

		res.status(405).send({
			success: false,
			message: `${req.method} not allowed`
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
