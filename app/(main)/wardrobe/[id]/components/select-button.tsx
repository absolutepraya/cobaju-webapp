"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Loader2, WandSparkles} from "lucide-react";

const wardrobeData = {
	beforeImg: "/before.png",
	afterImg: "/medium.jpg",
	afterImgLarge: "/large.jpg",
	name: "karakiri - Carol Cable Knit Cardigan",
	size: "L",
};

interface SelectButtonProps {
	isAfter: boolean;
	setIsAfter: (isAfter: boolean) => void;
	selectedSize: string;
	isTryOnLoading?: boolean;
	isTryOnCompleted?: boolean;
	handleTryOn?: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
	isAfter,
	setIsAfter,
	selectedSize,
	isTryOnLoading = false,
	isTryOnCompleted = false,
	handleTryOn = () => {},
}) => {
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

			{/* Before image */}
			<Image
				src={wardrobeData.beforeImg}
				alt="Image"
				width={1000}
				height={1000}
				className={`h-full w-auto aspect-contain object-cover transition-opacity duration-300 ${
					!isAfter ? "block" : "hidden"
				}`}
			/>

			{/* Try-On loading indicator */}
			{isTryOnLoading &&
				isAfter &&
				selectedSize === "L" &&
				!isTryOnCompleted && (
					<div className="flex flex-col items-center justify-center h-full w-full">
						<Loader2 className="h-12 w-12 text-primary-light animate-spin mb-4" />
						<p className="text-primary-light font-medium">
							Generating your custom try-on...
						</p>
					</div>
				)}

			{/* After image for size L (after try-on) */}
			{selectedSize === "L" && isAfter && isTryOnCompleted && (
				<Image
					src={wardrobeData.afterImgLarge}
					alt="Try-On Result"
					width={1000}
					height={1000}
					className="h-full w-auto aspect-contain object-cover transition-opacity duration-300"
				/>
			)}

			{/* After image for size L (before try-on) */}
			{selectedSize === "L" &&
				isAfter &&
				!isTryOnLoading &&
				!isTryOnCompleted && (
					<div className="relative h-full w-full flex flex-col items-center justify-center gap-8 font-bold text-xl">
						Data, is not available yet,
						<Button
							className=" bg-primary-light hover:bg-primary rounded-full font-semibold text-lg px-8 py-6 text-white cursor-pointer"
							onClick={handleTryOn}
						>
							<WandSparkles className="text-white mr-2" />
							Try-On Now!
						</Button>
					</div>
				)}

			{/* After image for size S */}
			{selectedSize === "S" && isAfter && (
				<Image
					src={wardrobeData.afterImg}
					alt="Image"
					width={1000}
					height={1000}
					className="h-full w-auto aspect-contain object-cover transition-opacity duration-300"
				/>
			)}

			{/* Unavailable sizes */}
			{selectedSize !== "L" &&
				selectedSize !== "S" &&
				isAfter &&
				!isTryOnLoading && (
					<div className="flex items-center justify-center h-full w-full rounded-lg">
						<p className="text-gray-500">
							Sorry, data not available
						</p>
					</div>
				)}
		</>
	);
};

export default SelectButton;
