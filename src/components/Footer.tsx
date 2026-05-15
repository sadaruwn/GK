"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.logoText}>GK Learning</h2>
            <p className={styles.tagline}>The #1 Platform for Sri Lankan Students.</p>
          </div>
          
          <div className={styles.socials}>
            <a 
              href="https://www.youtube.com/channel/UC6TYUtPYJLIcKIf03AtMvIg?sub_confirmation=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
            >
              <img src="/youtube-icon.png" alt="YouTube" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
            >
              <img src="/facebook-icon.png" alt="Facebook" />
            </a>
            <Link 
              href="/admin" 
              className={styles.socialIcon}
            >
              <img src="/admin-icon.png" alt="Admin Panel" />
            </Link>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} GK Learning. All rights reserved.</p>
          <div className={styles.links}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
