import userModel from "@/models/user.model"
import { NextApiRequest, NextApiResponse } from "next"
import { createAuthToken } from "@/utils/jwt"
import { comparePass } from "@/utils/password"
import connectDb from "@/utils/database"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		const { email, password } = req.body

		const user = await userModel.findOne({ email })

		if (!user) {
			return res.status(400).send({
				success: false,
				message: "User doesn't exist"
			})
		}

		const passCheck = comparePass(password, user.password as string)

		if (!passCheck) {
			return res.status(400).send({
				success: false,
				message: "Incorrect email or password"
			})
		}

		const token = createAuthToken(String(user._id))

		res.status(200).send({
			success: true,
			message: "logged in successfully",
			token
		})

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default handler
