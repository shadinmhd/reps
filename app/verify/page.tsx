"use client"
import api, { handleAxiosError } from '@/utils/api'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const Verify = () => {

	const token = useSearchParams()?.get("token")
	const router = useRouter()

	useEffect(() => {
		if (token) {
			api.post("/api/auth/verify", { token })
				.then(({ data }) => {
					if (data.success) {
						toast.success(data.message)
						router.push("/dash")
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})
		}
	}, [token, router])

	if (!token) {
		return (
			<div>
				No Token
			</div>
		)
	}

	return (
		<div>
			{token}
		</div>
	)
}

export default Verify
