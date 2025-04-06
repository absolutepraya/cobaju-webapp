"use server";
import {createClient} from "@/utils/supabase/server";
import {uploadImage} from "./storage";

export async function login(email: string, password: string) {
	try {
		if (!email || !password) {
			return {
				success: false,
				error: {
					message: "Email and password are required",
					email: email ? "" : "Email is required",
					password: password ? "" : "Password is required",
				},
			};
		}

		const supabase = createClient();

		const {data, error} = await (
			await supabase
		).auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return {
				success: false,
				error: {
					message: error.message,
					email: error.message.includes("email") ? error.message : "",
					password: error.message.includes("password")
						? error.message
						: "",
				},
			};
		}

		if (data?.user) {
			return {
				success: true,
				user: {
					id: data.user.id,
					email: data.user.email,
				},
			};
		}

		return {
			success: false,
			error: {
				message: "Something went wrong. Please try again.",
			},
		};
	} catch (error: unknown) {
		console.error("Login error:", error);
		return {
			success: false,
			error: {
				message: "An unexpected error occurred",
			},
		};
	}
}

export async function register(
	email: string,
	password: string,
	image_url: string,
	height: number,
	weight: number,
	bust: number,
	waist: number,
	hips: number,
	height_unit: "cm" | "in" = "cm",
	weight_unit: "kg" | "lb" = "kg"
) {
	try {
		if (!email || !password) {
			return {
				success: false,
				error: {
					message: "Email, password and full name are required",
					email: email ? "" : "Email is required",
					password: password ? "" : "Password is required",
				},
			};
		}

		const storageResponse = await uploadImage(image_url, email);

		if (!storageResponse.success) {
			return {
				success: false,
				error: {
					message: storageResponse.error,
				},
			};
		}
		console.log("storageResponse", storageResponse);
		image_url = storageResponse.publicUrl ?? "";
		console.log("image_url", image_url);
		const supabase = createClient();

		const {data, error} = await (
			await supabase
		).auth.signUp({
			email,
			password,
			options: {
				data: {
					image_url: image_url,
					height: height,
					weight: weight,
					bust: bust,
					waist: waist,
					hips: hips,
					height_unit: height_unit,
					weight_unit: weight_unit,
				},
			},
		});

		console.log("data", data);
		console.log("error", error);

		if (error) {
			return {
				success: false,
				error: {
					message: error.message,
					email: error.message.includes("email") ? error.message : "",
					password: error.message.includes("password")
						? error.message
						: "",
					fullName: error.message.includes("full name")
						? error.message
						: "",
				},
			};
		}

		if (data?.user) {
			return {
				success: true,
				user: {
					id: data.user.id,
					email: data.user.email,
					image_url,
					height,
					weight,
					bust,
					waist,
					hips,
				},
			};
		}

		return {
			success: false,
			error: {
				message: "Something went wrong. Please try again.",
			},
		};
	} catch (error: unknown) {
		console.error("Register error:", error);
		return {
			success: false,
			error: {
				message: "An unexpected error occurred",
			},
		};
	}
}
