"use client"
import { useUser } from '@/context/userContext'
import api, { handleAxiosError } from '@/utils/api'
import { isAxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { toast } from 'sonner'

const Verify = () => {

	const { user, loggedIn } = useUser()
	const token = useSearchParams()?.get("token")
	const [loading, setLoading] = useState<boolean>(true)
	const [message, setMessage] = useState<string>("")
	const router = useRouter()

	useEffect(() => {
		if (token) {
			setLoading(true)
			api.post("/auth/verify", { token })
				.then(({ data }) => {
					if (data.success) {
						toast.success(data.message)
						router.push("/dash")
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					if (isAxiosError(error)) {
						setMessage(error.response?.data.message || error.message)
					}
					// handleAxiosError(error)
				}).finally(() => {
					setLoading(false)
				})
		} else {
			if (!localStorage.getItem("token")) {
				router.push("/login")
			}
		}
	}, [token, router, loggedIn])

	const resend = useCallback(async () => {
		if (user) {
			try {
				const { data } = await api.get(`/auth/resend?email=${user.email}`)
				if (data.success) {
					toast.success(data.message)
				} else {
					toast.error(data.message)
				}
			} catch (error) {
				handleAxiosError(error)
			}
		} else {
			toast.error("something went wrong. please reaload your page")
		}
	}, [user])

	if (!token) {
		return (
			<div className='flex flex-col items-center pt-40 '>
				<div className='flex flex-col items-center text-center gap-5'>
					<h1 className='text-5xl font-bold'>Verify</h1>
					<div className='flex flex-col gap-2'>
						<p>Thank you for registering!</p>
						<p>A verification email has been sent to your email address.</p>
						<p>Please check your inbox and click on the link to verify your email.</p>
					</div>
					<button onClick={e => { e.preventDefault(); resend() }} className='bg-white text-black font-bold text-xl p-2 rounded-md'>
						Resend
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-5 items-center pt-40'>
			<h1 className='text-5xl font-bold'>Verify</h1>
			{
				loading ?
					<PuffLoader color='#fff' />
					:
					<div className='flex flex-col items-center gap-2'>
						<p className='text-red-500 font-bold text-2xl'>{message}</p>
						<button onClick={e => { e.preventDefault(); resend() }} className='bg-white text-black font-bold text-xl p-2 rounded-md'>
							Resend
						</button>
					</div>
			}
		</div>
	)
}

export default Verify
