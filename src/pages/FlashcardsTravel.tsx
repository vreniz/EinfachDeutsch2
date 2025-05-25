// src/pages/FlashcardsTravel.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { vocabularyTravel } from '../data/VocabularyTravel';
import './FlashcardsTravel.css';

const TRAVEL_COLOR = "#a78bfa";
const TRAVEL_ACCENT = "#5b21b6";

export default function FlashcardsTravel() {
  const [queue, setQueue] = useState([...vocabularyTravel]);
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
    setQueue([...vocabularyTravel]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  function BackButton() {
    return (
      <button
        className="flashcardtravel-back-btn"
        style={{
          background: TRAVEL_COLOR,
          color: "#fff",
          fontWeight: "bold"
        }}
        onClick={() => navigate('/practice')}
      >
        <span className="flashcardtravel-arrow-icon">←</span>
        <span>TRAVEL</span>
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
          className="flashcardtravel-img"
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
        <div className="flashcardtravel-container">
          <div className="flashcardtravel-card flashcardtravel-finished">
            <div className="flashcardtravel-category" style={{ background: TRAVEL_ACCENT }}>
              ¡Well Done!
            </div>
            <div className="flashcardtravel-word">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="flashcardtravel-btn restart" onClick={handleRestart} style={{ background: TRAVEL_COLOR }}>
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
      <div className="flashcardtravel-container">
        <div className="flashcardtravel-instructions" style={{ color: TRAVEL_ACCENT }}>
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`flashcardtravel-card ${animDirection ? 'slide-' + animDirection : ''}`}
          ref={cardRef}
          style={{ background: TRAVEL_COLOR, boxShadow: "0 4px 30px #a78bfa77" }}
        >
          <div className="flashcardtravel-category" style={{ background: TRAVEL_ACCENT }}>
            {flashcard.category}
          </div>
          <div className="flashcardtravel-word">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span style={{ fontWeight: 600, fontSize: "2rem" }}>
              {flashcard.german}
            </span>
          </div>
          <div className="flashcardtravel-translation">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="flashcardtravel-use">{flashcard.use}</div>
          )}
        </div>
        <div className="flashcardtravel-progress">
          Flashcards Known: {knownCount} of {vocabularyTravel.length}
        </div>
        <div className="flashcardtravel-actions">
          <button
            className="flashcardtravel-btn again"
            onClick={() => handleAction('studyAgain')}
            style={{ background: "#ddd6fe", color: TRAVEL_ACCENT }}
          >
            STUDY AGAIN
          </button>
          <button
            className="flashcardtravel-btn know"
            onClick={() => handleAction('know')}
            style={{ background: "#c4b5fd", color: TRAVEL_ACCENT }}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
