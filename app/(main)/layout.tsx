import Navbar from "./components/navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<Navbar />
				<div className="pt-20">{children}</div>
			</body>
		</html>
	);
}
