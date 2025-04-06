"use client";
import {Button} from "@/components/ui/button";
import {CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {UserRegisterData} from "@/types/types";
import {useForm} from "@mantine/form";
import {RegisterStepper} from "./register-stepper";
import {useState} from "react";

interface Page1Props {
	onSubmit: (data: UserRegisterData) => void;
}

interface UnitSelectorProps {
	unit1: string;
	unit2: string;
	selectedUnit: string;
	onSelectUnit: (unit: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
	unit1,
	unit2,
	selectedUnit,
	onSelectUnit,
}) => {
	return (
		<span className="flex items-center rounded-e-lg border border-input relative w-36 text-center justify-between px-5 gap-4 text-sm bg-[#F6F6F6]">
			<span
				className={cn(
					"cursor-pointer",
					selectedUnit === unit1 && "font-semibold text-primary-dark"
				)}
				onClick={() => onSelectUnit(unit1)}
			>
				{unit1}
			</span>
			<div className="w-[1.5px] h-1/2 bg-gray-300 absolute right-1/2 translate-x-1/2"></div>
			<span
				className={cn(
					"cursor-pointer",
					selectedUnit === unit2 && "font-semibold text-primary-dark"
				)}
				onClick={() => onSelectUnit(unit2)}
			>
				{unit2}
			</span>
		</span>
	);
};

export const MeasureForm: React.FC<Page1Props> = ({onSubmit}) => {
	const [heightUnit, setHeightUnit] = useState<string>("cm");
	const [weightUnit, setWeightUnit] = useState<string>("kg");

	const form = useForm({
		initialValues: {
			height: "",
			weight: "",
			bust: "",
			waist: "",
			hips: "",
		},
		validate: {
			height: (value) => (!value ? "Height is required" : null),
			weight: (value) => (!value ? "Weight is required" : null),
		},
	});

	const handleSubmitMeasurements = (values: typeof form.values) => {
		// Convert string values to numbers or undefined where applicable
		const numericValues = {
			height: values.height ? Number(values.height) : undefined,
			weight: values.weight ? Number(values.weight) : undefined,
			bust: values.bust ? Number(values.bust) : undefined,
			waist: values.waist ? Number(values.waist) : undefined,
			hips: values.hips ? Number(values.hips) : undefined,
		};

		onSubmit(numericValues);
	};

	return (
		<>
			<CardHeader className="items-center justify-center w-full">
				<Image
					src={"/cobaju_logo.png"}
					alt="Cobaju Logo"
					width={230.58}
					height={72}
					className="object-cover w-40"
				/>
			</CardHeader>
			<CardContent className="text-center -mt-4">
				<RegisterStepper currentStep={3} />

				<h3 className="font-semibold text-3xl text-primary-dark mt-6">
					Enter Your Body Measurements
				</h3>
				<h2 className="text-secondary-grey px-12">
					This helps us generate the most accurate virtual try-on for
					you.
				</h2>

				<form
					className="mt-8"
					onSubmit={form.onSubmit(handleSubmitMeasurements)}
				>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="height">Height *</Label>
							<div className="relative flex">
								<Input
									id="height"
									type="number"
									placeholder="Enter Height"
									className={cn(
										"h-11 -me-px z-10 rounded-e-none",
										form.errors.height &&
											"border-red-500 focus-visible:ring-red-500"
									)}
									{...form.getInputProps("height")}
								/>
								<UnitSelector
									unit1="cm"
									unit2="in"
									selectedUnit={heightUnit}
									onSelectUnit={setHeightUnit}
								/>
							</div>
							{form.errors.height && (
								<p className="text-red-500 text-sm text-left">
									{form.errors.height}
								</p>
							)}
						</div>

						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="weight">Weight *</Label>
							<div className="relative flex">
								<Input
									id="weight"
									type="number"
									placeholder="Enter Weight"
									className={cn(
										"h-11 -me-px z-10 rounded-e-none",
										form.errors.weight &&
											"border-red-500 focus-visible:ring-red-500"
									)}
									{...form.getInputProps("weight")}
								/>
								<UnitSelector
									unit1="kg"
									unit2="lbs"
									selectedUnit={weightUnit}
									onSelectUnit={setWeightUnit}
								/>
							</div>
							{form.errors.weight && (
								<p className="text-red-500 text-sm text-left">
									{form.errors.weight}
								</p>
							)}
						</div>

						<div className="flex flex-col space-y-1.5">
							<div className="grid grid-cols-3 gap-8">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="bust">Bust</Label>
									<div className="relative flex">
										<Input
											id="bust"
											type="number"
											placeholder="Optional"
											className={cn("h-11")}
											{...form.getInputProps("bust")}
										/>
									</div>
								</div>

								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="waist">Waist</Label>
									<div className="relative flex">
										<Input
											id="waist"
											type="number"
											placeholder="Optional"
											className={cn("h-11")}
											{...form.getInputProps("waist")}
										/>
									</div>
								</div>

								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="hips">Hips</Label>
									<div className="relative flex">
										<Input
											id="hips"
											type="number"
											placeholder="Optional"
											className={cn("h-11")}
											{...form.getInputProps("hips")}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Button type="submit" className="mt-8 w-2/3 text-md">
						Continue
					</Button>
				</form>
			</CardContent>
		</>
	);
};
