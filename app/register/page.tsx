"use client"
import api, { handleAxiosError } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string().min(1, { message: "This field cannot be empty" }),
	password: z.string().min(5, { message: "This field cannot be empty" }).refine(val => !val.includes(" "), { message: "Password must not contain space" }),
	email: z.string().email({ message: "Please enter a valid email" }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password != confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "passwords don't match",
			path: ["confirmPassword"]
		})
	}
})

const inputStyle = "rounded-md p-2 outline-none text-black font-semibold"

type formType = z.infer<typeof formSchema>

const Register = () => {

	const router = useRouter()
	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.post("/api/auth/register", {
				username: body.username,
				password: body.password,
				email: body.email
			})

			if (data.success) {
				router.push("/verify")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col gap-5 items-center pt-40 w-full'>
			<h1 className='text-4xl font-bold'>Register</h1>
			<form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

				<input
					{...register("username")}
					type="text"
					placeholder='Username'
					className={inputStyle}
				/>
				{errors.username && <p className='text-red-500'>{errors.username.message}</p>}

				<input
					{...register("email")}
					type="text"
					placeholder='Email'
					className={inputStyle}
				/>
				{errors.email && <p className='text-red-500'>{errors.email.message}</p>}

				<input
					{...register("password")}
					type="password"
					placeholder='Password'
					className={inputStyle}
				/>
				{errors.password && <p className='text-red-500'>{errors.password.message}</p>}

				<input
					{...register("confirmPassword")}
					type="password"
					placeholder='Confirm password'
					className={inputStyle}
				/>
				{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}

				<button type='submit' className='text-xl font-bold bg-custom-gray rounded-md p-2'>
					Register
				</button>

				<Link className='' href={"/login"}>
					allready have an account? Login here
				</Link>

			</form>
		</div >
	)
}

export default Register
