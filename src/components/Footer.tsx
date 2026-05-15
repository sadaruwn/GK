import { Youtube, Facebook, Lock } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.brandLite}>
             <Youtube size={20} color="var(--primary)" />
             <span className={styles.copyright}>&copy; {new Date().getFullYear()} GK Learning. All rights reserved.</span>
          </div>
          
          <div className={styles.socials}>
            <a href="https://www.youtube.com/channel/UC6TYUtPYJLIcKIf03AtMvIg?sub_confirmation=1" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
            <a href="https://www.facebook.com/amarasriherath.lk/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="/admin" title="Admin Panel"><Lock size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
