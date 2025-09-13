import React from "react";

const FullWidthContainer = ({ children }: { children: React.ReactNode }) => {
	return <section className="flex flex-col h-full w-full">{children}</section>;
};

export default FullWidthContainer;
