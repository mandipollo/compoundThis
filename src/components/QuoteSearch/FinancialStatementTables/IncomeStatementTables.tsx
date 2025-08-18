import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import numberToDispaly from "@/utils/numberFormatter";
import { IncomeStatementInterface } from "./FinancialAccordion";

const IncomeStatementTable = ({
	incomeStatement,
}: {
	incomeStatement: IncomeStatementInterface[];
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>(USD)</TableHead>
					<TableHead className="text-right">
						{incomeStatement[0].date}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{incomeStatement[0].incomeStatement.map(data => (
					<TableRow key={data.dataCode}>
						<TableCell>
							{data.dataCode[0].toUpperCase() + data.dataCode.slice(1)}
						</TableCell>
						<TableCell className="text-right">
							{numberToDispaly(data.value)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default IncomeStatementTable;
