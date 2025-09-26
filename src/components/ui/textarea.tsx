import * as React from "react";

import { cn } from "@/libs/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-neutral-200 placeholder:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-blue-500 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 dark:bg-neutral-200/30 flex field-sizing-content min-h-46 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
