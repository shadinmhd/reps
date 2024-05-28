import Link from "next/link"

const Home = () => {
	return (
		<div className="flex flex-col gap-10 items-center pt-44">
			<p className="text-5xl font-bold">
				Welcome to Reps!
			</p>
			<div className="flex flex-col items-center gap-2 font-bold">
				<p>Start Your Fitness Journey Today.</p>
				<p>Track your workouts, monitor your progress, and achieve your goals.</p>
			</div>
			<Link href={"/dash"} className="bg-white text-black p-2 text-xl font-bold rounded-md">Get Started</Link>
		</div>
	)
}

export default Home
