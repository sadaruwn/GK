"use client";

import { useEffect, useState } from "react";
import { Flame, Youtube, Bell } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [streak, setStreak] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedStreak = localStorage.getItem("gk_streak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    } else {
      localStorage.setItem("gk_streak", "1");
      setStreak(1);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Youtube className={styles.logoIcon} size={28} color="var(--primary)" />
          <span className={styles.logoText}>GK Learning</span>
        </div>
        
        <div className={styles.actions}>
          <div className={styles.streakBadge} title="Daily Learning Streak">
            <Flame size={18} color="var(--warning-color)" />
            <span>{streak} Day{streak !== 1 ? 's' : ''}</span>
          </div>
          
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
    </nav>
  );
}
