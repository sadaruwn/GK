"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, PlusCircle, Trash, RefreshCw } from "lucide-react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";
import SinhalaConverter from "@/components/admin/SinhalaConverter";

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

export default function QuestionsManagement() {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showConverter, setShowConverter] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states for a set of 5 questions
  const [youtubeLink, setYoutubeLink] = useState("");
  const [questionsData, setQuestionsData] = useState<Question[]>(
    Array(5).fill(null).map(() => ({
      text: "",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ]
    }))
  );

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('question_sets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching sets:', error);
    } else {
      setSets(data || []);
    }
    setLoading(false);
  };

  const handleQuestionChange = (index: number, text: string) => {
    const updated = [...questionsData];
    updated[index].text = text;
    setQuestionsData(updated);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, text: string) => {
    const updated = [...questionsData];
    updated[qIndex].options[optIndex].text = text;
    setQuestionsData(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const setPayload = {
      date: editingId ? (sets.find(s => s.id === editingId)?.date || new Date().toLocaleDateString()) : new Date().toLocaleDateString(),
      youtube_link: youtubeLink,
      questions: questionsData,
    };

    if (editingId) {
      const { error } = await supabase
        .from('question_sets')
        .update(setPayload)
        .eq('id', editingId);
      if (error) alert('Update failed: ' + error.message);
    } else {
      const { error } = await supabase
        .from('question_sets')
        .insert([setPayload]);
      if (error) alert('Insert failed: ' + error.message);
    }

    fetchSets();
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setYoutubeLink("");
    setQuestionsData(
      Array(5).fill(null).map(() => ({
        text: "",
        options: [
          { id: "A", text: "" },
          { id: "B", text: "" },
          { id: "C", text: "" },
          { id: "D", text: "" },
        ]
      }))
    );
  };

  const handleEdit = (s: QuestionSet) => {
    setEditingId(s.id);
    setYoutubeLink(s.youtube_link);
    setQuestionsData(s.questions);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this question set?")) {
      const { error } = await supabase
        .from('question_sets')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Delete failed: ' + error.message);
      } else {
        fetchSets();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Daily Question Sets (5 Qs)</h1>
        <div className={styles.headerActions}>
          <button className={styles.convertHelperBtn} onClick={() => setShowConverter(true)}>
            <RefreshCw size={18} />
            <span>Sinhala Converter</span>
          </button>
          {!isAdding && (
            <button className={styles.addBtn} onClick={() => setIsAdding(true)}>
              <Plus size={18} />
              <span>Add New 5-Question Set</span>
            </button>
          )}
        </div>
      </div>

      {showConverter && <SinhalaConverter onClose={() => setShowConverter(false)} />}

      {isAdding && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>{editingId ? "Edit Question Set" : "Create New 5-Question Set"}</h3>
            <button onClick={resetForm} className={styles.closeBtn}><X size={20} /></button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>YouTube Link (Shared for all 5 questions)</label>
              <input 
                required 
                type="text" 
                value={youtubeLink} 
                onChange={e => setYoutubeLink(e.target.value)} 
                placeholder="https://youtube.com/..." 
              />
            </div>

            <div className={styles.questionsScroll}>
              {questionsData.map((q, qIndex) => (
                <div key={qIndex} className={styles.qBox}>
                  <h4 className={styles.qHeader}>Question #{qIndex + 1}</h4>
                  <div className={styles.inputGroup}>
                    <textarea 
                      required
                      value={q.text}
                      onChange={e => handleQuestionChange(qIndex, e.target.value)}
                      placeholder={`Enter question ${qIndex + 1}...`}
                      rows={2}
                    ></textarea>
                  </div>
                  <div className={styles.optionsGrid}>
                    {q.options.map((opt, optIndex) => (
                      <div key={opt.id} className={styles.inputGroup}>
                        <label>Option {opt.id}</label>
                        <input 
                          required 
                          type="text" 
                          value={opt.text} 
                          onChange={e => handleOptionChange(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${opt.id} text`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={resetForm}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>{editingId ? "Update Set" : "Save Question Set"}</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{padding: '40px', textAlign: 'center'}}>Loading data from database...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Set Content</th>
                <th>Questions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((s) => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td className={styles.qText}>Set: {s.questions[0]?.text.substring(0, 30)}...</td>
                  <td><span className={styles.badge}>{s.questions.length} Questions</span></td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} onClick={() => handleEdit(s)}><Edit2 size={16} /></button>
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(s.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {sets.length === 0 && (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No question sets added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
