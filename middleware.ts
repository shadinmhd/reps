import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose"

export const middleware = async (req: NextRequest) => {
	try {
		const token = req.headers.get("Authorization")
		if (!token) {
			return NextResponse.json({
				success: false,
				message: "User is not logged in",
				error: "unauthorized"
			}, { status: 401 })
		}

		const JWT = new TextEncoder().encode(process.env.JWT as string)
		await jwtVerify(token, JWT)

		return NextResponse.next()
	} catch (error: any) {
		console.log(error)

		if (error.code == "ERR_JWT_INVALID") {
			return NextResponse.json({
				success: false,
				message: "Invalid authentication token",
				error: "unauthorized"
			}, { status: 401 })
		}

		if (error instanceof JsonWebTokenError) {
			return NextResponse.json({
				success: false,
				message: "Invalid authentication token",
				error: "unauthorized"
			}, { status: 401 })
		}

		return NextResponse.json({
			success: false,
			message: "server error"
		}, { status: 500 })
	}
}

export const config = {
	matcher: ['/api/user/:path*', "/api/plan/:path*"]
}
