import mongoose from "mongoose";

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
	otp: {
		type: String
	},
	otpExpiry: {
		type: Date
	}
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel
