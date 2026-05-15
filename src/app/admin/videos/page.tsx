"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  views: string;
  time: string;
}

export default function VideosManagement() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    thumbnail: "",
    views: "",
    time: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('videos')
        .update(formData)
        .eq('id', editingId);
      if (error) alert('Update failed: ' + error.message);
    } else {
      const { error } = await supabase
        .from('videos')
        .insert([formData]);
      if (error) alert('Insert failed: ' + error.message);
    }

    fetchVideos();
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: "",
      link: "",
      thumbnail: "",
      views: "",
      time: "",
    });
  };

  const handleEdit = (v: Video) => {
    setEditingId(v.id);
    setFormData({
      title: v.title,
      link: v.link,
      thumbnail: v.thumbnail,
      views: v.views,
      time: v.time,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Delete failed: ' + error.message);
      } else {
        fetchVideos();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Featured Videos</h1>
        {!isAdding && (
          <button className={styles.addBtn} onClick={() => setIsAdding(true)}>
            <Plus size={18} />
            <span>Add New Video</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>{editingId ? "Edit Video" : "Add Trending Video"}</h3>
            <button onClick={resetForm} className={styles.closeBtn}><X size={20} /></button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Video Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Master Biology in 10 Mins" />
            </div>
            <div className={styles.inputGroup}>
              <label>YouTube Link</label>
              <input required type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://youtube.com/..." />
            </div>
            <div className={styles.inputGroup}>
              <label>Thumbnail Image URL</label>
              <input required type="text" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} placeholder="https://images.unsplash.com/..." />
            </div>
            <div className={styles.optionsGrid}>
              <div className={styles.inputGroup}>
                <label>View Count</label>
                <input required type="text" value={formData.views} onChange={e => setFormData({...formData, views: e.target.value})} placeholder="e.g. 120K" />
              </div>
              <div className={styles.inputGroup}>
                <label>Upload Time</label>
                <input required type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="e.g. 2 days ago" />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={resetForm}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>{editingId ? "Update Video" : "Save Video"}</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{padding: '40px', textAlign: 'center'}}>Loading videos...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id}>
                  <td><img src={v.thumbnail} alt="" className={styles.miniThumb} /></td>
                  <td className={styles.qText}>{v.title}</td>
                  <td>{v.views}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} onClick={() => handleEdit(v)}><Edit2 size={16} /></button>
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(v.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {videos.length === 0 && (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No videos added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
