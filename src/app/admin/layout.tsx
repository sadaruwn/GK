"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import styles from "./layout.module.css";
import { supabase } from "@/lib/supabase";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Database එකෙන් password එක ලබා ගැනීම
      const { data, error: dbError } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (dbError) throw dbError;

      const correctPassword = data?.value || "admin123";

      if (password === correctPassword) {
        sessionStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Database connection error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginBox}>
          <div className={styles.lockIcon}><Lock size={40} /></div>
          <h2>Admin Login</h2>
          <p>Enter your password to manage GK Learning</p>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
                autoFocus
              />
              <button 
                type="button" 
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {error && <p className={styles.errorText}>{error}</p>}
            
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? "Checking..." : "Login to Admin"}
            </button>
          </form>
          
          <p className={styles.mobileHint}>Mobile users: Ensure your first letter isn't auto-capitalized.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
