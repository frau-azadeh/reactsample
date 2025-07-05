import z from "zod";
import { regex } from "zod/v4-mini";

export const signupSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: 'Email is require!' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      { message: 'Email is not valid' }
    ),
    password:z
        .string()
        .min(6,"Your password must 6 character")
})

export type SignupFormData = z.infer<typeof signupSchema>