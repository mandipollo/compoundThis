"use client";
import { useUserStore } from "@/store/userStore";
import React from "react";
import { Button } from "../ui/button";

const UserDash = () => {
	const { name } = useUserStore();
	return (
		<div className=" flex row justify-between py-2 ">
			<h1 className="text-xl">Welcome back {name}</h1>
			<Button className="text-xs font-light bg-primary">Add portfolio</Button>
		</div>
	);
};

export default UserDash;
