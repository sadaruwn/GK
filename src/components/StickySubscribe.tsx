"use client";

import { Youtube } from "lucide-react";
import styles from "./StickySubscribe.module.css";
import { useEffect, useState } from "react";

export default function StickySubscribe() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.stickyBar} glass animate-slide-up`}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <p className={styles.title}>Unlock Daily Secrets!</p>
          <p className={styles.subtitle}>Subscribe to never miss an exam tip.</p>
        </div>
        <div className={styles.officialSubscribe}>
          <div 
            className="g-ytsubscribe" 
            data-channelid="UC6TYUtPYJLIcKIf03AtMvIg" 
            data-layout="full" 
            data-count="default"
          ></div>
        </div>
      </div>
    </div>
  );
}
