interface Plan {
	_id: string
	name: string
	user: string | User
	description: string
	restInterval: number
	estimatedTime: number
	sets: number
	exercises: Exercise[]
	createdAt: Date
	updatedAt: Date
}
