const Overview = ({ currentValue }: { currentValue: number }) => {
	return (
		<section className="flex flex-row justify-between items-center  ">
			<span className="text-xl">CThis demo</span>
			<span className="flex flex-col text-center">
				<p className="text-xl">GB£{currentValue.toFixed(2)}</p>
				<p className="text-[10px] text-accent-foreground">
					CURRENT PORTFOLIO VALUE
				</p>
			</span>
		</section>
	);
};

export default Overview;
