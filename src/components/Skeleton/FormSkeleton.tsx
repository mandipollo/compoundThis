import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Button } from "../ui/button";

const FormSkeleton = () => {
	return (
		<div className="flex flex-col gap-2 border shadow-md rounded-xl p-6">
			<Skeleton className="w-full h-10 rounded-xl" />
			<Skeleton className="w-full h-10 rounded-xl" />
			<Skeleton className="w-full h-10 rounded-xl" />
			<Button></Button>
			<Button variant="outline"></Button>
		</div>
	);
};

export default FormSkeleton;
