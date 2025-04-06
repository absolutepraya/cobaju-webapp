"use client";
import {IconCheck} from "@tabler/icons-react";
import React, {useState} from "react";

interface SelectSizeAndColorProps {
	selectedSize: string;
	setSelectedSize: (size: string) => void;
}

const SelectSizeAndColor: React.FC<SelectSizeAndColorProps> = ({
	selectedSize,
	setSelectedSize,
}) => {
	const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
	const availableColors = [
		"#ada097",
		"#584a4a",
		"#252a41",
		"#2d0c18",
		"#24671b",
	];
	const [selectedColor, setSelectedColor] = useState<string>("#252a41");
	return (
		<>
			<div className="flex flex-col w-full mb-8">
				<div className="flex items-center mb-2">
					<p className="font-bold text-xl">Color</p>
				</div>

				<div className="flex justify-start gap-3 mt-2">
					{availableColors.map((color) => (
						<button
							key={color}
							className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center ${
								selectedColor === color
									? "ring-2 ring-cpurpledark ring-offset-2"
									: ""
							}`}
							style={{backgroundColor: color}}
							onClick={() => setSelectedColor(color)}
							aria-label={`Color ${color}`}
						>
							{selectedColor === color && (
								<IconCheck size={16} color="white" />
							)}
						</button>
					))}
				</div>
			</div>

			<div className="flex flex-col w-full gap-4">
				<div className="flex flex-row items-center w-full">
					<div className="flex items-center mb-0">
						<p className="font-bold text-xl">Size</p>
					</div>
					<p className="text-cpurpledark text-sm underline ml-3">
						View Size Guide
					</p>
				</div>

				<div className="flex justify-start gap-1">
					{availableSizes.map((size) => (
						<button
							key={size}
							className={`w-16 h-12 py-2 border-gray-200 border-1 rounded-md  text-lg ${
								selectedSize === size
									? "border-primary-dark bg-primary-dark text-white"
									: "text-cgraydark"
							} ${
								size !== "L" && size !== "S"
									? "cursor-not-allowed"
									: "cursor-pointer"
							}`}
							onClick={() => {
								if (size === "L" || size === "S") {
									setSelectedSize(size);
								}
							}}
						>
							{size}
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default SelectSizeAndColor;
