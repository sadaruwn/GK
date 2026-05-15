"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Breadcrumb or title placeholder */}
        <span className={styles.breadcrumb}>Admin / Dashboard</span>
      </div>
      
      <div className={styles.right}>
        <Link href="/" className={styles.viewSiteBtn}>
          <ExternalLink size={18} />
          <span>View Site</span>
        </Link>
        
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img 
              src="/admin-logo.png" 
              alt="Admin" 
              className={styles.headerLogo}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png';
              }}
            />
          </div>
          <span className={styles.name}>Admin</span>
        </div>
      </div>
    </header>
  );
}
