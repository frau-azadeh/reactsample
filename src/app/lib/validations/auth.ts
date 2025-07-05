import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required!" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email is not valid",
    }),
  password: z.string().min(6, "Your password must be at least 6 characters"),
  name: z
    .string()
    .trim()
    .min(1, "Name is too short")
    .max(25, "Name is too long")
    .regex(/^[a-zA-Z]+$/, "Name can only contain letters"),
  family: z
    .string()
    .trim()
    .min(1, "Family name is too short")
    .max(50, "Family name is too long")
    .regex(/^[a-zA-Z]+$/, "Family name can only contain letters"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
