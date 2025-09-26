import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const SelectPortfolio = () => {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a portfolio" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Portfolios</SelectLabel>
					<SelectItem defaultChecked value="CTHis demo">
						CThis demo
					</SelectItem>
					<SelectItem value="Portfolio1">Portfolio1</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectPortfolio;
