import { z } from "zod";

export const LoginFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { message: "Atleast 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contains at least one letter." })
		.regex(/[0-9]/, { message: "Contains at least one number." })
		.trim(),
});

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.regex(/^(?=.*[A-Z]).{8,}$/, {
			message:
				"Contains at least one uppercase letter and have a minimum length of 8 characters.",
		})
		.regex(/[a-zA-Z]/, { message: "Contains at least one letter." })
		.regex(/[0-9]/, { message: "Contains at least one number." })
		.trim(),
});

export type FormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;
