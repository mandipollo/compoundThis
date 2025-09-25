import React from "react";

const Authlayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="flex flex-col w-full justify-center items-center ">
			<div className="flex flex-col gap-2 min-w-96">{children}</div>
		</section>
	);
};

export default Authlayout;
