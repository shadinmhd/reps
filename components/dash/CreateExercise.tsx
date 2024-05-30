"use client"
import { Dialog, DialogContent, DialogTrigger } from "../shadcn/Dialog"
import { ReactNode, useEffect, useState } from "react"
import cn from "@/utils/cn"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	type: z.enum(['REPETITION', 'TIME']),
	time: z.number().optional(),
	repetition: z.number().optional(),
}).refine((data) => data.time !== undefined || data.repetition !== undefined, {
	message: 'Either time or repetition must be provided',
	path: ['time', 'repetition'],
})

type formType = z.infer<typeof formSchema>

const CreateExercise = ({ children, className, newExercise }: { children: ReactNode, className?: string, newExercise: (exercise: Exercise) => void }) => {

	const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const exerciseType = watch("type")

	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		setValue("type", "REPETITION")
	}, [setValue])

	useEffect(() => {
		setValue("repetition", undefined)
		setValue("time", undefined)
	})

	useEffect(() => {
		if (exerciseType == "REPETITION")
			setValue("repetition", undefined)
		else
			setValue("time", undefined)
	}, [exerciseType, setValue])

	const onSubmit = (body: formType) => {
		newExercise(body)
		setOpen(false)
	}

	const inputStyle = "text-black outline-none p-2 rounded-md"

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={cn("", className)}>
				{children}
			</DialogTrigger>
			<DialogContent className="flex flex-col bg-custom-gray border-none">
				<p className="text-2xl font-bold">Create new Exercise</p>
				<form className="flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("name")}
						placeholder="Name"
						type="text"
						className={inputStyle}
					/>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}

					<select
						{...register("type")}
						className="font-bold text-black bg-white rounded-md p-2"
						defaultValue={"REPETITION"}
					>
						<option value="REPETITION">Repetition</option>
						<option value="TIME">Time</option>
					</select>
					{errors.type && <p className="text-red-500">{errors.type.message}</p>}

					{exerciseType == "TIME" &&
						<input
							{...register("time", { valueAsNumber: true })}
							placeholder="Time in seconds"
							type="text"
							className={inputStyle}
						/>
					}
					{errors.time && <p className="text-red-500">{errors.time.message}</p>}

					{exerciseType == "REPETITION" &&
						<input
							{...register("repetition", { valueAsNumber: true })}
							placeholder="Number of repetitions"
							type="text"
							className={inputStyle}
						/>
					}
					{errors.repetition && <p className="text-red-500">{errors.repetition.message}</p>}

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

export default CreateExercise
