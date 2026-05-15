import Navbar from "@/components/Navbar";
import HistorySection from "@/components/HistorySection";
import TrendingVideos from "@/components/TrendingVideos";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function HistoryPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.contentGrid} style={{marginTop: '40px'}}>
          <div className={styles.mainColumn}>
            <HistorySection />
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
