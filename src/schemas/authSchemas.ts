import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email is required")
			.email("Invalid email address"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.refine(
				(password) => /[A-Z]/.test(password),
				"Password must contain at least one uppercase letter"
			)
			.refine(
				(password) =>
					/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
						password
					),
				"Password must contain at least one special character"
			),
		confirmPassword: z
			.string()
			.min(1, "Must enter confirmation password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
