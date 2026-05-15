"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileQuestion, Video, Settings, LogOut, Youtube } from "lucide-react";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
  { name: "Questions", icon: FileQuestion, path: "/admin/questions" },
  { name: "Trending Videos", icon: Video, path: "/admin/videos" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Youtube size={28} color="var(--primary)" />
        <span className={styles.logoText}>Admin Panel</span>
      </div>
      
      <nav className={styles.nav}>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <Icon size={20} className={styles.icon} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className={styles.footer}>
        <button 
          onClick={() => {
            sessionStorage.removeItem("admin_auth");
            window.location.href = "/";
          }} 
          className={styles.logoutBtn}
        >
          <LogOut size={20} />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
}
