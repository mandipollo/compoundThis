import Image from "next/image";

//COMPONENTS
import Container from "../Containers/Container";

const PreviewDashboard = () => {
	return (
		<section className=" flex w-full h-full bg-primary ">
			<div className=" flex justify-center items-center w-full h-full  bg-white rounded-t-4xl">
				<Container>
					<div className="flex flex-col gap-10 py-38  ">
						<div className="flex flex-wrap gap-2 items-center justify-center">
							<div className="w-lg text-center">
								Powerful portfolio tracking software that lets you check your
								investments in one place with award-winning{" "}
								<span className="font-bold"> performance</span>,{" "}
								<span className="font-bold">dividend tracking</span> and{" "}
								<span className="font-bold">tax reporting</span>.
							</div>
						</div>
						<div className="relative w-full h-ful items-center justify-center flex">
							<Image
								className="border shadow-md rounded-md"
								style={{ height: "auto", width: "auto" }}
								width={1100}
								height={1100}
								alt="Dashboard image"
								src={
									"https://res.cloudinary.com/dbg68gzpx/image/upload/v1757108049/dashboard_dipqxm.png"
								}
							/>
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default PreviewDashboard;
