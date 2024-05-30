"use client"
import Flexing from '@/assets/icons/Flexing'
import { useUser } from '@/context/userContext'
import Link from 'next/link'
import { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './shadcn/DropDownMenu'
import Exit from '@/assets/icons/Exit'
import Gear from '@/assets/icons/Gear'
import DashboardIcon from '@/assets/icons/DashboardIcon'
import { useRouter } from 'next/navigation'

const Navbar = () => {

	const { user, loggedIn } = useUser()

	return (
		<header className='flex items-center justify-between p-5 px-10 w-full'>
			<Link href={"/"} className='flex gap-2 items-center font-bold text-3xl'>
				<Flexing className='text-5xl' />
				Reps
			</Link>
			{
				loggedIn ?
					<Menu className='flex items-center text-2xl font-bold outline-none' >
						{user?.username}
					</Menu>
					:
					<div className='flex items-center gap-2'>
						<Link href={"/login"} className='font-semibold p-2 rounded-md bg-custom-gray outline-none'>
							Login
						</Link>
						<Link href={"/register"} className='bg-white text-black font-semibold p-2 rounded-md'>
							Register
						</Link>
					</div>
			}
		</header>
	)
}

const Menu = ({ children, className }: { children: ReactNode, className: string }) => {

	const { logout } = useUser()
	const router = useRouter()

	return (
		<DropdownMenu >
			<DropdownMenuTrigger className={className}>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-black'>
				<DropdownMenuGroup>

					<DropdownMenuItem
						onClick={() => { router.push("/dash") }}
						className='flex items-center gap-2 cursor-pointer'
					>
						<DashboardIcon className='text-xl' />
						<p className='font-bold text-lg'>Dashboard</p>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => { router.push("/dash/settings") }}
						className='flex items-center gap-2 cursor-pointer'
					>
						<Gear className='text-xl' />
						<p className='font-bold text-lg'>Settings</p>
					</DropdownMenuItem>

				</DropdownMenuGroup>

				<DropdownMenuItem onClick={logout} className='flex gap-2 items-center cursor-pointer'>
					<Exit className='text-xl' />
					<p className='font-bold text-lg'>Logout</p>
				</DropdownMenuItem>

			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Navbar
