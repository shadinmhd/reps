"use client"
import { useUser } from "@/context/userContext"
import { Dialog, DialogContent, DialogTrigger } from "../shadcn/Dialog"
import { ReactNode, useCallback, useEffect, useState } from "react"
import cn from "@/utils/cn"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "@/utils/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
	name: z.string().min(1, { message: "This field cannot be empty" }),
	description: z.string().min(1, { message: "This field cannot be empty" }),
	restInterval: z.number().min(30, { message: "The rest interval cannot be less than 30sec" }),
	estimatedTime: z.number().min(1, { message: "No workout can be done that fast" }),
	sets: z.number().min(1, { message: "Sets cannot be less than 1" }).default(1)
})

type formType = z.infer<typeof formSchema>

interface Props {
	className?: string
	children: ReactNode
}

const CreatePlan = ({ children, className }: Props) => {

	const { user } = useUser()
	const router = useRouter()
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const [open, setOpen] = useState<boolean>(false)

	const onSubmit = useCallback(async (body: formType) => {
		if (user?._id) {
			try {
				const { data } = await api.post("/plan", { ...body, user: user?._id })
				if (data.success) {
					toast.success(data.message)
					router.push(`/dash/plan/${data?.plan?._id}`)
				} else {
					toast.error(data.message)
				}
			} catch (error) {
				handleAxiosError(error)
			}
		} else {
			toast.error("Something went wrong please refresh the page")
		}
	}, [user, router])

	const inputStyle = "text-black outline-none p-2 rounded-md"

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={cn("", className)}>
				{children}
			</DialogTrigger>
			<DialogContent className="flex flex-col bg-custom-gray border-none">
				<p className="text-2xl font-bold">Create new plan</p>
				<form className="flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("name")}
						placeholder="Name"
						type="text"
						className={inputStyle}
					/>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}

					<input
						{...register("description")}
						placeholder="Description"
						type="text"
						className={inputStyle}
					/>
					{errors.description && <p className="text-red-500">{errors.description.message}</p>}

					<input
						{...register("restInterval", { valueAsNumber: true })}
						placeholder="Rest Interval in second"
						type="text"
						className={inputStyle}
					/>
					{errors.restInterval && <p className="text-red-500">{errors.restInterval.message}</p>}

					<input
						{...register("estimatedTime", { valueAsNumber: true })}
						placeholder="Eta in minutes"
						type="text"
						className={inputStyle}
					/>
					{errors.estimatedTime && <p className="text-red-500">{errors.estimatedTime.message}</p>}

					<input
						{...register("sets", { valueAsNumber: true })}
						placeholder="Number of sets"
						type="text"
						className={inputStyle}
					/>
					{errors.sets && <p className="text-red-500">{errors.sets.message}</p>}

					<div className="flex items-center gap-5">
						<button type="submit" className="bg-white text-black text-lg font-bold p-2 rounded-md">
							Create
						</button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreatePlan
