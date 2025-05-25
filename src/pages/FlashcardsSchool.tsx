// src/pages/FlashcardsSchool.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { vocabularySchool } from '../data/VocabularySchool';
import './FlashcardsSchool.css'; // Usa tu archivo CSS amarillo

const SCHOOL_COLOR = "#fbbf24";
const SCHOOL_ACCENT = "#b45309"; // Un amarillo-marrón para contraste, puedes ajustar

export default function FlashcardsSchool() {
  const [queue, setQueue] = useState([...vocabularySchool]);
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
    setQueue([...vocabularySchool]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  // ← SCHOOL button
  function BackButton() {
    return (
      <button
        className="school-back-btn"
        style={{
          background: SCHOOL_COLOR,
          color: "#fff",
          fontWeight: "bold"
        }}
        onClick={() => navigate('/practice')}
      >
        <span className="arrow-icon">←</span>
        <span>SCHOOL</span>
      </button>
    );
  }

  if (queue.length === 0) {
    return (
      <div>
        <Navbar />
        <BackButton />
        <div className="flashcardschool-container">
          <div className="flashcardschool-card flashcardschool-finished">
            <div className="flashcardschool-category" style={{ background: SCHOOL_ACCENT }}>
              ¡Well Done!
            </div>
            <div className="flashcardschool-word">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="flashcardschool-btn restart" onClick={handleRestart} style={{ background: SCHOOL_COLOR }}>
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const flashcard = queue[currentIndex];

  function renderFlashcardImage(img: string | undefined, alt: string) {
    if (!img) return null;
    if (img.startsWith("/") || img.startsWith("http")) {
      return (
        <img
          src={img}
          alt={alt}
          className="flashcardschool-img"
          style={{ marginRight: "0.6em" }}
        />
      );
    }
    return (
      <span style={{ fontSize: "2.5rem", marginRight: "0.6em" }}>{img}</span>
    );
  }

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="flashcardschool-container">
        <div className="flashcardschool-instructions" style={{ color: SCHOOL_ACCENT }}>
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`flashcardschool-card ${animDirection ? 'slide-' + animDirection : ''}`}
          ref={cardRef}
          style={{ background: SCHOOL_COLOR, boxShadow: "0 4px 30px #fbbf2477" }}
        >
          <div className="flashcardschool-category" style={{ background: SCHOOL_ACCENT }}>
            {flashcard.category}
          </div>
          <div className="flashcardschool-word">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span style={{ fontWeight: 600, fontSize: "2rem" }}>
              {flashcard.german}
            </span>
          </div>
          <div className="flashcardschool-translation">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="flashcardschool-use">{flashcard.use}</div>
          )}
        </div>
        <div className="flashcardschool-progress">
          Flashcards Known: {knownCount} of {vocabularySchool.length}
        </div>
        <div className="flashcardschool-actions">
          <button
            className="flashcardschool-btn again"
            onClick={() => handleAction('studyAgain')}
            style={{ background: "#fde68a", color: "#b45309" }}
          >
            STUDY AGAIN
          </button>
          <button
            className="flashcardschool-btn know"
            onClick={() => handleAction('know')}
            style={{ background: "#fbbf24", color: "#b45309" }}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
