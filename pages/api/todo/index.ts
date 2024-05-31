import todoModel from "@/models/todo.model"
import { decodeToken } from "@/utils/jwt"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "POST") {
			const { name } = req.body

			if (!name) {
				return res.status(400).send({
					success: false,
					message: "Name is not filled"
				})
			}

			const user = decodeToken(req.headers.authorization!).id
			const todoSearch = await todoModel.findOne({ name, user })

			if (todoSearch) {
				return res.status(400).send({
					success: false,
					message: "Todo allready exists"
				})
			}

			const todo = await new todoModel({
				name,
				user,
			}).save()

			return res.status(200).send({
				success: true,
				message: "Todo created successfully",
				todo
			})
		}

		if (req.method == "GET") {
			const { id } = req.query

			if (!id) {
				return res.status(400).send({
					success: false,
					message: "id is not provided"
				})
			}

			const todo = await todoModel.findById(id)

			if (!todo) {
				return res.status(400).send({
					success: false,
					message: "No todo found on id"
				})
			}

			return res.status(200).send({
				success: true,
				message: "Todo fetched successfully",
				todo
			})
		}

		if (req.method == "PATCH") {

			const { tasks, _id } = req.body

			if (!tasks || !_id) {
				return res.status(400).send({
					success: false,
					message: "Field tasks or _id was not provided"
				})
			}

			const todo = await todoModel.findById(_id)

			if (!todo) {
				return res.status(400).send({
					success: false,
					message: "Todo was not found"
				})
			}

			todo.tasks = tasks
			await todo.save()

			return res.status(200).send({
				success: true,
				message: "Updated tasks successfully"
			})
		}

		if (req.method == "DELETE") {
			const { id } = req.query

			if (!id) {
				return res.status(400).send({
					success: false,
					message: "id not provided"
				})
			}

			const response = await todoModel.deleteOne({ _id: id })

			if (response.deletedCount < 0) {
				return res.status(400).send({
					success: false,
					message: "Todo group was not found"
				})
			}

			return res.status(200).send({
				success: true,
				message: "Todo deleted successfully"
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
