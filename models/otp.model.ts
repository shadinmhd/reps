import mongoose from "mongoose"

const otpSchema = new mongoose.Schema<Otp>({
	user: {
		type: String,
		required: true,
		ref: "User"
	},
	code: {
		type: String,
		required: true
	},
	expiresAt: {
		type: Date,
		default: Date.now() + 1000 * 60 * 5
	}
})

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300 })

const otpModel = mongoose.models.Otp as mongoose.Model<Otp> || mongoose.model("Otp", otpSchema)
export default otpModel
