// financial statement

import { BalanceSheet } from "./BalanceSheet.type";
import { Cashflow } from "./Cashflow.type";
import { IncomeStatement } from "./IncomeStatement.type";

export interface FormattedBalanceSheet {
	fiscal_year: string;
	fiscal_period: string;
	balance_sheet: BalanceSheet;
}

export interface FormattedIncomeStatement {
	fiscal_year: string;
	fiscal_period: string;
	income_statement: IncomeStatement;
}

export interface FormattedCashflow {
	fiscal_year: string;
	fiscal_period: string;
	cash_flow: Cashflow;
}

export interface FormattedFinancialStatementData {
	income_statement: FormattedIncomeStatement[];
	balance_sheet: FormattedBalanceSheet[];
	cash_flow: FormattedCashflow[];
}
