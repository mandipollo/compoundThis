import React from "react";

// components
import SectionContainer from "@/components/Containers/SectionContainer";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<SectionContainer>
			<div className="flex flex-row gap-2 w-full items-center justify-between">
				<Skeleton className="w-28 h-10"></Skeleton>
				<Skeleton className="w-full h-10"></Skeleton>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="h-40"></Skeleton>
				<Skeleton className="h-40"></Skeleton>
				<Skeleton className="h-40"></Skeleton>
			</div>
			<div className="grid grid-[1fr_2fr]">
				<Skeleton className="h-40"></Skeleton>
				<Skeleton className="h-40"></Skeleton>
			</div>
			<div className="flex border flex-col gap-2 rounded-md w-full h-full">
				<Skeleton className="h-10 w-20"></Skeleton>
				<Skeleton className="h-40 w-full"></Skeleton>
				<Skeleton className="h-40 w-full"></Skeleton>
				<Skeleton className="h-40 w-full"></Skeleton>
				<Skeleton className="h-40 w-full"></Skeleton>
			</div>
		</SectionContainer>
	);
};

export default Loading;
