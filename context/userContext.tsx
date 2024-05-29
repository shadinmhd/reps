"use client"
import api, { handleAxiosError } from "@/utils/api";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface Props {
	loggedIn: boolean
	user: User | undefined
	login: () => void
	logout: () => void
}

const userContext = createContext<Props>({
	loggedIn: false,
	user: undefined,
	login: () => { },
	logout: () => { }
})

export const UserProvider = ({ children }: { children: ReactNode }) => {

	const [user, setUser] = useState<User>()
	const [loggedIn, setLoggedIn] = useState<boolean>(false)

	useEffect(() => {
		if (localStorage.getItem("token")) {
			console.log("logged in")
			login()
		}
	}, [loggedIn])

	const getUserDetails = async () => {
		try {
			const { data } = await api.get("/user")
			if (data.success) {
				setUser(data.user)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	const login = () => {
		setLoggedIn(true)
		getUserDetails()
	}

	const logout = () => {
		localStorage.removeItem("token")
		setLoggedIn(false)
		setUser(undefined)
		redirect("/login")
	}

	return (
		<userContext.Provider value={{ user, loggedIn, login, logout }}>
			{children}
		</userContext.Provider>
	)
}

export const useUser = () => {
	return useContext(userContext)
}
