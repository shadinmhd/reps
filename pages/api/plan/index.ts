import planModel from "@/models/plan.model"
import { decodeToken } from "@/utils/jwt"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			return res.status(200).end()
		}

		if (req.method == "POST") {
			const { name, description, user, restInterval, estimatedTime, sets } = req.body

			if (
				!name ||
				!description ||
				!user ||
				typeof restInterval != "number" ||
				typeof estimatedTime != "number" ||
				typeof sets != "number"
			) {
				return res.status(400).send({
					success: false,
					message: "Please fill all fields"
				})
			}

			const userId = decodeToken(req.headers.authorization!).id
			const planSearch = await planModel.findOne({ name, user: userId })

			if (planSearch) {
				return res.status(400).send({
					success: false,
					message: "Plan allready exists"
				})
			}

			const plan = await new planModel({
				name,
				user,
				description,
				restInterval,
				estimatedTime,
				sets
			}).save()

			return res.status(200).send({
				success: true,
				message: "Plan created successfully",
				plan
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

			const plan = await planModel.findById(id)

			if (!plan) {
				return res.status(400).send({
					success: false,
					message: "No plan found on id"
				})
			}

			return res.status(200).send({
				success: true,
				message: "Plan fetched successfully",
				plan
			})
		}

		if (req.method == "PATCH") {

			const { exercises, _id } = req.body

			if (!exercises || !_id) {
				return res.status(400).send({
					success: false,
					message: "Field exercises or _id was not provided"
				})
			}

			const plan = await planModel.findById(_id)

			if (!plan) {
				return res.status(400).send({
					success: false,
					message: "Plan was not found"
				})
			}

			plan.exercises = exercises
			await plan.save()

			return res.status(200).send({
				success: true,
				message: "Updated plan successfully"
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

			const response = await planModel.deleteOne({ _id: id })

			if (response.deletedCount < 0) {
				return res.status(400).send({
					success: false,
					message: "Document was not foudn"
				})
			}

			return res.status(200).send({
				success: true,
				message: "Plan deleted successfully"
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
