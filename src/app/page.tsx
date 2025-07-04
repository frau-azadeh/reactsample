"use client";

import { useUser } from "../hook/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/profile");
    else router.replace("/auth");
  }, [user, router]);

  return null;
}
