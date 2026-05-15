import { Users, Clock, Flame, PlayCircle } from "lucide-react";
import styles from "./page.module.css";

const STATS = [
  { title: "Total Subscribers", value: "10,245", icon: Users, color: "var(--accent-color)" },
  { title: "Watch Minutes", value: "5.2M", icon: Clock, color: "var(--success-color)" },
  { title: "Active Streaks", value: "842", icon: Flame, color: "var(--warning-color)" },
  { title: "Video Views", value: "1.1M", icon: PlayCircle, color: "var(--primary)" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statInfo}>
                <p className={styles.statTitle}>{stat.title}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
              </div>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.recentSection}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Recent Activity</h3>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} style={{ background: "var(--primary)" }}></div>
              <div className={styles.activityContent}>
                <p><strong>Kamal</strong> unlocked the explanation for today's biology question.</p>
                <span>2 mins ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} style={{ background: "var(--success-color)" }}></div>
              <div className={styles.activityContent}>
                <p><strong>Nimal</strong> reached a 7-day learning streak!</p>
                <span>15 mins ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} style={{ background: "var(--accent-color)" }}></div>
              <div className={styles.activityContent}>
                <p><strong>Sunil</strong> subscribed to the channel via Mobile Web.</p>
                <span>1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
