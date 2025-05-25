// src/pages/FlashcardsFamily.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { vocabularyFamily } from '../data/VocabularyFamily';
import './FlashcardsFamily.css';

const FAMILY_COLOR = "#ef4444";
const FAMILY_ACCENT = "#b91c1c";

export default function FlashcardsFamily() {
  const [queue, setQueue] = useState([...vocabularyFamily]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | ''>('');
  const [knownCount, setKnownCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  function handleAction(action: 'know' | 'studyAgain') {
    setAnimDirection(action === 'know' ? 'right' : 'left');
    setTimeout(() => {
      setAnimDirection('');
      if (queue.length === 0) return;

      let newQueue = [...queue];
      if (action === 'know') {
        newQueue.splice(currentIndex, 1);
        setKnownCount(kc => kc + 1);
      } else if (action === 'studyAgain') {
        const flashcard = newQueue.splice(currentIndex, 1)[0];
        newQueue.splice(Math.min(currentIndex + 3, newQueue.length), 0, flashcard);
      }

      if (newQueue.length === 0) {
        setQueue([]);
        setCurrentIndex(0);
      } else {
        setQueue(newQueue);
        setCurrentIndex((prev) =>
          prev >= newQueue.length ? 0 : prev
        );
      }
    }, 280);
  }

  function handleRestart() {
    setQueue([...vocabularyFamily]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  function BackButton() {
    return (
      <button
        className="flashcardfamily-back-btn"
        style={{
          background: FAMILY_COLOR,
          color: "#fff",
          fontWeight: "bold"
        }}
        onClick={() => navigate('/practice')}
      >
        <span className="flashcardfamily-arrow-icon">←</span>
        <span>FAMILY</span>
      </button>
    );
  }

  function renderFlashcardImage(img: string | undefined, alt: string) {
    if (!img) return null;
    if (img.startsWith("/") || img.startsWith("http")) {
      return (
        <img
          src={img}
          alt={alt}
          className="flashcardfamily-img"
          style={{ marginRight: "0.6em" }}
        />
      );
    }
    return (
      <span style={{ fontSize: "2.5rem", marginRight: "0.6em" }}>{img}</span>
    );
  }

  if (queue.length === 0) {
    return (
      <div>
        <Navbar />
        <BackButton />
        <div className="flashcardfamily-container">
          <div className="flashcardfamily-card flashcardfamily-finished">
            <div className="flashcardfamily-category" style={{ background: FAMILY_ACCENT }}>
              ¡Well Done!
            </div>
            <div className="flashcardfamily-word">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="flashcardfamily-btn restart" onClick={handleRestart} style={{ background: FAMILY_COLOR }}>
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const flashcard = queue[currentIndex];

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="flashcardfamily-container">
        <div className="flashcardfamily-instructions" style={{ color: FAMILY_ACCENT }}>
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`flashcardfamily-card ${animDirection ? 'slide-' + animDirection : ''}`}
          ref={cardRef}
          style={{ background: FAMILY_COLOR, boxShadow: "0 4px 30px #ef444477" }}
        >
          <div className="flashcardfamily-category" style={{ background: FAMILY_ACCENT }}>
            {flashcard.category}
          </div>
          <div className="flashcardfamily-word">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span style={{ fontWeight: 600, fontSize: "2rem" }}>
              {flashcard.german}
            </span>
          </div>
          <div className="flashcardfamily-translation">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="flashcardfamily-use">{flashcard.use}</div>
          )}
        </div>
        <div className="flashcardfamily-progress">
          Flashcards Known: {knownCount} of {vocabularyFamily.length}
        </div>
        <div className="flashcardfamily-actions">
          <button
            className="flashcardfamily-btn again"
            onClick={() => handleAction('studyAgain')}
            style={{ background: "#fca5a5", color: FAMILY_ACCENT }}
          >
            STUDY AGAIN
          </button>
          <button
            className="flashcardfamily-btn know"
            onClick={() => handleAction('know')}
            style={{ background: "#f87171", color: FAMILY_ACCENT }}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
