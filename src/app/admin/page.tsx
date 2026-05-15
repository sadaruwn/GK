"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /admin to /admin/questions automatically
    router.replace("/admin/questions");
  }, [router]);

  return (
    <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
      Redirecting to Questions...
    </div>
  );
}
