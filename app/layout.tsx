import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "700"], // Specify the weights you need
	variable: "--font-poppins", // Optional: CSS variable
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable}  antialiased`}>
				<Toaster richColors />
				{children}
			</body>
		</html>
	);
}
