"use client";

import { useState, useEffect } from "react";
import { User, LogIn, ShieldCheck } from "lucide-react";
import styles from "./UserAuth.module.css";

export default function UserAuth() {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedId = localStorage.getItem("gk_student_id");
    if (!savedId) {
      setShowLogin(true);
    } else {
      setStudentId(savedId);
    }
  }, []);

  const validateId = (id: string) => {
    // Regex: 9-12 characters, only numbers and 'v' or 'V'
    const idRegex = /^[0-9vV]{9,12}$/;
    return idRegex.test(id);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = studentId.trim();
    
    if (validateId(cleanId)) {
      localStorage.setItem("gk_student_id", cleanId);
      setShowLogin(false);
      window.location.reload();
    } else {
      setError("Invalid ID Format! Use 9-12 numbers (e.g., 200412345678 or 951234567v)");
    }
  };

  if (!isMounted || !showLogin) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={48} color="var(--primary)" />
        </div>
        <h2>Student Login</h2>
        <p>Please enter your 9-12 digit National ID or Student ID to continue.</p>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={20} />
            <input 
              type="text" 
              placeholder="e.g. 200412345678 or 951234567v" 
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError(""); // Clear error when typing
              }}
              required
              autoFocus
            />
          </div>
          
          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            <LogIn size={20} />
            <span>Enter Platform</span>
          </button>
        </form>
        
        <p className={styles.footerHint}>Numbers and the letter 'v' only (9-12 characters).</p>
      </div>
    </div>
  );
}
