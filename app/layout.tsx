import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import cn from "@/utils/cn"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Reps",
	description: "count your reps",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'bg-black  text-white')}>
				<Toaster richColors/>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
