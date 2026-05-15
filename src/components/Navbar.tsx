"use client";

import { useEffect, useState } from "react";
import { Youtube } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            <img 
              src="/admin-logo.png" 
              alt="GK Learning Logo" 
              className={styles.logoImage}
              style={{ width: 48, height: 48, objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png';
              }}
            />
            <span className={styles.logoText}>GK Learning</span>
          </a>
          
          <div className={styles.navLinks}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/history" className={styles.navLink}>History</a>
          </div>
        </div>
        
        <div className={styles.actions}>
          <div className={styles.subscribeWrapper}>
            {/* Desktop Widget */}
            <div className={styles.officialSubscribe}>
              <div 
                className="g-ytsubscribe" 
                data-channelid="UC6TYUtPYJLIcKIf03AtMvIg" 
                data-layout="default" 
                data-count="default"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
