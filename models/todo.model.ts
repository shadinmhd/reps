import mongoose from "mongoose"

const taskSchema = new mongoose.Schema<Task>({
	name: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Date
	}
})

const todoSchema = new mongoose.Schema<Todo>({
	name: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true,
		ref: "User"
	},
	tasks: {
		type: [taskSchema],
		default: []
	}
}, { timestamps: true })

const todoModel = mongoose.models.Todo as mongoose.Model<Todo> || mongoose.model("Todo", todoSchema)
export default todoModel
