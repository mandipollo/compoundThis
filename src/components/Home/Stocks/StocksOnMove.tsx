import React from "react";
import StocksOnMoveListItem from "./StocksOnMoveListItem";

const StocksOnMove = () => {
	return (
		<div className="flex max-w-4xl w-full ">
			<ul className="flex flex-col gap-2 w-full">
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
				<StocksOnMoveListItem />
			</ul>
		</div>
	);
};

export default StocksOnMove;
