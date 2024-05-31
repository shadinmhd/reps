import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/Dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
	className?: string,
	children: ReactNode,
	addTask: (taks: Task) => void
}

const formSchema = z.object({
	name: z.string().min(1, { message: "This field cannot be empty" })
})

type formType = z.infer<typeof formSchema>

const CreateTask = ({ className, children, addTask }: Props) => {

	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const [open, setOpen] = useState<boolean>(false)

	const onSubmit = async (body: formType) => {
		addTask({ name: body.name, completed: false })
		setOpen(false)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger className={className}>
				{children}
			</DialogTrigger>
			<DialogContent className="flex flex-col items-center bg-custom-gray">
				<DialogHeader>
					<DialogTitle className="text-3xl">
						Create Task
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-center gap-2"
				>
					<input
						{...register("name")}
						placeholder="Name"
						type="text"
						className="text-black outline-none p-2 rounded-md font-semibold"
					/>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}
					<button type="submit" className="bg-white text-black text-xl font-bold rounded-md py-1 px-2">
						Create
					</button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTask
