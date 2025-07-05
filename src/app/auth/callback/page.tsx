"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // صبر می‌کنیم تا Supabase توکن‌های URL رو سشن کنه
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/profile");
      } else {
        // در صورت عدم وجود سشن، منتظر تغییر وضعیت می‌مونیم
        supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            router.push("/profile");
          } else {
            router.push("/login");
          }
        });
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="text-center mt-20">
      <p className="text-gray-600">Finishing sign in...</p>
    </div>
  );
}
