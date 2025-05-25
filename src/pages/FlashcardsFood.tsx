// src/pages/FlashcardsFood.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { vocabularyFood } from '../data/VocabularyFood';
import './FlashcardsFood.css';

const FOOD_COLOR = "#22c55e";
const FOOD_ACCENT = "#065f46";

export default function FlashcardsFood() {
  const [queue, setQueue] = useState([...vocabularyFood]);
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
    setQueue([...vocabularyFood]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  // ← FOOD button
  function BackButton() {
    return (
      <button
        className="food-back-btn"
        style={{
          background: FOOD_COLOR,
          color: "#fff",
          fontWeight: "bold"
        }}
        onClick={() => navigate('/practice')}
      >
        <span className="arrow-icon">←</span>
        <span>FOOD</span>
      </button>
    );
  }

  // IMAGE
  function renderFlashcardImage(img: string | undefined, alt: string) {
    if (!img) return null;
    if (img.startsWith("/") || img.startsWith("http")) {
      return (
        <img
          src={img}
          alt={alt}
          className="flashcardfood-img"
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
        <div className="flashcard-container">
          <div className="flashcardfood-card flashcardfood-finished">
            <div className="flashcardfood-category" style={{ background: FOOD_ACCENT }}>
              ¡Well Done!
            </div>
            <div className="flashcardfood-word">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="flashcardfood-btn restart" onClick={handleRestart} style={{ background: FOOD_COLOR }}>
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
      <div className="flashcard-container">
        <div className="flashcardfood-instructions" style={{ color: FOOD_ACCENT }}>
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`flashcardfood-card ${animDirection ? 'slide-' + animDirection : ''}`}
          ref={cardRef}
          style={{ background: FOOD_COLOR, boxShadow: "0 4px 30px #22c55e77" }}
        >
          <div className="flashcardfood-category" style={{ background: FOOD_ACCENT }}>
            {flashcard.category}
          </div>
          <div className="flashcardfood-word">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span style={{ fontWeight: 600, fontSize: "2rem" }}>
              {flashcard.german}
            </span>
          </div>
          <div className="flashcardfood-translation">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="flashcardfood-use">{flashcard.use}</div>
          )}
        </div>
        <div className="flashcardfood-progress">
          Flashcards Known: {knownCount} of {vocabularyFood.length}
        </div>
        <div className="flashcardfood-actions">
          <button
            className="flashcardfood-btn again"
            onClick={() => handleAction('studyAgain')}
            style={{ background: "#bbf7d0", color: "#065f46" }}
          >
            STUDY AGAIN
          </button>
          <button
            className="flashcardfood-btn know"
            onClick={() => handleAction('know')}
            style={{ background: "#4ade80", color: "#065f46" }}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
