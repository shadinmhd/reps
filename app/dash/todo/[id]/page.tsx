"use client"
import Plus from "@/assets/icons/Plus"
import CreateTask from "@/components/dash/CreateTask"
import YesNoDialog from "@/components/dash/YesNoDialog"
import api, { handleAxiosError } from "@/utils/api"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface Props {
	params: {
		id: string
	}
}

const Todo = ({ params }: Props) => {

	const router = useRouter()
	const [todo, setTodo] = useState<Todo>({
		_id: "",
		name: "",
		user: "",
		tasks: [],
		createdAt: new Date(),
		updatedAt: new Date()
	})

	useEffect(() => {
		if (params.id)
			api.get(`/todo?id=${params.id}`)
				.then(({ data }) => {
					if (data.success) {
						setTodo(data.todo)
					} else {
						toast.error(data.message)
					}

				})
				.catch(error => {
					handleAxiosError(error)
				})
	}, [params.id])

	useEffect(() => {
		if (todo._id != "")
			api.patch("/todo", todo)
				.then(({ data }) => {
					if (!data.success) {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})
	}, [todo])

	const deleteTask = useCallback((index: number) => {
		const tasks = [...todo.tasks]
		tasks.splice(index, 1)
		setTodo(prev => ({ ...prev, tasks }))
	}, [todo])

	const deleteTodo = useCallback(async () => {
		try {
			const { data } = await api.delete(`/todo?id=${todo._id}`)
			if (data.success) {
				router.back()
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}, [todo, router])

	const addTask = useCallback((task: Task) => {
		const tasks = [...todo.tasks, task]
		setTodo(prev => ({ ...prev, tasks }))
	}, [todo])

	const changeCompletion = useCallback((index: number) => {
		const temp = [...todo.tasks]
		temp[index].completed = !temp[index].completed
		setTodo(prev => ({ ...prev, tasks: temp }))
	}, [todo])

	return (
		<div className="flex flex-col items-center pt-10 w-full h-full overflow-hidden">
			<div className="flex items-center justify-between w-1/2 border-b">
				<p className="text-3xl font-bold">{todo?.name}</p>
				<div className="flex items-center gap-2 pb-2">
					<p>{todo?.tasks.filter(e => e.completed).length}/{todo?.tasks.length}</p>
					<CreateTask addTask={addTask} className="flex items-center justify-center bg-green-500 size-10 text-4xl p-2 rounded-md">
						<Plus className="text-green-500" />
					</CreateTask>
					<YesNoDialog onYes={deleteTodo}>
						<Trash className="bg-red-500 p-2 size-10 text-xl rounded-md cursor-pointer" />
					</YesNoDialog>
				</div>
			</div>
			<div className="flex flex-col items-center h-full w-1/2 overflow-y-auto pt-2">
				<div className="flex flex-col gap-2 w-full">
					{todo?.tasks.map((e, i) => (
						<div
							key={i}
							className={`flex items-center gap-1 ${e.completed ? "bg-green-500" : "bg-custom-gray"}  p-1 px-2 rounded-md w-full`}
						>
							<p onClick={e => { e.preventDefault(); changeCompletion(i) }} className="flex font-semibold text-lg items-center w-full cursor-pointer">
								{e.name}
							</p>
							<Trash onClick={e => { e.preventDefault(); deleteTask(i) }} className="bg-custom-gray text-red-500 p-2 size-10 text-xl rounded-md cursor-pointer" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Todo
