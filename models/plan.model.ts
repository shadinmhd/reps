import mongoose from "mongoose"

const exerciseSchema = new mongoose.Schema<Exercise>({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ["REPETITION", "TIME"]
	},
	time: {
		type: Number
	},
	repetition: {
		type: Number
	}
})

const planSchema = new mongoose.Schema<Plan>({
	name: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true,
		ref: "User"
	},
	description: {
		type: String,
		required: true
	},
	restInterval: {
		type: Number,
		required: true
	},
	estimatedTime: {
		type: Number,
		required: true
	},
	sets: {
		type: Number,
		required: true
	},
	exercises: {
		type: [exerciseSchema],
		default: [],
	}
}, { timestamps: true })

const planModel = mongoose.models.Plan as mongoose.Model<Plan> || mongoose.model("Plan", planSchema)
export default planModel
