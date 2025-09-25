import React from "react";

// components
import SectionContainer from "@/components/Containers/SectionContainer";
import Container from "@/components/Containers/Container";

//ui
import { Loader2Icon } from "lucide-react";

const Loading = () => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<Loader2Icon className="animate-spin" />;
		</div>
	);
};

export default Loading;
