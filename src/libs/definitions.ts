import { z } from "zod";

// schemas

export const UsernameSchema = z
	.string()
	.email({ message: "Invalid username" })
	.trim();

export const EmailSchema = z
	.string()
	.email({ message: "Invalid username" })
	.trim();

export const PasswordSchema = z
	.string()
	.regex(/^(?=.*[A-Z]).{8,}$/, {
		message:
			"Contains at least one uppercase letter and have a minimum length of 8 characters.",
	})
	.regex(/[a-zA-Z]/, { message: "Contains at least one letter." })
	.regex(/[0-9]/, { message: "Contains at least one number." })
	.trim();
export const CodeSchema = z
	.string()
	.regex(/^\d{6}$/, { message: "Please enter a valid verification code." });

//////////////
export const ResendVerificationCodeFormSchema = z.object({
	username: UsernameSchema,
});
export const ForgotPasswordFormSchema = z.object({ username: UsernameSchema });

export const LoginFormSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	email: EmailSchema,
	password: PasswordSchema,
});

export const ConfirmSignUpFormSchema = z.object({
	email: EmailSchema,
	code: CodeSchema,
});

export const ConfirmNewPasswordFormSchema = z.object({
	username: UsernameSchema,
	newPassword: PasswordSchema,
	confirmationCode: CodeSchema,
});

// form state

export interface LoginFormState {
	formValidationErrors: { email?: string[]; password?: string[] };
	error: string;
	message: string;
	success: boolean;
}
export interface SignupFormState {
	formValidationErrors: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	error: string;
	message: string;
	success: boolean;
}

export interface ConfirmSignupFormState {
	formValidationErrors: { email: string; code: string };
	error: string;
	message: string;
	success: boolean;
}

export interface ForgotPasswordFormState {
	formValidationError: string;
	error: string;
	success: boolean;
	message: string;
}
export interface ResendVerificationCodeFormState {
	formValidationError: string;
	error: string;
	success: boolean;
	message: string;
}

export interface ConfirmPasswordResetFormState {
	formValidationErrors: {
		username?: string[];
		confirmationCode?: string[];
		newPassword?: string[];
	};
	error: string;
	message?: string;
	success: boolean;
}
