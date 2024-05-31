interface Todo {
	_id: string
	name: string,
	user: string | User,
	tasks: Task[]
	createdAt: Date,
	updatedAt: Date
}

interface Task {
	name: string,
	completed: boolean,
	completedAt?: Date
}
