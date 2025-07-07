import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
