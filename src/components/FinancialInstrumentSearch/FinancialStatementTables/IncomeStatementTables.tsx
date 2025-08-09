import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const invoices = [
	{
		heading: "Revenue",
		amount: "22.50B",
		yyChange: "-11%",
	},
	{
		heading: "Operating expenses",
		amount: "2.96B",
		yyChange: "12%",
	},
	{
		heading: "Net income",
		amount: "1.17B",
		yyChange: "-34.23%",
	},
	{
		heading: "Net profite margin",
		amount: "5.21",
		yyChange: "27%",
	},
	{
		heading: "Earning per share",
		amount: "0.4",
		yyChange: "9%",
	},
	{
		heading: "EBITDA",
		amount: "2.36B",
		yyChange: "19.2%",
	},
	{
		heading: "Effective tax rate",
		amount: "23.17%",
		yyChange: "-",
	},
];

const IncomeStatementTable = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>(USD)</TableHead>
					<TableHead>JUNE 2025</TableHead>
					<TableHead className="text-right">Y/Y CHANGE</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map(invoice => (
					<TableRow key={invoice.heading}>
						<TableCell>{invoice.heading}</TableCell>
						<TableCell>{invoice.amount}</TableCell>
						<TableCell className="text-right">{invoice.yyChange}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default IncomeStatementTable;
