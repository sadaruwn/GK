"use client";

import { useState, useEffect } from "react";
import { Youtube, CheckCircle2, History as HistoryIcon, ArrowRight } from "lucide-react";
import styles from "./QuizSection.module.css"; // Reuse styles
import { supabase } from "@/lib/supabase";

interface Question {
  text: string;
  options: { id: string; text: string }[];
}

interface QuestionSet {
  id: string;
  date: string;
  youtube_link: string;
  questions: Question[];
}

export default function HistorySection() {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem("gk_set_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Load ALL sets from Supabase, but skip the very latest one (which is on home)
    const { data, error } = await supabase
      .from('question_sets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching sets:', error);
    } else {
      // Skip the first one as it's on the home page
      const pastSets = (data || []).slice(1);
      setSets(pastSets);
    }
    setLoading(false);
  };

  if (!isMounted) return null;

  if (loading) {
    return <div className={styles.emptyState}><h2>Loading History...</h2></div>;
  }

  if (sets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <HistoryIcon size={48} color="var(--text-secondary)" style={{marginBottom: '20px', opacity: 0.5}} />
        <h2>No History Yet</h2>
        <p>Old question sheets will appear here once new ones are added.</p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      <div className={styles.historyTitle}>
        <HistoryIcon size={24} color="var(--primary)" />
        <h2>Past Question Sheets</h2>
      </div>

      {sets.map((set) => {
        const isCompleted = history.includes(set.id);

        return (
          <div key={set.id} className={`${styles.setCard} ${isCompleted ? styles.completedCard : ''}`}>
            <div className={styles.setHeader}>
              <div className={styles.setTag} style={{background: isCompleted ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.05)', color: isCompleted ? '#00e676' : 'var(--text-secondary)'}}>
                {isCompleted ? <CheckCircle2 size={16} /> : <HistoryIcon size={16} />}
                <span>{isCompleted ? "COMPLETED SHEET" : "PAST SHEET"}</span>
              </div>
              <span className={styles.setDate}>{set.date}</span>
            </div>

            <div className={styles.historyPreview}>
              <p className={styles.historyText}>{set.questions[0]?.text}</p>
              <div className={styles.historyMeta}>
                <span>{set.questions.length} Questions</span>
                <div className={styles.metaDivider}></div>
                <a 
                  href={set.youtube_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.viewSolutionBtn}
                >
                  <Youtube size={16} />
                  <span>View Solution</span>
                </a>
              </div>
            </div>
            
            <div className={styles.historyActions}>
               <a href={`/history/${set.id}`} className={isCompleted ? styles.retryBtn : styles.attemptBtn}>
                  <span>{isCompleted ? "Review Questions" : "Attempt These Questions"}</span>
                  <ArrowRight size={16} />
               </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
