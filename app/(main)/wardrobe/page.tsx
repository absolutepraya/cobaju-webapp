import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {PlusCircle, Search, Trash2} from "lucide-react";
import Image from "next/image";

const Categories = [
	"Shirts",
	"Pants",
	"Dresses",
	"Shoes",
	"Accessories",
	"Outerwear",
];

const Sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const wardrobeData = [
	{
		imgSrc: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/12/5/60106062-0214-4a7e-8149-34b626630098.jpg.webp?ect=4g",
		name: "karakiri - Carol Cable Knit Cardigan",
		size: "L",
	},
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

export default function WardrobePage() {
	return (
		<>
			<Banner />
			<SearchBarComponent />
			<div className="px-32 pt-4">
				<p>Showing Items in your wardrobe:</p>

				<div className="grid grid-cols-4 gap-10 mt-4">
					{wardrobeData.map((item, index) => (
						<div
							key={index}
							className="rounded-lg flex flex-col cursor-pointer"
						>
							<Image
								width={200}
								height={200}
								src={item.imgSrc}
								alt={item.name}
								className="w-full h-auto object-cover rounded-sm"
							/>
							<p className="text-start mt-3 text-primary-dark text-lg h-12 flex items-center">
								{item.name}
							</p>

							<p className="text-gray-500 text-start">
								Size: {item.size}
							</p>
							<p className="text-gray-500 text-start">
								Added: Apr 6
							</p>
							<div className="mt-2 flex gap-2 w-full">
								<div className="w-full">
									<Button className="bg-primary-dark rounded-xl w-full text-white cursor-pointer">
										Try On
									</Button>
								</div>
								<Button className="bg-tertiary-light w-20 rounded-xl hover:bg-tertiary-light/50">
									<Trash2 className="text-black" />
								</Button>
							</div>
						</div>
					))}
				</div>

				<div className="fixed bg-primary-light items-center gap-1 text-white right-10 bottom-14 flex justify-center mt-10 rounded-xl px-4 py-2 cursor-pointer hover:bg-primary-dark transition-all duration-300">
					<PlusCircle className="text-white" />
					Add New Photo
				</div>
			</div>
		</>
	);
}

function Banner() {
	return (
		<div className="w-full h-14 grid grid-cols-3 justify-between font-normal text-sm p-4 px-12 text-white bg-primary-light">
			<p>Enjoy 10% off your first try-on!</p>
			<p>Now available: Instant AI size recommendation!</p>
			<p>
				New: Try-on multiple sizes of the same product in your wardrobe!
			</p>
		</div>
	);
}

// Renamed to avoid export conflict
function SearchBarComponent() {
	return (
		<div className="w-full flex justify-between items-center mt-4 px-32">
			<div className="w-1/3 relative">
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
