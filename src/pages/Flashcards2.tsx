// src/pages/Flashcards2.tsx
// este componente esta usando imagenes que vienen de public/images en formato png 
//este componente cambio de donde se conecta con el fake backend ahora se conecta con el fake VocabularyData2
// src/pages/Flashcards.tsx
import React, { useState, useRef } from 'react';
import { vocabularyWords } from '../data/VocabularyDataS2';
import type { FlashcardWord } from '../data/VocabularyDataS2';
import './Flashcards.css';

function getInitialQueue(words: FlashcardWord[]) {
  return [...words];
}

export default function Flashcards() {
  const [queue, setQueue] = useState(getInitialQueue(vocabularyWords));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | ''>('');
  const [knownCount, setKnownCount] = useState(0); // <- contador de conocidas
  const cardRef = useRef<HTMLDivElement>(null);
  const totalCountRef = useRef(vocabularyWords.length);

  function handleAction(action: 'know' | 'studyAgain') {
    setAnimDirection(action === 'know' ? 'right' : 'left');
    setTimeout(() => {
      setAnimDirection('');
      if (queue.length === 0) return;

      let newQueue = [...queue];
      if (action === 'know') {
        newQueue.splice(currentIndex, 1);
        setKnownCount(kc => kc + 1); // <-- suma 1 solo si conoció la tarjeta
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

  // Drag/swipe
  let startX = 0;
  function onTouchStart(e: React.TouchEvent | React.MouseEvent) {
    startX = ('touches' in e ? e.touches[0].clientX : e.clientX);
  }
  function onTouchEnd(e: React.TouchEvent | React.MouseEvent) {
    const endX = ('changedTouches' in e ? e.changedTouches[0].clientX : e.clientX);
    const diff = endX - startX;
    if (diff > 80) handleAction('know');
    else if (diff < -80) handleAction('studyAgain');
  }

  function handleRestart() {
    setQueue(getInitialQueue(vocabularyWords));
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0); // <--- Reinicia también aquí
  }

  if (queue.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-card flashcard-finished">
          <div className="flashcard-category">¡Well Done!</div>
          <div className="flashcard-word">You've completed all the flashcards! 🎉<br /> Keep up the good work!</div>
          <button className="flashcard-btn restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
    );
  }

  const flashcard = queue[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard-instructions">
        Press 'Know' if you know it, or 'Study Again' to review.
      </div>
      <div
        className={`flashcard-card ${animDirection ? 'slide-' + animDirection : ''}`}
        ref={cardRef}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flashcard-category">
          {flashcard.category.charAt(0) + flashcard.category.slice(1).toLowerCase()}
        </div>
        <div className="flashcard-word">
          {flashcard.imageUrl && (
            <img
              src={flashcard.imageUrl}
              alt={flashcard.german}
              className="flashcard-img"
            />
          )}
          <span style={{ fontWeight: 600, fontSize: "2rem", marginLeft: flashcard.imageUrl ? "0.5em" : 0 }}>
            {flashcard.german}
          </span>
        </div>
        <div className="flashcard-translation">{flashcard.translation}</div>
        <div className="flashcard-use">{flashcard.use}</div>
      </div>
      {/* Contador SOLO de las conocidas */}
      <div className="flashcard-progress">
        Flashcards Known: {knownCount} of {totalCountRef.current}
      </div>
      <div className="flashcard-actions">
        <button className="flashcard-btn again" onClick={() => handleAction('studyAgain')}>STUDY AGAIN</button>
        <button className="flashcard-btn know" onClick={() => handleAction('know')}>KNOW</button>
      </div>
    </div>
  );
}
