"use client";
import { useUserStore } from "@/store/userStore";
import React from "react";

const UserDash = () => {
	const { name } = useUserStore();
	return (
		<div className=" flex py-2 ">
			<h1 className="text-xl">Welcome back {name}</h1>
		</div>
	);
};

export default UserDash;
