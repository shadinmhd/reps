"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import api, { handleAxiosError } from '@/utils/api'

const formSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email" }),
	password: z.string().min(1, { message: "This field cannot be empty" })
})

type formType = z.infer<typeof formSchema>

const Login = () => {

	const router = useRouter()
	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = async (body: formType) => {
		console.log(body)
		try {
			const { data } = await api.post("/auth/login", body)
			if (data.success) {
				localStorage.setItem("token", data.token)
				router.push("/dash")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col gap-5 items-center pt-40'>
			<h1 className='text-5xl font-bold'>Login</h1>
			<form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

				<input
					{...register("email")}
					type="text"
					placeholder='Email'
					className="rounded-md p-2 outline-none text-black font-semibold"
				/>
				{errors.email && <p className='text-red-500'>{errors.email.message}</p>}

				<input
					{...register("password")}
					type="password"
					placeholder='Password'
					className="rounded-md p-2 outline-none text-black font-semibold"
				/>
				{errors.email && <p className='text-red-500'>{errors.email.message}</p>}

				<button type='submit' className='text-xl font-bold bg-custom-gray rounded-md p-2'>
					Login
				</button>
				<Link href={"/register"}>
					Don&apos;t have an account? Register here
				</Link>
			</form>
		</div>
	)
}

export default Login
