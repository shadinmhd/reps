"use client"
import CreatePlan from "@/components/dash/CreatePlan"
import api, { handleAxiosError } from "@/utils/api"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Dash = () => {

	const [plans, setPlans] = useState<Plan[]>([])

	useEffect(() => {
		api.get("/plan/all")
			.then(({ data }) => {
				if (data.success) {
					setPlans(data.plans)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className='flex flex-col px-10 pt-5 w-full'>
			<div className="flex items-center justify-between w-full pb-10">
				<p className="text-3xl font-bold">Your plans</p>
				<div className="flex items-center gap-5">
					<CreatePlan className="bg-white text-black text-xl font-bold outline-none p-2 rounded-md">
						Create Plan
					</CreatePlan>
				</div>
			</div>
			<div className="grid grid-cols-3 w-full gap-2">
				{plans.map((e, i) => (
					<Link
						href={`/dash/plan/${e._id}`}
						key={i}
						className="flex flex-col gap-1 font-bold w-full bg-custom-gray rounded-md p-5"
					>
						<p className="pt-5 text-2xl">{e.name}</p>
						<p className="font-normal">{e.description}</p>
						<p>Eta: {e.estimatedTime}min</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Dash
