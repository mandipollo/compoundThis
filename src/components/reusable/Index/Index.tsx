import React from "react";
import IndexListItem from "./IndexListItem";

const Index = () => {
	return (
		<section className="flex flex-col gap-2 text-xs">
			<ul className="flex flex-row gap-2 items-center ">
				<li>
					<button>MARKETS</button>
				</li>
				<li>
					<button>US</button>
				</li>
				<li>
					<button>Europe</button>
				</li>
				<li>
					<button>Asia</button>
				</li>
			</ul>
			<ul className="flex flex-row gap-2 h-8 items-center">
				<IndexListItem ticker="S&P 500" change={0.67} />
				<IndexListItem ticker="DOW" change={0.9} />
				<IndexListItem ticker="NASDAQ" change={0.33} />
				<IndexListItem ticker="FTSE 100" change={-0.67} />
			</ul>
		</section>
	);
};

export default Index;
