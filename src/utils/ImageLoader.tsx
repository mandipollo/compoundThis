import Image from "next/image";

const imageLoader = ({
	src,
	width,
	quality,
}: {
	src: string;
	width: number;
	quality?: number | undefined;
}) => {
	return `${src}?w=${width}&q=${quality || 75}`;
};

export default function MyImage({
	src,
	title,
	width,
	height,
}: {
	src: string;
	title: String;
	width: number;
	height: number;
}) {
	return (
		<Image
			className="aspect-square rounded-md"
			loader={imageLoader}
			src={src}
			alt={`Image of ${title}`}
			width={width}
			height={height}
		/>
	);
}
