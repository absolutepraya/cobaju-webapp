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
	title: "Cobaju: AI Generation Try-on!",
	description: "Now available: Instant AI size recommendation!",
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
