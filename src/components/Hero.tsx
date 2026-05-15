import { Users, PlayCircle, Trophy } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>GK LEARNING</span>
        </h1>
      </div>
    </div>
  );
}
