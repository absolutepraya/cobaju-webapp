import {createClient} from "@/utils/supabase/server";
import {UserCircle} from "lucide-react";
import Image from "next/image";

export default async function Navbar() {
	const supabase = createClient();
	const {data: session} = await (await supabase).auth.getUser();

	const user = session?.user;

	return (
		<nav className="flex items-center justify-between z-10 bg-white p-5 px-32 shadow-md fixed w-full">
			<Image
				src="/cobaju_logo.png"
				alt="Logo"
				width={100}
				height={50}
				className="h-10 object-cover w-auto"
			/>

			<div className="flex items-center space-x-2 text-[#515152] cursor-pointer">
				<UserCircle className="h-8 w-auto " />
				<p className="text-md">{user?.email ?? "Sign In"}</p>
			</div>
		</nav>
	);
}
