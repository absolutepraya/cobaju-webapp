export interface UserRegisterData {
	email?: string;
	password?: string;
	confirmPassword?: string;
	image_url?: string;
	height?: number;
	height_unit?: "cm" | "in";
	weight?: number;
	weight_unit?: "kg" | "lb";
	bust?: number;
	waist?: number;
	hips?: number;
}
