import todoModel from "@/models/todo.model"
import { decodeToken } from "@/utils/jwt"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "GET") {
			const token = req.headers.authorization as string
			const id = decodeToken(token).id

			const todos = await todoModel.find({ user: id })

			return res.status(200).send({
				success: true,
				message: "Fetched all todos successfully",
				todos
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
			messge: "Server error"
		})
	}
}

export default handler
