'use client'

import { useUser } from '../../hook/useUser'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/auth')
    }
  }, [user, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/auth')
  }

  if (!user) return <p className="text-center mt-20">در حال بارگذاری...</p>

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">خوش آمدید، {user.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        خروج
      </button>
    </div>
  )
}
