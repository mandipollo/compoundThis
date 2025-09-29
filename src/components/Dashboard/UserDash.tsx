"use client";

// store
import { useUserStore } from "@/store/userStore";
import { Separator } from "../ui/separator";

const UserDash = () => {
	const { name } = useUserStore();
	return (
		<div className=" flex flex-col gap-2 justify-between py-2 ">
			<h1 className="text-xl">Welcome back {name}</h1>
			<Separator />
		</div>
	);
};

export default UserDash;
