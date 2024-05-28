import Flexing from '@/assets/icons/Flexing'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
	return (
		<header className='flex items-center justify-between p-5 w-full'>
			<Link href={"/"} className='flex gap-2 items-center font-bold text-2xl'>
				<Flexing className='text-5xl' />
				Reps
			</Link>
			<div className='flex items-center gap-2'>
				<Link href={"/login"} className='font-semibold p-2 rounded-md bg-custom-gray'>
					Login
				</Link>
				<Link href={"/register"} className='bg-white text-black font-semibold p-2 rounded-md'>
					Register
				</Link>
			</div>
		</header>
	)
}

export default Navbar
