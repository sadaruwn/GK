"use client";

import { useState, useEffect } from "react";
import { Youtube, ExternalLink, CheckCircle2 } from "lucide-react";
import styles from "./QuizSection.module.css";
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

export default function QuizSection({ setId }: { setId?: string }) {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedInSets, setSelectedInSets] = useState<Record<string, Record<number, string>>>({});
  const [submittedSets, setSubmittedSets] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    fetchData();

    // Listen for real-time changes (only on home page)
    if (!setId) {
      const channel = supabase
        .channel('question_sets_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'question_sets' },
          () => {
            fetchData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [setId]);

  const fetchData = async () => {
    setLoading(true);
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem("gk_set_history");
    let parsedHistory: string[] = [];
    if (savedHistory) {
      try {
        parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        // If we are looking at a specific set that's already in history, mark it as submitted
        if (setId && parsedHistory.includes(setId)) {
          setSubmittedSets([setId]);
        }
      } catch (e) {
        console.error("Error parsing history:", e);
      }
    }

    let query = supabase.from('question_sets').select('*');

    if (setId) {
      console.log("Fetching specific set ID:", setId);
      query = query.eq('id', setId);
    } else {
      query = query.order('created_at', { ascending: false }).limit(1);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching sets:', error);
    } else {
      const result = data || [];
      setSets(result);

      // Auto-mark as submitted if found in history
      const alreadySubmitted = result
        .filter(s => parsedHistory.includes(s.id))
        .map(s => s.id);
      
      if (alreadySubmitted.length > 0) {
        setSubmittedSets(prev => Array.from(new Set([...prev, ...alreadySubmitted])));
      }
    }
    setLoading(false);
  };

  const handleSelect = (setId: string, qIndex: number, optId: string) => {
    if (submittedSets.includes(setId)) return;
    
    setSelectedInSets(prev => ({
      ...prev,
      [setId]: {
        ...(prev[setId] || {}),
        [qIndex]: optId
      }
    }));
  };

  const handleSubmitSet = (setId: string) => {
    const set = sets.find(s => s.id === setId);
    if (!set) return;
    
    const selections = selectedInSets[setId] || {};
    if (Object.keys(selections).length < set.questions.length) {
      alert("Please answer all questions in this sheet before submitting!");
      return;
    }

    // Add to session submitted list (to show reveal state)
    setSubmittedSets(prev => [...prev, setId]);
    
    // Save to permanent history (so it hides on reload)
    const newHistory = [...history, setId];
    setHistory(newHistory);
    localStorage.setItem("gk_set_history", JSON.stringify(newHistory));

    // Update daily streak
    const streak = parseInt(localStorage.getItem("gk_streak") || "0");
    localStorage.setItem("gk_streak", (streak + 1).toString());
  };

  if (!isMounted) return null;

  if (loading) {
    return <div className={styles.emptyState}><h2>Loading Challenges...</h2></div>;
  }

  if (sets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>All Sheets Completed!</h2>
        <p>You have answered all available question sheets. Check back later for new challenges!</p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      {sets.map((set) => {
        const isSubmitted = submittedSets.includes(set.id);
        const selections = selectedInSets[set.id] || {};
        const allAnswered = Object.keys(selections).length === set.questions.length;

        return (
          <div key={set.id} className={styles.setCard}>
            <div className={styles.setHeader}>
              <div className={styles.setTag}>
                <CheckCircle2 size={16} />
                <span>Question Sheet</span>
              </div>
              <span className={styles.setDate}>{set.date}</span>
            </div>

            <div className={styles.questionsList}>
              {set.questions.map((q, index) => (
                <div key={index} className={styles.qItem}>
                  <div className={styles.qTextRow}>
                    <span className={styles.qNum}>Q{index + 1}</span>
                    <p className={styles.qText}>{q.text}</p>
                  </div>
                  
                  <div className={styles.optionsGrid}>
                    {q.options.map((opt) => {
                      const isSelected = selections[index] === opt.id;
                      return (
                        <button 
                          key={opt.id}
                          className={`${styles.optBtn} ${isSelected ? styles.optSelected : ''} ${isSubmitted ? styles.optDisabled : ''}`}
                          onClick={() => handleSelect(set.id, index, opt.id)}
                          disabled={isSubmitted}
                        >
                          <span className={styles.optLetter}>{opt.id}</span>
                          <span className={styles.optLabel}>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!isSubmitted ? (
              <div className={styles.footerAction}>
                <button 
                  className={`${styles.submitSheetBtn} ${!allAnswered ? styles.btnDisabled : ''}`}
                  onClick={() => handleSubmitSet(set.id)}
                >
                  Submit Full Sheet
                </button>
              </div>
            ) : (
              <div className={styles.revealSection}>
                <div className={styles.revealDivider}>
                  <span>Answer Sheet Revealed</span>
                </div>
                <div className={styles.officialSubscribeWrapper}>
                  <div 
                    className="g-ytsubscribe" 
                    data-channelid="UC6TYUtPYJLIcKIf03AtMvIg" 
                    data-layout="full" 
                    data-count="default"
                  ></div>
                </div>
                <p className={styles.revealHint}>ඔබේ පිළිතුරු නිවැරදිද යන්න දැනගැනීමට පහත ලින්ක් එකෙන් අපේ චැනල් එක බලන්න:</p>
                <a 
                  href={set.youtube_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.youtubeSheetLink}
                >
                  <Youtube size={20} />
                  <span>මේ ලින්ක් එක ක්ලික් කරලා උත්තර ලබාගන්න</span>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
