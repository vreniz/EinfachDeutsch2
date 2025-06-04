// src/pages/Flashcards2.tsx
// Este componente está usando imágenes que vienen de public/images en formato png 
// Este componente cambió de donde se conecta con el fake backend ahora se conecta con el fake VocabularyDataS2
import React, { useState, useRef } from 'react';
import { vocabularyWords } from '../../data/VocabularyDataS2';
import type { FlashcardWord } from '../../data/VocabularyDataS2';

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

      const newQueue = [...queue];
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
      <div className="flex flex-col items-center min-h-[450px]">
        <div className="w-[95vw] sm:w-[555px] max-w-[98vw] min-h-[330px] bg-sky-400 rounded-[2.2rem] mt-8 mb-9 shadow-[0_4px_30px_rgba(23,91,255,0.19)] text-white p-6 sm:p-10 flex flex-col items-center transition-all duration-300 ease-out break-words">
          <div className="bg-blue-700 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide box-border">¡Well Done!</div>
          <div className="text-xl font-bold text-white text-center mt-10 mb-10 leading-5 break-words text-[20px]">You've completed all the flashcards! 🎉<br /> Keep up the good work!</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer border-none text-lg min-w-[140px]" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
    );
  }

  const flashcard = queue[currentIndex];

  return (
    <div className="flex flex-col items-center min-h-[450px]">
      <div className="text-center text-lg text-slate-600 py-2 px-1 mt-5 mb-[-0.5rem] max-w-[98vw] break-words leading-6 max-sm:text-base max-sm:py-2 max-sm:px-1 max-sm:mt-5 max-sm:mb-[-0.5rem] max-sm:max-w-[98vw] max-sm:break-words max-sm:text-center max-sm:leading-6">
        Press 'Know' if you know it, or 'Study Again' to review.
      </div>
      <div
        className={`w-[95vw] sm:w-[555px] max-w-[98vw] min-h-[330px] bg-blue-500 rounded-[2.2rem] mt-8 mb-9 shadow-[0_4px_30px_rgba(23,91,255,0.19)] text-white p-6 sm:p-10 flex flex-col items-center transition-all duration-300 ease-out break-words ${
          animDirection === 'right' ? 'transform translate-x-80 rotate-[18deg] opacity-0' : 
          animDirection === 'left' ? 'transform -translate-x-80 rotate-[-18deg] opacity-0' : ''
        }`}
        ref={cardRef}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="bg-blue-700 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide box-border max-sm:text-lg max-sm:py-2 max-sm:px-3">
          {flashcard.category.charAt(0) + flashcard.category.slice(1).toLowerCase()}
        </div>
        <div className="flex flex-col items-center gap-4 my-5 w-full max-w-full">
          {flashcard.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={flashcard.imageUrl}
                alt={flashcard.german}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl border-2 border-white/20 bg-white/10 p-2"
              />
            </div>
          )}
          <div className="text-2xl sm:text-3xl font-bold tracking-wide text-center break-words whitespace-normal hyphens-auto px-2">
            {flashcard.german}
          </div>
        </div>
        <div className="text-xl my-1 text-blue-100 max-sm:text-lg">{flashcard.translation}</div>
        <div className="text-lg mt-4 text-blue-50 leading-6 max-sm:text-base max-sm:leading-5 max-sm:max-w-[99%]">{flashcard.use}</div>
      </div>
      {/* Contador SOLO de las conocidas */}
      <div className="text-lg font-semibold text-slate-700 mb-6">
        Flashcards Known: {knownCount} of {totalCountRef.current}
      </div>
      <div className="flex gap-8 flex-wrap justify-center max-sm:flex-col max-sm:gap-5">
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer border-none text-lg min-w-[140px] max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3" onClick={() => handleAction('studyAgain')}>STUDY AGAIN</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer border-none text-lg min-w-[140px] max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3" onClick={() => handleAction('know')}>KNOW</button>
      </div>
    </div>
  );
}
