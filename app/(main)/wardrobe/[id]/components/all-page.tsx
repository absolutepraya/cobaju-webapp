"use client";
import {Separator} from "@/components/ui/separator";
import {StarFilledIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";

import {IconPencil, IconShare3} from "@tabler/icons-react";
import {
	CircleHelp,
	CloudDownload,
	Dot,
	ImageIcon,
	Search,
	ShoppingCart,
	Trash2,
	WandSparkles,
} from "lucide-react";
import Image from "next/image";
import SelectButton from "./select-button";
import SelectSizeAndColor from "./select-size-and-color";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useState} from "react";

const Categories = [
	"Shirts",
	"Pants",
	"Dresses",
	"Shoes",
	"Accessories",
	"Outerwear",
];

const Sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const wardrobeDatas = [
	{
		imgSrc: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2025/2/27/fa8db969-4123-4d20-84df-4e7de982a097.jpg.webp?ect=4g",
		name: "karakiri - Carol Cable Knit Cardigan",
		size: "XL",
	},
	{
		imgSrc: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/11/16/77e68c9e-c3c0-4025-8f24-b6e9fe1b4b05.jpg.webp?ect=4g",
		name: "Karakiri - Cleo Top | Cardigan",
		size: "S",
	},
];

const wardrobeData = {
	imgSrc: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/12/5/60106062-0214-4a7e-8149-34b626630098.jpg.webp?ect=4g",
	name: "karakiri - Carol Cable Knit Cardigan",
	size: "L",
};

export default function AllPage() {
	const [isAfter, setIsAfter] = useState(true);
	const [selectedSize, setSelectedSize] = useState<string>("S");
	const [isTryOnLoading, setIsTryOnLoading] = useState(false);
	const [isTryOnCompleted, setIsTryOnCompleted] = useState(false);

	const handleTryOn = () => {
		if (selectedSize === "L" && !isTryOnCompleted) {
			setIsTryOnLoading(true);
			setIsAfter(true);

			// Simulate loading time
			setTimeout(() => {
				setIsTryOnLoading(false);
				setIsTryOnCompleted(true);
			}, 2000);
		}
	};

	return (
		<div className="grid grid-cols-2 h-screen max-h-screen -mt-20 pt-20">
			<div className="bg-[#E6E5E3] relative h-screen flex flex-col items-center gap-4 justify-start p-2 -mt-20 pt-20">
				<SelectButton
					isAfter={isAfter}
					setIsAfter={setIsAfter}
					selectedSize={selectedSize}
					isTryOnLoading={isTryOnLoading}
					isTryOnCompleted={isTryOnCompleted}
					handleTryOn={handleTryOn}
				/>
				<div className="w-full flex h-10 m-4 px-4 mt-auto justify-between">
					<div className="bg-white w-auto gap-2 px-4 text-sm shadow-md text-primary-dark tracking-widest flex items-center justify-between rounded-full">
						<p className="tracking-normal">
							Height:{" "}
							<span className="font-semibold">165 CM</span>
						</p>
						<p className="tracking-normal">
							Weight:
							<span className="font-semibold"> 50 KG</span>
						</p>
						<div className="flex font-semibold items-center justify-center">
							<IconPencil className="text-black" />
							EDIT
						</div>
					</div>

					<div className="bg-white w-auto gap-5 px-4 h-12 text-sm shadow-md text-primary-dark tracking-widest flex items-center justify-between rounded-full">
						<IconShare3 />
						<ImageIcon />
						<CloudDownload />
						<CircleHelp />
					</div>
				</div>
			</div>
			<div className="h-full flex flex-col overflow-hidden w-full">
				<SearchBar />
				<Separator className="my-4" />

				<div className="px-4 overflow-y-scroll flex-1 w-full">
					<div className="">
						<p className="text-secondary-grey">Tops</p>
						<h1 className="text-primary-dark text-4xl font-bold h-20 flex items-center">
							{wardrobeData.name}
						</h1>

						<div className="flex gap-1 items-center">
							<p className="text-secondary-grey">1,238 Sold</p>
							<Dot className="text-gray-200" />
							<StarFilledIcon className="text-yellow-400" />
							<p>5.0</p>
						</div>

						<div className="mt-4">
							<SelectSizeAndColor
								selectedSize={selectedSize}
								setSelectedSize={setSelectedSize}
							/>
						</div>

						<div className="font-bold text-3xl mt-4">
							<p>Rp 369.000</p>
						</div>

						<div className="flex w-full gap-4 mt-4">
							<Button
								className={`rounded-full font-semibold text-lg w-36 h-12 text-white cursor-pointer ${
									selectedSize === "L" && !isTryOnCompleted
										? "bg-primary-light hover:bg-primary"
										: "bg-gray-400 hover:bg-gray-500"
								}`}
								onClick={handleTryOn}
								disabled={
									selectedSize !== "L" || isTryOnCompleted
								}
							>
								<WandSparkles className="text-white" />
								{isTryOnLoading ? "Loading..." : "Try-On!"}
							</Button>
							<Button className="rounded-full font-semibold text-lg w-38 h-12 text-white cursor-pointer">
								<ShoppingCart className="text-white" />
								Buy Now!
							</Button>
							<Button className="rounded-full bg-transparent border-gray-600 border-2 h-full aspect-square hover:bg-transparent cursor-pointer">
								<Trash2 className="text-gray-600 text-2xl" />
							</Button>
						</div>

						<Separator className="my-6" />

						<p className="font-bold text-lg">
							Try on other clothing
						</p>

						<div className="flex gap-8 w-full overflow-x-auto pb-4 mt-4 mb-8">
							{wardrobeDatas.map((item, index) => (
								<div
									key={index}
									className="rounded-lg flex-shrink-0 flex flex-col cursor-pointer w-40"
								>
									<Image
										width={200}
										height={200}
										src={item.imgSrc}
										alt={item.name}
										className="w-full h-auto object-cover rounded-sm"
									/>
									<p className="text-start mt-2 tracking-tighter text-primary-dark text-md h-12 flex items-center">
										{item.name}
									</p>

									<p className="text-gray-500 text-start">
										Size: {item.size}
									</p>
									<p className="text-gray-500 text-start">
										Added: Apr 6
									</p>
									<div className="mt-1 flex gap-2 w-full">
										<p className="font-bold">Rp 369.000</p>
									</div>

									<div className="flex gap-1 items-center text-sm">
										<p className="text-secondary-grey">
											1,238 Sold
										</p>
										<Dot className="text-gray-200" />
										<StarFilledIcon className="text-yellow-400" />
										<p>5.0</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function SearchBar() {
	return (
		<div className="w-full flex justify-between items-center gap-4 mt-4 px-4">
			<div className="w-full relative">
				<Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />

				<Input
					className="w-full ps-12 rounded-full"
					placeholder="Search clothing or brand..."
				/>
			</div>

			<div className="flex gap-4">
				<Select>
					<SelectTrigger className="w-[120px] bg-secondary-light">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Categories</SelectLabel>
							{Categories.map((category) => (
								<SelectItem
									key={category}
									value={category}
									className="text-sm"
								>
									{category}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select>
					<SelectTrigger className="w-[120px] bg-secondary-light">
						<SelectValue placeholder="Size" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sizes</SelectLabel>
							{Sizes.map((category) => (
								<SelectItem
									key={category}
									value={category}
									className="text-sm"
								>
									{category}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select>
					<SelectTrigger className="w-[170px] bg-secondary-light">
						<SelectValue placeholder="Sort by Newest" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sort By</SelectLabel>
							<SelectItem value="newest" className="text-sm">
								Newest
							</SelectItem>
							<SelectItem value="oldest" className="text-sm">
								Oldest
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
