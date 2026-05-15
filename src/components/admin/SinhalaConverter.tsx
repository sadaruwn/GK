"use client";

import { useState } from "react";
import { Copy, RefreshCw, X } from "lucide-react";
import styles from "./SinhalaConverter.module.css";

export default function SinhalaConverter({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertToUnicode = () => {
    let text = input;

    // Mapping for FM Abhaya (Common Sri Lankan PDF font)
    const map: [string, string][] = [
      // Double/Triple chars
      ["ff", "ෲ"], ["\\", "්"],
      
      // Vowels & Modifiers (Order matters)
      ["m%", "ඟ"], ["ka", "ක"], ["v%", "ඬ"], ["o%", "ඳ"], ["u%", "ඹ"],
      
      // Consonants
      ["w", "අ"], ["W", "උ"], ["t", "එ"], ["T", "ඔ"],
      ["l", "ක"], ["L", "ඛ"], [".", "ග"], [">", "ඝ"],
      ["p", "ච"], ["P", "ඡ"], ["c", "ජ"], ["C", "ඣ"],
      ["g", "ට"], ["G", "ඨ"], ["v", "ඩ"], ["V", "ඪ"], ["K", "ණ"],
      ["o", "ද"], ["O", "ධ"], ["n", "න"],
      ["u", "ම"], ["N", "ඹ"],
      ["h", "ය"], ["r", "ර"], ["v", "ල"], ["J", "ව"],
      ["Y", "ශ"], ["I", "ෂ"], ["i", "ස"], ["y", "හ"],
      ["v", "ළ"], ["*", "ෆ"],

      // Vowels (Pili)
      ["d", "ා"], ["s", "ි"], ["S", "ී"], ["q", "ු"], ["Q", "ූ"],
      ["e", "ැ"], ["E", "ෑ"], ["a", "්"], ["A", "්"],
      ["R", "ෘ"],
    ];

    // Complex logic for 'Kombuwa' (f) which comes BEFORE the consonant
    // We search for 'f' + [consonant] and swap them
    const consonants = "wWtTl L. >pPc CgGvVK oOn uNh r v J Y I i y v*"; 
    // This is a simplified regex-based approach for the 'f' rule
    text = text.replace(/f([a-zA-Z.>,;:\/\\|\[\]{}])/g, "$1ෙ");
    text = text.replace(/F([a-zA-Z.>,;:\/\\|\[\]{}])/g, "$1ේ");

    // Replace based on map
    map.forEach(([legacy, unicode]) => {
      text = text.split(legacy).join(unicode);
    });

    setOutput(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("Converted text copied!");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Sinhala Legacy to Unicode Converter</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className={styles.body}>
          <p className={styles.hint}>Paste your PDF garbage text (mojibake) below:</p>
          <textarea 
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text here..."
            rows={5}
          />
          
          <div className={styles.actions}>
            <button className={styles.convertBtn} onClick={convertToUnicode}>
              <RefreshCw size={18} />
              Convert to Unicode
            </button>
            <p className={styles.smallHint}>Note: If this doesn't work perfectly, use <a href="https://www.ucsc.cmb.ac.lk/ltrl/services/fe2u/" target="_blank" rel="noopener noreferrer">UCSC Converter</a></p>
          </div>

          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>
              <span>Converted Text:</span>
              <button onClick={handleCopy}><Copy size={16} /> Copy</button>
            </div>
            <div className={styles.resultText}>
              {output || "Result will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
