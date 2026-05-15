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
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="YouTube" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
            </a>
            <Link
              href="/admin"
              className={styles.socialIcon}
            >
              <img src="/admin-logo.png" alt="Admin Panel" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
