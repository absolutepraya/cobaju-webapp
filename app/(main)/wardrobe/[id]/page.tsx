import {redirect} from "next/navigation";

import AllPage from "./components/all-page";

export default async function Page(props: {params: Promise<{id: string}>}) {
	const params = await props.params;
	const id = params.id;

	if (!id) {
		redirect("/wardrobe");
	}

	return <AllPage />;
}
