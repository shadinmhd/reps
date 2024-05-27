import userModel from "@/models/user.model"
import { NextApiRequest, NextApiResponse } from "next"

//TODO: add token creation
//TODO: complete the login method 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		const { email, password } = req.body

		const userSearch = await userModel.findOne({ email })

		res.status(200).send({
			success: true,
			message: "logged in successfully"
		})

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default handler
