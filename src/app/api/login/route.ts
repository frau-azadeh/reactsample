import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 },
      );
    }

    // جستجوی کاربر با ایمیل
    const { data: user, error } = await supabase
      .from("user") // نام جدول شما (طبق کد شما "user")
      .select("id, email, password_hash, name, family")
      .eq("email", email)
      .single();

    if (error) {
      // اگر کاربر پیدا نشد یا خطا
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    // بررسی پسورد با bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    // موفقیت: می‌تونی اینجا توکن JWT یا سشن بسازی (در این نمونه فقط اطلاعات می‌فرستم)
    return NextResponse.json(
      {
        message: "ورود موفقیت‌آمیز بود",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          family: user.family,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
