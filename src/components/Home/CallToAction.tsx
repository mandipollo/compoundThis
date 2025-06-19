import React from "react";
import Image from "next/image";
import Link from "next/link";
const CallToAction = () => {
	return (
		<div className="flex justify-between border rounded-md p-2 w-2xl">
			<div className="flex flex-row gap-4">
				<div className="w-4 h-4 relative">
					<Image
						src="/compound-interest.svg"
						fill
						alt="compound interest"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				<div>
					<p>Build a watchlist</p>
					<p className="text-xs text-gray-500">
						Sign in to track invesment you care about
					</p>
				</div>
			</div>

			<Link
				href="/auth/login"
				className="bg-primary text-white rounded-md px-6 py-2 "
			>
				Sign in
			</Link>
		</div>
	);
};

export default CallToAction;
