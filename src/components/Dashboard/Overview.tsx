const Overview = ({ currentValue }: { currentValue: number }) => {
	return (
		<section className="flex flex-row justify-between items-center  ">
			<span className="text-xl underline underline-offset-2 decoration-green-700">
				CThis demo
			</span>
			<div className="flex flex-col">
				<p className="text-xl">GB£{currentValue.toFixed(2)}</p>
				<p className="text-[10px] text-accent-foreground">
					CURRENT PORTFOLIO VALUE
				</p>
			</div>
		</section>
	);
};

export default Overview;
