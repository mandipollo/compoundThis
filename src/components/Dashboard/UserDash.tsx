"use client";

// store
import { useUserStore } from "@/store/userStore";

const UserDash = () => {
	const { name } = useUserStore();
	return (
		<div className=" flex row justify-between py-2 ">
			<h1 className="text-xl">Welcome back {name}</h1>
		</div>
	);
};

export default UserDash;
