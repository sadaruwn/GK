"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import QuizSection from "@/components/QuizSection";
import TrendingVideos from "@/components/TrendingVideos";
import Footer from "@/components/Footer";
import styles from "../../page.module.css";
import { ChevronLeft } from "lucide-react";

export default function HistoryDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div style={{marginTop: '40px', marginBottom: '20px'}}>
           <a href="/history" style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600}}>
              <ChevronLeft size={20} />
              <span>Back to History</span>
           </a>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <QuizSection setId={id} />
          </div>
          
          <div className={styles.sideColumn}>
            <TrendingVideos />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
