import {createClient} from "@/utils/supabase/server";

export async function uploadImage(filePath: string, fileName: string) {
	try {
		const supabase = createClient();
		const base64Data = filePath.replace(/^data:image\/\w+;base64,/, "");

		// Convert Base64 to Buffer
		const fileBuffer = Buffer.from(base64Data, "base64");

		const fileNameFormat = `${fileName}-${Date.now()}.jpg`;
		const {data, error} = await (await supabase).storage
			.from("body-image")
			.upload(fileNameFormat, fileBuffer, {
				contentType: "image/jpeg",
				upsert: true,
			});

		if (error) {
			console.error("Error uploading image:", error);
			return {
				success: false,
				error: error.message,
			};
		}

		// Get the public URL for the uploaded file
		const supabaseInstance = await supabase;
		const {data: publicUrlData} = supabaseInstance.storage
			.from("body-image")
			.getPublicUrl(fileNameFormat);

		return {
			success: true,
			path: data.path,
			fullPath: data.fullPath,
			publicUrl: publicUrlData.publicUrl,
		};
	} catch (err) {
		console.error("Unexpected error:", err);
		return {
			success: false,
			error: "An unexpected error occurred.",
		};
	}
}
