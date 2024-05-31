import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import cn from "@/utils/cn"
import { Toaster } from "sonner"
import Provider from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Todo",
	description: "count your tasks",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'bg-black  text-white h-screen overflow-hidden')}>
				<Provider>
					<Toaster richColors />
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	)
}
