import mongoose from "mongoose"

const userSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	token: {
		type: String,
		required: true
	},
	tokenExpiry: {
		type: Date,
		default: Date.now() + 1000 * 60 * 5
	}
})

const userModel = mongoose.models.User as mongoose.Model<User> || mongoose.model("User", userSchema)
export default userModel
