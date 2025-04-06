"use client";

import {Button} from "@/components/ui/button";
import {CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {UserRegisterData} from "@/types/types";
import {useState} from "react";

interface Page1Props {
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	setUserRegistrationData: React.Dispatch<
		React.SetStateAction<UserRegisterData>
	>;
}

interface Errors {
	email: string;
	password: string;
	confirmPassword: string;
}

export const RegisterForm: React.FC<Page1Props> = ({
	setCurrentStep,
	setUserRegistrationData,
}) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errors, setErrors] = useState<Errors>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmitStep1 = async (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: Errors = {
			email: email ? "" : "Email is required",
			password: password ? "" : "Password is required",
			confirmPassword:
				confirmPassword !== password || confirmPassword === ""
					? "Passwords do not match"
					: "",
		};
		console.log(newErrors);
		setErrors(newErrors);

		if (
			!newErrors.email &&
			!newErrors.password &&
			!newErrors.confirmPassword
		) {
			setUserRegistrationData({
				email,
				password,
			});

			setCurrentStep(2);
		}
	};

	return (
		<>
			<CardHeader className="items-center justify-center">
				<Image
					src={"/cobaju_logo.png"}
					alt="Cobaju Logo"
					width={230.58}
					height={72}
					className="object-cover"
				/>
			</CardHeader>
			<CardContent className="text-center">
				<h3 className="font-semibold text-3xl text-primary-dark">
					Welcome,
				</h3>
				<h2 className="text-secondary-grey">
					Create your <span className="font-semibold">Cobaju</span>{" "}
					account now!
				</h2>

				<form className="mt-8" onSubmit={handleSubmitStep1}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								className={cn(
									"h-11",
									errors.email &&
										"border-red-500 focus-visible:ring-red-500"
								)}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm text-left">
									{errors.email}
								</p>
							)}
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								id="password"
								placeholder=""
								className={cn(
									"h-11",
									errors.password &&
										"border-red-500 focus-visible:ring-red-500"
								)}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm text-left">
									{errors.password}
								</p>
							)}
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								type="password"
								id="confirmPassword"
								placeholder=""
								className={cn(
									"h-11",
									errors.confirmPassword &&
										"border-red-500 focus-visible:ring-red-500"
								)}
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-sm text-left">
									{errors.confirmPassword}
								</p>
							)}
						</div>
					</div>

					<Button type="submit" className="mt-10 w-2/3 text-md">
						Next
					</Button>
				</form>

				<p className="text-secondary-grey text-sm mt-8">
					Already have an account?{" "}
					<Link href={"/auth/login"}>
						<span className="underline font-semibold">Log in.</span>
					</Link>
				</p>
			</CardContent>
		</>
	);
};
