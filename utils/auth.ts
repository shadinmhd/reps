import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createVerificationToken = () => {
}

export const encryptPass = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const comparePass = async (password: string, encryptedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, encryptedPassword)
}

export const createToken = (id: string) => {
	const JWT = process.env.JWT
	return jwt.sign(id, JWT!)
}

export const decodeToken = (token: string): string => {
	const JWT = process.env.JWT
	return jwt.verify(token, JWT!) as string
}
