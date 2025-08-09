import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import FinancialStatementBarChart from "./FinancialStatementBarChart";
import IncomeStatementTable from "./IncomeStatementTables";
import BalanceSheetTable from "./BalanceSheetTable";
import CashFlowTable from "./CashFlowTable";

const FinancialAccordion = () => {
	return (
		<Accordion type="multiple" className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Income Statement</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4 text-balance">
					<FinancialStatementBarChart />
					<IncomeStatementTable />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Balance Sheet</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4 text-balance">
					<FinancialStatementBarChart />
					<BalanceSheetTable />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Cash Flow</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4 text-balance">
					<FinancialStatementBarChart />
					<CashFlowTable />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default FinancialAccordion;
