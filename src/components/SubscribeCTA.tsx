import { Youtube, Bell, Users } from "lucide-react";
import styles from "./SubscribeCTA.module.css";

export default function SubscribeCTA() {
  return (
    <section className={styles.container}>
      <div className={`${styles.card} glass`}>
        <div className={styles.info}>
          <div className={styles.socialIcons}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className={styles.socialIcon} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className={styles.socialIcon} />
            <img src="/admin-logo.png" alt="Admin Logo" className={styles.socialIcon} />
          </div>
          <div className={styles.text}>
            <h2 className={styles.title}>අපගේ සමාජ මාධ්‍ය ජාලයන් හා එක්වන්න</h2>
            <p className={styles.description}>
              අලුත්ම පාඩම්, ප්‍රශ්න පත්‍ර සහ තොරතුරු ඉක්මනින් ලබා ගැනීමට අපගේ YouTube සහ Facebook පිටු සමග අදම එකතු වන්න.
            </p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Users size={20} />
              <span>10K+ Students</span>
            </div>
            <div className={styles.statItem}>
              <Bell size={20} />
              <span>Stay Updated</span>
            </div>
          </div>
          
          <div className={styles.subscribeWrapper}>
            <div 
              className="g-ytsubscribe" 
              data-channelid="UC6TYUtPYJLIcKIf03AtMvIg" 
              data-layout="full" 
              data-count="default"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
