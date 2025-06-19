import React from "react";
import Image from "next/image";

const CompoundThisLogo = () => {
	return (
		<div className="w-4 h-4  relative">
			<Image
				alt="company logo"
				fill
				className="object-cover"
				src="/logo.svg"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			></Image>
		</div>
	);
};

export default CompoundThisLogo;
