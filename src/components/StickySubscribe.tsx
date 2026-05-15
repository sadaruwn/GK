"use client";

import { Youtube, ExternalLink } from "lucide-react";
import styles from "./StickySubscribe.module.css";
import { useEffect, useState } from "react";

export default function StickySubscribe() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show after a short delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div className={`${styles.stickyBar} glass animate-slide-up`}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <p className={styles.title}>Unlock Daily Secrets!</p>
          <p className={styles.subtitle}>Subscribe to never miss an exam tip.</p>
        </div>
        
        <div className={styles.subscribeActions}>
          {/* Official Google Widget - Great for Desktop */}
          <div className={styles.officialWrapper}>
            <div 
              className="g-ytsubscribe" 
              data-channelid="UC6TYUtPYJLIcKIf03AtMvIg" 
              data-layout="full" 
              data-count="default"
            ></div>
          </div>

          {/* Fallback Button - Essential for Mobile/Slow connections */}
          <a 
            href="https://www.youtube.com/channel/UC6TYUtPYJLIcKIf03AtMvIg?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.fallbackBtn}
          >
            <Youtube size={18} />
            <span>Subscribe Now</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
