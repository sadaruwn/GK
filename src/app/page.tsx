import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";
import TrendingVideos from "@/components/TrendingVideos";
import StickySubscribe from "@/components/StickySubscribe";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <Hero />
        
        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <QuizSection />
          </div>
          
          <div className={styles.sideColumn}>
            <TrendingVideos />
          </div>
        </div>
      </div>
      
      <Footer />
      <StickySubscribe />
    </main>
  );
}
