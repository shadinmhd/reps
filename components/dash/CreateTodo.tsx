import { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/Dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "@/utils/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Props {
	className?: string,
	children: ReactNode
}

const formSchema = z.object({
	name: z.string().min(1, { message: "This field cannot be empty" })
})

type formType = z.infer<typeof formSchema>

const CreateTodo = ({ className, children }: Props) => {

	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.post("/todo", body)

			if (data.success) {
				router.push(`/dash/todo/${data.todo._id}`)
			} else {
				toast.error(data.message)
			}

		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<Dialog>
			<DialogTrigger className={className}>
				{children}
			</DialogTrigger>
			<DialogContent className="flex flex-col items-center bg-custom-gray">
				<DialogHeader>
					<DialogTitle className="text-3xl">
						Create Task group
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

export default CreateTodo
