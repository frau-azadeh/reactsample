"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "../lib/validations/auth";

export default function SignupPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "خطایی رخ داده است");
        return;
      }

      setSuccessMessage("ثبت نام با موفقیت انجام شد! لطفا وارد شوید.");
    } catch (error) {
      setServerError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md">
      <h1 className="text-2xl mb-6 font-bold text-center">ثبت نام</h1>

      {serverError && <p className="mb-4 text-red-600">{serverError}</p>}
      {successMessage && <p className="mb-4 text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-1 font-semibold">ایمیل</label>
        <input
          type="email"
          {...register("email")}
          className="w-full mb-3 p-2 border rounded"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="mb-2 text-red-600">{errors.email.message}</p>
        )}

        <label className="block mb-1 font-semibold">رمز عبور</label>
        <input
          type="password"
          {...register("password")}
          className="w-full mb-3 p-2 border rounded"
          placeholder="رمز عبور حداقل 6 کاراکتر"
        />
        {errors.password && (
          <p className="mb-2 text-red-600">{errors.password.message}</p>
        )}

        <label className="block mb-1 font-semibold">نام</label>
        <input
          type="text"
          {...register("name")}
          className="w-full mb-3 p-2 border rounded"
          placeholder="نام"
        />
        {errors.name && (
          <p className="mb-2 text-red-600">{errors.name.message}</p>
        )}

        <label className="block mb-1 font-semibold">نام خانوادگی</label>
        <input
          type="text"
          {...register("family")}
          className="w-full mb-3 p-2 border rounded"
          placeholder="نام خانوادگی"
        />
        {errors.family && (
          <p className="mb-2 text-red-600">{errors.family.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "در حال ارسال..." : "ثبت نام"}
        </button>
      </form>
    </main>
  );
}
