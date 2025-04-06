"use client";

import Image from "next/image";
import {useState} from "react";

const wardrobeData = {
	beforeImg:
		"https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/12/5/60106062-0214-4a7e-8149-34b626630098.jpg.webp?ect=4g",
	afterImg:
		"https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/11/16/77e68c9e-c3c0-4025-8f24-b6e9fe1b4b05.jpg.webp?ect=4g",
	name: "karakiri - Carol Cable Knit Cardigan",
	size: "L",
};

export default function SelectButton() {
	const [isAfter, setIsAfter] = useState(true);
	return (
		<>
			<div className="flex items-center justify-center space-x-2 my-4">
				<div className="relative flex border-2 border-primary-light rounded-full p-[2px] w-48 shadow-md">
					<button
						className={`w-1/2 py-2 rounded-full font-bold cursor-pointer transition-colors ${
							isAfter
								? "bg-primary-light text-white"
								: "bg-transparent text-primary-light"
						}`}
						onClick={() => setIsAfter(true)}
					>
						After
					</button>
					<button
						className={`w-1/2 py-2 rounded-full font-bold cursor-pointer transition-colors ${
							!isAfter
								? "bg-primary-light text-white"
								: "bg-transparent text-primary-light"
						}`}
						onClick={() => setIsAfter(false)}
					>
						Before
					</button>
				</div>
			</div>

			<Image
				src={wardrobeData.beforeImg}
				alt="Image"
				width={1000}
				height={1000}
				className={`h-auto w-[80%] object-cover transition-opacity duration-300 ${
					isAfter ? "block" : "hidden"
				}`}
			/>

			<Image
				src={wardrobeData.afterImg}
				alt="Image"
				width={1000}
				height={1000}
				className={`h-auto w-[80%] object-cover transition-opacity duration-300 ${
					!isAfter ? "block" : "hidden"
				}`}
			/>
		</>
	);
}
