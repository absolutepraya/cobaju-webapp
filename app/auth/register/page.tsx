"use client";
import {UserRegisterData} from "@/types/types";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {RegisterForm} from "./components/register-form";
import {Card} from "@/components/ui/card";
import {TakePhoto} from "./components/take-photo";
import {MeasureForm} from "./components/measure-form";
import {toast} from "sonner";
import {register} from "@/app/actions/auth";

export default function LoginPage() {
	const [userRegistrationData, setUserRegistrationData] =
		useState<UserRegisterData>({});
	const [currentStep, setCurrentStep] = useState(1);
	const router = useRouter();

	const onSubmit = async (data: UserRegisterData) => {
		console.log("Submitting data:", data);

		const regisData = {
			...userRegistrationData,
			...data,
		};

		console.log("measurements", regisData);

		// Call server action to register user
		toast.promise(
			() =>
				register(
					regisData.email || "",
					regisData.password || "",
					regisData.image_url || "",
					regisData.height || 0,
					regisData.weight || 0,
					regisData.bust || 0,
					regisData.waist || 0,
					regisData.hips || 0,
					regisData.height_unit || "cm",
					regisData.weight_unit || "kg"
				),
			{
				loading: "Registering...",
				success: (data) => {
					if (data.success) {
						router.push("/");
						return "Registration successful!";
					} else {
						throw new Error(data.error?.message);
					}
				},
				error: (error) => {
					console.error("Registration error:", error);
					return (
						error.message ||
						"An error occurred during registration."
					);
				},
			}
		);
	};

	const stepsComponent = [
		<RegisterForm
			key={1}
			setCurrentStep={setCurrentStep}
			setUserRegistrationData={setUserRegistrationData}
		/>,
		<TakePhoto
			key={2}
			setCurrentStep={setCurrentStep}
			setUserRegistrationData={setUserRegistrationData}
		/>,
		<MeasureForm key={3} onSubmit={onSubmit} />,
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
			<Card className="mx-auto max-w-140 w-full py-8">
				{stepsComponent[currentStep - 1]}
			</Card>
		</div>
	);
}
