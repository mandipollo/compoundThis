"use client";
import { MouseEvent, useCallback, useState, useRef } from "react";

//UTILS
import { throttle } from "@/utils/throttle";

//TODO: EXPAND ON THE CARD DETAILS
const FeatureCard = ({ description }: { description: string }) => {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });

	const onMouseMove = useCallback(
		throttle((e: MouseEvent<HTMLDivElement>) => {
			const card = e.currentTarget;
			const box = card.getBoundingClientRect();
			const x = e.clientX - box.left;
			const y = e.clientY - box.top;
			const centerX = box.width / 2;
			const centerY = box.height / 2;
			const rotateX = (y - centerY) / 15;
			const rotateY = (centerX - x) / 15;

			setRotate({ x: rotateX, y: rotateY });
		}, 100),
		[]
	);

	const onMouseLeave = () => {
		setRotate({ x: 0, y: 0 });
	};

	// video bg
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleMouseEnter = () => {
		videoRef.current?.play();
	};

	return (
		<div
			style={{
				transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
				transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
			}}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			className="card relative h-60  w-full rounded-xl transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
		>
			<div className="relative flex h-full w-full select-none items-center justify-center rounded-lg bg-primaryLight  ">
				{description}
			</div>
		</div>
	);
};

export default FeatureCard;
