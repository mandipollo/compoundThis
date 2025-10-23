import Link from "next/link";
//  ui
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const PortfolioTables = () => {
	return (
		<div>
			<Table className="text-xs">
				<TableHeader>
					<TableRow className="bg-accent">
						<TableHead colSpan={2}>PORTFOLIO NAME</TableHead>
						<TableHead>ACCESS LEVEL</TableHead>
						<TableHead>OWNED BY</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>
							<Link href={"/"}>
								<Button
									variant="link"
									className="text-xs font-light text-blue-800"
								>
									CTHis demo
								</Button>
							</Link>
						</TableCell>
						<TableCell>READ ONLY</TableCell>
						<TableCell>CTHis demo </TableCell>
						<TableCell className="text-right">
							<Button className="text-xs  bg-[#004f4a] font-light hover:cursor-pointer">
								View Portfolio settings
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default PortfolioTables;
