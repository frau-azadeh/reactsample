'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // زمانی که لینک ورود از طریق ایمیل کلیک شده
  useEffect(() => {
    const checkSessionFromUrl = async () => {
      const hash = window.location.hash

      if (hash.includes('access_token')) {
        const params = new URLSearchParams(hash.slice(1))
        const access_token = params.get('access_token')!
        const refresh_token = params.get('refresh_token')!

        const { error } = await supabase.auth.setSession({ access_token, refresh_token })

        if (error) {
          setMessage('❌ خطا در ورود: ' + error.message)
        } else {
          setMessage('✅ ورود موفق! در حال انتقال...')
          router.replace('/profile')
        }
      }
    }

    checkSessionFromUrl()
  }, [router])

  const handleLogin = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth', // آدرس برگشت از ایمیل
      },
    })

    if (error) {
      setMessage('❌ ' + error.message)
    } else {
      setMessage('✅ لینک ورود به ایمیل شما ارسال شد.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">ورود با ایمیل</h2>
        <input
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          disabled={loading || !email}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'در حال ارسال...' : 'ارسال لینک ورود'}
        </button>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  )
}
