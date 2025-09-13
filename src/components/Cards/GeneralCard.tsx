import Image from "next/image";
// ui
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const GeneralCard = ({
	title,
	image,
	condition,
}: {
	title: string;
	image: string;
	condition: string | undefined;
}) => {
	return (
		<Card className=" border shadow-sm p-4 h-80 gap-4 rounded-md ">
			<CardContent className="relative w-full h-full">
				<Image src={image} fill alt={title} className="inset-0 absolute" />
			</CardContent>
			<CardFooter className="h-32 w-full flex flex-col items-center justify-center">
				<Button variant="link">{title}</Button>
				<span>{condition}</span>
			</CardFooter>
		</Card>
	);
};

export default GeneralCard;
