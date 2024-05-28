import bcrypt from "bcrypt"

export const encryptPass = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const comparePass = async (password: string, encryptedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, encryptedPassword)
}

