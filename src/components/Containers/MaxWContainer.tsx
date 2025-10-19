import React from "react";

const MaxWContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex flex-col w-full max-w-7xl">{children}</div>;
};

export default MaxWContainer;
