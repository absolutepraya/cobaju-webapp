"use client";
import {login} from "@/app/actions/auth";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({email: "", password: ""});
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", {email, password});
		const newErrors = {
			email: email ? "" : "Email is required",
			password: password ? "" : "Password is required",
		};

		setErrors(newErrors);

		if (!newErrors.email && !newErrors.password) {
			console.log("Form submitted:", {email, password});

			const response = await login(email, password);
			console.log("response", response);
			if (response.success) {
				toast.success("Login successful!");
				router.push("/wardrobe");
			} else {
				toast.error(response.error?.message);
				setErrors({
					email: response.error?.email || "",
					password: response.error?.password || "",
				});
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<Card className="mx-auto max-w-140 w-full py-8">
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
						Welcome Back
					</h3>
					<h2 className="text-secondary-grey">
						Log in to your{" "}
						<span className="font-semibold">Cobaju</span> account
					</h2>

					<form className="mt-8" onSubmit={handleSubmit}>
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								{errors.password && (
									<p className="text-red-500 text-sm text-left">
										{errors.password}
									</p>
								)}
							</div>
						</div>

						<div className="w-full flex justify-end mt-2">
							<Link
								href={"/auth/register"}
								className="underline text-sm"
							>
								Forgot your password?
							</Link>
						</div>

						<Button type="submit" className="mt-10 w-2/3 text-md">
							Log In
						</Button>
					</form>

					<p className="text-secondary-grey text-sm mt-8">
						Don&apos;t have an account?{" "}
						<Link href={"/auth/register"}>
							<span className="underline font-semibold">
								Sign Up.
							</span>
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
