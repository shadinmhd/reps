interface User {
	username: string
	email: string
	password: string | undefined
	image: string | undefined
	createdAt: Date
	verified: boolean
	otp: string
	otpExpiry: Date
}
