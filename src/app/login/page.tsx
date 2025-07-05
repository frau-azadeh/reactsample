'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { signupSchema, SignupFormData } from '../lib/validations/auth';

export default function SmartAuthPage() {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setFormError('');
    setLoading(true);

    // 1. Try to sign in first
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!loginError) {
      router.push('/profile');
      return;
    }

    // 2. If login fails because of invalid credentials, try sign up
    if (loginError.message.toLowerCase().includes('invalid login credentials')) {
      const { error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signupError) {
        setFormError(signupError.message);
      } else {
        router.push('/check-email');
      }
    } else {
      setFormError(loginError.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login / Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded-md p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded-md p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
