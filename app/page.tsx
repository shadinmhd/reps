import Link from "next/link"

const Home = () => {
	return (
		<div className="flex flex-col gap-10 items-center pt-44">
			<p className="text-5xl font-bold">
				Welcome to Todo!
			</p>
			<div className="flex flex-col items-center gap-2 font-bold">
				<p>Welcome to Your ToDo Application</p>
				<p>Stay organized and boost your productivity!</p>
			</div>
			<Link href={"/dash"} className="bg-white text-black p-2 text-xl font-bold rounded-md">Get Started</Link>
		</div>
	)
}

export default Home
