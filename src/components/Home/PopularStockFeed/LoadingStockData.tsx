// components
import Container from "@/components/Containers/Container";

// ui
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from "@/components/ui/table";

const LoadingStockData = () => {
	return (
		<section className="flex justify-center items-center w-full h-full bg-primary">
			<Container>
				<div className=" flex py-10 w-full h-full ">
					<div className="flex justify-center items-center bg-white rounded-4xl p-10 h-full w-full font-extralight">
						<Table className="w-full">
							<TableCaption className="text-xl font-md text-black caption-top">
								Loading market data...
							</TableCaption>
							<TableBody>
								<TableRow className="text-center animate-pulse bg-gray-50">
									<TableCell className=" w-full h-10"></TableCell>
								</TableRow>
								<TableRow className="text-center animate-pulse bg-gray-50">
									<TableCell className=" w-full h-10"></TableCell>
								</TableRow>
								<TableRow className="text-center animate-pulse bg-gray-50">
									<TableCell className=" w-full h-10"></TableCell>
								</TableRow>
								<TableRow className="text-center animate-pulse bg-gray-50">
									<TableCell className=" w-full h-10"></TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default LoadingStockData;
