"use client"
import Flexing from '@/assets/icons/Flexing'
import { useUser } from '@/context/userContext'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

	const { user, loggedIn } = useUser()

	return (
		<header className='flex items-center justify-between p-5 px-10 w-full'>
			<Link href={"/"} className='flex gap-2 items-center font-bold text-2xl'>
				<Flexing className='text-5xl' />
				Reps
			</Link>
			{
				loggedIn ?
					<p className='flex items-center text-xl font-bold'>
						{user?.username}
					</p> :
					<div className='flex items-center gap-2'>
						<Link href={"/login"} className='font-semibold p-2 rounded-md bg-custom-gray'>
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

export default Navbar
