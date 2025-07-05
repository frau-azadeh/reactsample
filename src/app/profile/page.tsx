"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUserEmail(session.user.email ?? null);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/login");
        } else {
          setUserEmail(session.user.email ?? null);
        }
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Welcome, {userEmail}</p>
      <button
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
