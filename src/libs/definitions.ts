import { z } from "zod";

// schemas
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

export const ConfirmFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	code: z
		.string()
		.regex(/^\d{6}$/, { message: "Please enter a valid verification code ." }),
});

export const ForgotPasswordFormSchema = z.object({
	username: z.string().email({ message: "Invalid username" }).trim(),
});

export const ConfirmNewPasswordFormSchema = z.object({
	username: z.string().email({ message: "Please enter a valid email." }).trim(),
	newPassword: z
		.string()
		.regex(/^(?=.*[A-Z]).{8,}$/, {
			message:
				"Contains at least one uppercase letter and have a minimum length of 8 characters.",
		})
		.regex(/[a-zA-Z]/, { message: "Contains at least one letter." })
		.regex(/[0-9]/, { message: "Contains at least one number." })
		.trim(),
	confirmationCode: z
		.string()
		.regex(/^\d{6}$/, { message: "Please enter a valid verification code ." }),
});

// form state
export interface FormState {
	errors: { name?: string[]; email?: string[]; password?: string[] };
	message?: string;
	success: boolean;
}

export interface ConfirmSignupFormState {
	errors: { email: string; code: string; error: string };
	message: string;
	success: boolean;
}

export interface ForgotPasswordFormState {
	error: string;
	success: boolean;
	message: string;
}

export interface confirmPasswordResetFormState {
	formValidationErrors: {
		username?: string[];
		confirmationCode?: string[];
		newPassword?: string[];
	};
	error: string;
	message?: string;
	success: boolean;
}
