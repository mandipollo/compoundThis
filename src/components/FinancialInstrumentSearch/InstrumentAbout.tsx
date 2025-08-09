import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

const InstrumentAbout = () => {
	return (
		<div className="border rounded-md shadow-md p-2 gap-2">
			<h4 className="text-lg py-2">About</h4>
			<div className="flex flex-col gap-2">
				<p className="text-xs">
					Apple Inc. is an American multinational corporation and technology
					company headquartered in Cupertino, California, in Silicon Valley. It
					is best known for its consumer electronics, software, and services.
					Founded in 1976 as Apple Computer Company by Steve Jobs, Steve Wozniak
					and Ronald Wayne, the company was incorporated by Jobs and Wozniak as
					Apple Computer, Inc. the following year. It was renamed Apple Inc. in
					2007 as the company had expanded its focus from computers to consumer
					electronics. Apple is the largest technology company by revenue, with
					US$391.04 billion in the 2024 fiscal year. The company was founded to
					produce and market Wozniak's Apple I personal computer. Its second
					computer, the Apple II, became a best seller as one of the first
					mass-produced microcomputers. Apple introduced the Lisa in 1983 and
					the Macintosh in 1984, as some of the first computers to use a
					graphical user interface and a mouse. By 1985, internal company
					problems led to Jobs leaving to form NeXT, and Wozniak withdrawing to
					other ventures; John Sculley served as long-time CEO for over a
					decade.
				</p>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/person.svg"}
							width={15}
							height={15}
							alt="ceo"
						/>
						<span className="text-xs text-muted-foreground">CEO</span>
					</div>
					<span>Tim Cook</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/calender.svg"}
							width={15}
							height={15}
							alt="ceo"
						/>
						<span className="text-xs text-muted-foreground">FOUNDED</span>
					</div>
					<span>2019</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/location.svg"}
							width={15}
							height={15}
							alt="ceo"
						/>
						<span className="text-xs text-muted-foreground">HEADQUARTERS</span>
					</div>
					<span>Texas, USA</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/website.svg"}
							width={15}
							height={15}
							alt="ceo"
						/>
						<span className="text-xs text-muted-foreground">WEBSITE</span>
					</div>
					<span>Apple.com</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/employees.svg"}
							width={15}
							height={15}
							alt="ceo"
						/>
						<span className="text-xs text-muted-foreground">EMPLOYEES</span>
					</div>
					<span>20,293</span>
				</div>
			</div>
		</div>
	);
};

export default InstrumentAbout;
