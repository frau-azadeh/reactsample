import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import bcrypt from "bcryptjs";
import { signupSchema } from "../../lib/validations/auth";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // اعتبارسنجی با zod
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}` },
        { status: 400 },
      );
    }

    const { email, password, name, family } = parsed.data;

    // بررسی وجود ایمیل در DB
    const { data: existingUser, error: findError } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .single();

    // اگر خطایی غیر از نبودن کاربر وجود داشت
    if (findError && findError.code !== "PGRST116") {
      console.error("Error checking existing user:", findError);
      return NextResponse.json(
        { error: "خطا در بررسی کاربر موجود" },
        { status: 500 },
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "کاربر قبلا ثبت نام کرده است" },
        { status: 409 },
      );
    }

    // هش کردن پسورد
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    // درج کاربر جدید
    const { error: insertError } = await supabase.from("user").insert([
      {
        name,
        family,
        email,
        password_hash,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "ثبت نام موفق" }, { status: 201 });
  } catch (error: unknown) {
    if (isError(error)) {
      console.error("Signup error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Signup error: Unknown error", error);
      return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
    }
  }
}
