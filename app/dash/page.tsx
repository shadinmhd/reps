"use client"
import CreateTodo from "@/components/dash/CreateTodo"
import api, { handleAxiosError } from "@/utils/api"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Dash = () => {

	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		api.get("/todo/all")
			.then(({ data }) => {
				if (data.success) {
					setTodos(data.todos)
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
				<p className="text-3xl font-bold">Your taks groups</p>
				<div className="flex items-center gap-5">
					<CreateTodo className="bg-white text-black rounded-md p-2 text-xl font-bold" >
						Create Task group
					</CreateTodo>
				</div>
			</div>
			<div className="grid grid-cols-3 w-full gap-2">
				{todos.map((e, i) => (
					<Link
						href={`/dash/todo/${e._id}`}
						key={i}
						className="flex flex-col gap-1 font-bold w-full bg-custom-gray rounded-md p-5"
					>
						<p className="pt-5 text-2xl">{e.name}</p>
						<p>tasks: {e.tasks.filter(e => e.completed).length}/{e.tasks.length}</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Dash
