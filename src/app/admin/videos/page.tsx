"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, X, Upload, ImageIcon, Loader2 } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const fetchYoutubeMetadata = async (url: string) => {
    const videoId = extractYoutubeId(url);
    if (!videoId) return;

    // Set thumbnail automatically
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    setLoadingMetadata(true);
    try {
      // Fetch title using oEmbed (No API key needed)
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      const data = await response.json();
      
      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        thumbnail: thumbnail,
        link: url
      }));
    } catch (error) {
      console.error("Error fetching YouTube metadata:", error);
      // Fallback: just set thumbnail
      setFormData(prev => ({ ...prev, thumbnail, link: url }));
    } finally {
      setLoadingMetadata(false);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, link: url });
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      fetchYoutubeMetadata(url);
    }
  };

  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('thumbnails')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(filePath);

      setFormData({ ...formData, thumbnail: publicUrl });
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.thumbnail) {
      alert("Please enter a link or upload a thumbnail first!");
      return;
    }
    
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
    if (fileInputRef.current) fileInputRef.current.value = "";
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
              <label>Video Title (Optional - Auto-filled)</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Master Biology in 10 Mins" />
            </div>
            <div className={styles.inputGroup}>
              <label>YouTube Link</label>
              <div className={styles.inputWithLoader}>
                <input required type="text" value={formData.link} onChange={handleLinkChange} placeholder="https://youtube.com/..." />
                {loadingMetadata && <Loader2 className={`${styles.spin} ${styles.inputLoader}`} size={16} />}
              </div>
              <p className={styles.inputHint}>Paste link to auto-fill Title and Thumbnail</p>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Thumbnail Image</label>
              <div className={styles.uploadBox}>
                {formData.thumbnail ? (
                  <div className={styles.previewContainer}>
                    <img src={formData.thumbnail} alt="Preview" className={styles.previewImg} />
                    <button type="button" className={styles.changeImgBtn} onClick={() => fileInputRef.current?.click()}>
                      <Upload size={16} /> Change Image
                    </button>
                  </div>
                ) : (
                  <button type="button" className={styles.uploadPlaceholder} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? <Loader2 className={styles.spin} /> : <ImageIcon size={32} />}
                    <span>{uploading ? "Uploading..." : "Click to Upload Thumbnail"}</span>
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
              </div>
              <p className={styles.inputHint}>Auto-filled from YouTube, or upload your own</p>
            </div>

            <div className={styles.optionsGrid}>
              <div className={styles.inputGroup}>
                <label>Views (Required)</label>
                <input required type="text" value={formData.views} onChange={e => setFormData({...formData, views: e.target.value})} placeholder="e.g. 1.5K views" />
              </div>
              <div className={styles.inputGroup}>
                <label>Upload Time (Required)</label>
                <input required type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="e.g. 2 days ago" />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={resetForm}>Cancel</button>
              <button type="submit" className={styles.saveBtn} disabled={uploading}>
                {editingId ? "Update Video" : "Save Video"}
              </button>
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
