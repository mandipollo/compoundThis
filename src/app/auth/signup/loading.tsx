import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
	return (
		<section>
			<div className="flex flex-col gap-2 border shadow-md rounded-xl p-6">
				<Skeleton className="w-full h-10 rounded-xl" />
				<Skeleton className="w-full h-10 rounded-xl" />
				<Skeleton className="w-full h-10 rounded-xl" />
				<Button></Button>
				<Button variant="outline"></Button>
			</div>
		</section>
	);
};

export default Loading;
