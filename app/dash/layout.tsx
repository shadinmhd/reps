"use client"
import { useUser } from "@/context/userContext"
import { redirect } from "next/navigation"
import { ReactNode, useEffect } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
	const { login, user } = useUser()

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			redirect("/login")
		} else if (user) {
			if (!user.verified) {
				redirect("/verify")
			}
		}
	}, [login, user])

	return children
}

export default Layout
