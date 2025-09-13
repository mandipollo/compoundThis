import React from "react";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col w-full h-full pt-8 pb-2 pr-2">{children}</div>
	);
};

export default SectionContainer;
