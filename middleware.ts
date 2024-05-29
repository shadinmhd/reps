import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { decodeToken } from "./utils/jwt";

export const middleware = (req: NextRequest) => {
	try {
		const token = req.headers.get("Authorization")
		if (!token) {
			return NextResponse.json({
				success: false,
				message: "User is not logged in",
				error: "unauthorized"
			}, { status: 401 })
		}

		return NextResponse.next()
	} catch (error) {
		console.log(error)

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
	matcher: ['/api/user/:path*']
}
