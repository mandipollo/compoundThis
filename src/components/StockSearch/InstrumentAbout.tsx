import React from "react";
import { Separator } from "../ui/separator";

const InstrumentAbout = () => {
	return (
		<div className="border rounded-md p-2 gap-2">
			<h4 className="text-lg">About</h4>
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
				<span></span>
			</div>
		</div>
	);
};

export default InstrumentAbout;
