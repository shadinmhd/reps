interface User {
	username: string
	email: string
	password: string | undefined
	image: string | undefined
	verified: boolean
	token: string
	tokenExpiry: Date
	createdAt: Date
	updatedAt: Date
}
