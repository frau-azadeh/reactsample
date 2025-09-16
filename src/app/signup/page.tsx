"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { SignupFormData, signupSchema } from "../lib/validations/auth";
import { LoginFormData, loginSchema } from "../lib/validations/loginSchema";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  // فرم ثبت نام
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup, isSubmitting: isSubmittingSignup },
    reset: resetSignup,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // فرم ورود
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitSignup = async (data: SignupFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "خطایی رخ داده است");
        return;
      }

      setSuccessMessage("ثبت نام با موفقیت انجام شد! لطفا وارد شوید.");
      setIsSignup(false);
      resetSignup();
    } catch {
      setServerError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
    }
  };

  const onSubmitLogin = async (data: LoginFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "خطایی رخ داده است");
        return;
      }

      router.push("/profile");
    } catch {
      setServerError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md">
      <h1 className="text-2xl mb-6 font-bold text-center">
        {isSignup ? "ثبت نام" : "ورود"}
      </h1>

      {serverError && <p className="mb-4 text-red-600">{serverError}</p>}
      {successMessage && (
        <p className="mb-4 text-green-600">{successMessage}</p>
      )}

      {isSignup ? (
        <form onSubmit={handleSubmitSignup(onSubmitSignup)} noValidate>
          <label className="block mb-1 font-semibold">ایمیل</label>
          <input
            type="email"
            {...registerSignup("email")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="example@mail.com"
          />
          {errorsSignup.email && (
            <p className="mb-2 text-red-600">{errorsSignup.email.message}</p>
          )}

          <label className="block mb-1 font-semibold">رمز عبور</label>
          <input
            type="password"
            {...registerSignup("password")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="رمز عبور"
          />
          {errorsSignup.password && (
            <p className="mb-2 text-red-600">{errorsSignup.password.message}</p>
          )}

          <label className="block mb-1 font-semibold">نام</label>
          <input
            type="text"
            {...registerSignup("name")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="نام"
          />
          {errorsSignup.name && (
            <p className="mb-2 text-red-600">{errorsSignup.name.message}</p>
          )}

          <label className="block mb-1 font-semibold">نام خانوادگی</label>
          <input
            type="text"
            {...registerSignup("family")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="نام خانوادگی"
          />
          {errorsSignup.family && (
            <p className="mb-2 text-red-600">{errorsSignup.family.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmittingSignup}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmittingSignup ? "در حال ارسال..." : "ثبت نام"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin(onSubmitLogin)} noValidate>
          <label className="block mb-1 font-semibold">ایمیل</label>
          <input
            type="email"
            {...registerLogin("email")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="example@mail.com"
          />
          {errorsLogin.email && (
            <p className="mb-2 text-red-600">{errorsLogin.email.message}</p>
          )}

          <label className="block mb-1 font-semibold">رمز عبور</label>
          <input
            type="password"
            {...registerLogin("password")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="رمز عبور"
          />
          {errorsLogin.password && (
            <p className="mb-2 text-red-600">{errorsLogin.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmittingLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmittingLogin ? "در حال ارسال..." : "ورود"}
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-sm">
        {isSignup ? (
          <>
            حساب دارید؟{" "}
            <button
              onClick={() => {
                setIsSignup(false);
                setServerError(null);
                setSuccessMessage(null);
                resetSignup();
                resetLogin();
              }}
              className="text-blue-600 hover:underline"
            >
              ورود
            </button>
          </>
        ) : (
          <>
            ثبت نام نکرده‌اید؟{" "}
            <button
              onClick={() => {
                setIsSignup(true);
                setServerError(null);
                setSuccessMessage(null);
                resetSignup();
                resetLogin();
              }}
              className="text-blue-600 hover:underline"
            >
              ثبت نام کنید
            </button>
          </>
        )}
      </p>
    </main>
  );
}
