"use client";

import { useState, useEffect } from "react";
import { Save, ShieldCheck, Key, Eye, EyeOff, Loader2 } from "lucide-react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchCurrentPassword();
  }, []);

  const fetchCurrentPassword = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();

      if (data) setPassword(data.value);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ key: 'admin_password', value: password }, { onConflict: 'key' });

      if (error) throw error;
      setMessage({ type: "success", text: "Admin password updated successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update password. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} size={40} />
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Settings</h1>
        <p className={styles.subtitle}>Manage your administrative security and platform preferences.</p>
      </div>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <ShieldCheck size={24} className={styles.cardIcon} />
            <div className={styles.headerInfo}>
              <h3>Security Settings</h3>
              <p>Change your admin access password</p>
            </div>
          </div>

          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Admin Access Password</label>
              <div className={styles.inputWrapper}>
                <Key className={styles.inputIcon} size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password..."
                  required
                />
                <button 
                  type="button" 
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className={styles.inputHint}>This password is required to access the admin dashboard.</p>
            </div>

            {message.text && (
              <div className={`${styles.message} ${styles[message.type]}`}>
                {message.text}
              </div>
            )}

            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className={styles.spinnerSmall} size={18} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Password</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className={styles.infoCard}>
          <h3>Security Tips</h3>
          <ul className={styles.tipsList}>
            <li>Use a mix of letters, numbers, and symbols.</li>
            <li>Don't use easy passwords like '123456'.</li>
            <li>Change your password regularly for better security.</li>
            <li>If you forget this password, you can reset it via Supabase Dashboard.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
