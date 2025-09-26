import SelectPortfolio from "./SelectPortfolio";

const Overview = () => {
	return (
		<section className="flex flex-row justify-between items-center  ">
			<SelectPortfolio />
			<span className="flex flex-col text-center">
				<p className="text-xl">660,649.87</p>
				<p className="text-[10px] text-accent-foreground">
					CURRENT PORTFOLIO VALUE
				</p>
			</span>
		</section>
	);
};

export default Overview;
