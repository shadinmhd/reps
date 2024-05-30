"use client"
import CreateExercise from "@/components/dash/CreateExercise"
import api, { handleAxiosError } from "@/utils/api"
import { Plus, Trash } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

interface Props {
	params: {
		id: string
	}
}

const PlanView = ({ params }: Props) => {

	const [plan, setPlan] = useState<Plan>()

	useEffect(() => {
		if (params.id)
			api.get(`/plan?id=${params.id}`)
				.then(({ data }) => {
					if (data.success) {
						setPlan(data.plan)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})
	}, [params.id])

	const newExercise = useCallback((exercise: Exercise) => {
		if (plan) {
			const exercises = [...plan.exercises, exercise]
			setPlan({ ...plan, exercises })
		}
	}, [plan])

	const deleteExercise = useCallback((index: number) => {
		if (plan) {
			const exercises = [...plan.exercises]
			exercises.splice(index, 1)
			setPlan({ ...plan, exercises })
		}
	}, [plan])

	const savePlan = useCallback(async () => {
		try {
			const { data } = await api.patch("/plan", plan)
			if (data.success) {
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}, [plan])

	return (
		<div className='flex flex-col gap-5 items-center pt-20 w-full h-full overflow-hidden'>
			<p className="text-4xl font-bold">{plan?.name}</p>
			<p className="w-1/2 text-center text-xl">{plan?.description}</p>
			<div className="flex items-center gap-5">
				<p className="font-bold">Estimated time: {plan?.estimatedTime}min</p>
				<p className="font-bold">Sets: {plan?.sets}</p>
				<p className="font-bold">Rest intervals: {plan?.restInterval}s</p>
			</div>
			<div className="flex flex-col gap-2 items-center w-full">
				<div className="flex items-center justify-between border-b w-1/3 py-1">
					<p className="font-bold text-lg text-center w-1/3">Exercises: {plan?.exercises.length || 0}</p>
					<div className="flex items-center gap-2">
						<button onClick={e => { e.preventDefault(); savePlan() }} className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
							Save
						</button>
						<Link href={`/dash/plan/${params.id}/play`} className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
							Start
						</Link>
					</div>
				</div>
				<div className="flex flex-col items-center h-full overflow-y-hidden w-full">
					<div className="flex flex-col items-center gap-2 w-1/3">
						{
							plan?.exercises.map((e, i) => (
								<div
									key={i}
									className="flex items-center gap-2 w-full"
								>
									<div
										className="flex items-center justify-between bg-custom-gray rounded-md px-4 py-2 w-full"
									>
										<div>
											<p className="font-bold">{e.name}</p>
										</div>
										<div>
											{
												e.type == "REPETITION" ?
													<p>x{e.repetition}</p>
													:
													<div>
														{e.time}s
													</div>
											}
										</div>
									</div>
									<Trash onClick={e => { e.preventDefault(); deleteExercise(i) }} className="bg-custom-gray text-red-500 size-10 p-2 cursor-pointer rounded-md" />
								</div>
							))
						}
					</div>
				</div>

			</div>

			<CreateExercise newExercise={newExercise}>
				<Plus className="text-green-500 size-12" />
			</CreateExercise>
		</div>
	)
}

export default PlanView
