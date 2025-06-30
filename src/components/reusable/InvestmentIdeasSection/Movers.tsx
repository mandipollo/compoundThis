import React from "react";

const Movers = () => {
	return (
		<div className="flex flex-col gap-2 justify-center items-center w-full border border-gray-400 rounded-md p-4">
			<p className="w-full text-lg">Top daily gainers</p>
			<p>Discover equities with the greatest gains during the trading day</p>
			<ul className="flex flex-col gap-2 w-full">
				<li>
					<div className="flex flex-row justify-between">
						<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
							META
						</p>
						<span>£562</span>
					</div>
					<div className="flex flex-row justify-between">
						<p>META PLATFORM INC</p>
						<span>200%</span>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between">
						<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
							META
						</p>
						<span>£562</span>
					</div>
					<div className="flex flex-row justify-between">
						<p>META PLATFORM INC</p>
						<span>200%</span>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between">
						<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
							META
						</p>
						<span>£562</span>
					</div>
					<div className="flex flex-row justify-between">
						<p>META PLATFORM INC</p>
						<span>200%</span>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between">
						<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
							META
						</p>
						<span>£562</span>
					</div>
					<div className="flex flex-row justify-between">
						<p>META PLATFORM INC</p>
						<span>200%</span>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between">
						<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
							META
						</p>
						<span>£562</span>
					</div>
					<div className="flex flex-row justify-between">
						<p>META PLATFORM INC</p>
						<span>200%</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Movers;
