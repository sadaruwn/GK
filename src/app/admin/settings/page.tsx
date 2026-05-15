"use client";

import { useState, useEffect } from "react";
import { Save, Key, Globe, Link as LinkIcon, CheckCircle } from "lucide-react";
import styles from "./page.module.css";

export default function AdminSettings() {
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [general, setGeneral] = useState({
    siteName: "GK Learning",
    email: "admin@gklearning.lk"
  });

  const [social, setSocial] = useState({
    youtube: "https://www.youtube.com/channel/UC6TYUtPYJLIcKIf03AtMvIg",
    facebook: "https://www.facebook.com/amarasriherath.lk/"
  });

  useEffect(() => {
    const savedGeneral = localStorage.getItem("gk_settings_general");
    if (savedGeneral) setGeneral(JSON.parse(savedGeneral));

    const savedSocial = localStorage.getItem("gk_settings_social");
    if (savedSocial) setSocial(JSON.parse(savedSocial));
  }, []);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("gk_settings_general", JSON.stringify(general));
    showSuccess("General settings saved!");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("gk_settings_social", JSON.stringify(social));
    showSuccess("Social links updated!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd verify current password
    showSuccess("Password updated successfully!");
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Platform Settings</h1>
          <p className={styles.subtitle}>Manage your website configuration and security.</p>
        </div>
        {success && (
          <div className={styles.successToast}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {/* General Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <Globe size={20} className={styles.cardIcon} />
            <h2>General Details</h2>
          </div>
          <form className={styles.cardBody} onSubmit={handleSaveGeneral}>
            <div className={styles.inputGroup}>
              <label>Website Name</label>
              <input 
                type="text" 
                value={general.siteName}
                onChange={e => setGeneral({...general, siteName: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Contact Email</label>
              <input 
                type="email" 
                value={general.email}
                onChange={e => setGeneral({...general, email: e.target.value})}
              />
            </div>
            <button type="submit" className={styles.saveBtn}><Save size={16} /> Save Changes</button>
          </form>
        </div>

        {/* Security Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <Key size={20} className={styles.cardIcon} />
            <h2>Admin Security</h2>
          </div>
          <form className={styles.cardBody} onSubmit={handleUpdatePassword}>
            <div className={styles.inputGroup}>
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className={styles.inputGroup}>
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <button type="submit" className={styles.saveBtn}><Save size={16} /> Update Password</button>
          </form>
        </div>

        {/* Social Links Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <LinkIcon size={20} className={styles.cardIcon} />
            <h2>Social Media Links</h2>
          </div>
          <form className={styles.cardBody} onSubmit={handleSaveSocial}>
            <div className={styles.inputGroup}>
              <label>YouTube Channel URL</label>
              <input 
                type="url" 
                value={social.youtube}
                onChange={e => setSocial({...social, youtube: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Facebook Page URL</label>
              <input 
                type="url" 
                value={social.facebook}
                onChange={e => setSocial({...social, facebook: e.target.value})}
              />
            </div>
            <button type="submit" className={styles.saveBtn}><Save size={16} /> Save Links</button>
          </form>
        </div>
      </div>
    </div>
  );
}
