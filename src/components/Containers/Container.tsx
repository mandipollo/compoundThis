import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex flex-col w-full max-w-5xl px-10">{children}</div>;
};

export default Container;
