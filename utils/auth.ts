import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const createVerificationToken = (input: string): string => {
	const salt = crypto.randomBytes(16).toString('hex')

	const inputWithSalt = `${input}${salt}`

	const sha256 = crypto.createHash('sha256')
	sha256.update(inputWithSalt)
	const token = sha256.digest('hex')

	return token
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
