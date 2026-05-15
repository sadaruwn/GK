"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileQuestion, Video, Settings, LogOut, Menu, X as CloseIcon } from "lucide-react";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
  { name: "Questions", icon: FileQuestion, path: "/admin/questions" },
  { name: "Trending Videos", icon: Video, path: "/admin/videos" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className={styles.mobileToggle} onClick={toggleSidebar}>
        {isOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoContainer}>
          <img 
            src="/admin-logo.png" 
            alt="Logo" 
            className={styles.sidebarLogo}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png';
            }}
          />
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
                onClick={() => setIsOpen(false)} // Close on navigate
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
    </>
  );
}
