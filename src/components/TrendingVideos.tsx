"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import styles from "./TrendingVideos.module.css";
import { supabase } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  views: string;
  time: string;
}

export default function TrendingVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
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

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Trending Lessons</h3>
        <span className={styles.badge}>Hot</span>
      </div>
      
      <div className={styles.videoList}>
        {loading ? (
          <p style={{padding: '20px', textAlign: 'center'}}>Loading videos...</p>
        ) : (
          <>
            {videos.map((video) => (
              <a key={video.id} href={video.link} target="_blank" rel="noopener noreferrer" className={styles.videoCard}>
                <div className={styles.thumbnailWrapper}>
                  <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
                  <div className={styles.playIcon}>
                    <Play size={16} color="white" fill="white" />
                  </div>
                </div>
                <div className={styles.info}>
                  <h4 className={styles.videoTitle}>{video.title}</h4>
                  <p className={styles.meta}>
                    {video.views} views • {video.time}
                  </p>
                </div>
              </a>
            ))}
            {videos.length === 0 && (
              <p style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '20px'}}>No videos featured yet.</p>
            )}
          </>
        )}
      </div>
      
      <a href="https://www.youtube.com/channel/UC6TYUtPYJLIcKIf03AtMvIg?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className={styles.viewAllBtn}>
        View Channel
      </a>
    </div>
  );
}
