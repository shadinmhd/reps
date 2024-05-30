import jwt from 'jsonwebtoken'

export const createAuthToken = (id: string) => {
	const JWT = process.env.JWT
	return jwt.sign({ id }, JWT!)
}

export const decodeToken = (token: string): { id: string } => {
	const JWT = process.env.JWT
	return jwt.verify(token, JWT!) as { id: string }
}
