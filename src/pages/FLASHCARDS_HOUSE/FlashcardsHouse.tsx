// src/pages/FlashcardsHouse.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NAVBAR';
import { vocabularyHouse } from '../../data/VocabularyHouse';

export default function FlashcardsHouse() {
  const [queue, setQueue] = useState([...vocabularyHouse]);
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

      const newQueue = [...queue];
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
    setQueue([...vocabularyHouse]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  function BackButton() {
    return (
      <button
        className="flex items-center gap-2.5 bg-pink-400 border-none py-3 px-8 rounded-3xl font-bold text-xl text-white mt-8 ml-8 mb-5 cursor-pointer shadow-[0_4px_18px_rgba(244,114,182,0.47)] transition-all duration-150 outline-none tracking-wide self-start hover:bg-pink-500 hover:shadow-[0_8px_28px_rgba(244,114,182,0.73)] hover:scale-105 focus:bg-pink-500 focus:shadow-[0_8px_28px_rgba(244,114,182,0.73)] focus:scale-105"
        onClick={() => navigate('/practice')}
      >
        <span className="text-2xl mr-1">←</span>
        <span>HOUSE</span>
      </button>
    );
  }

  function renderFlashcardImage(img: string | undefined, alt: string) {
    if (!img) return null;
    if (img.startsWith("/") || img.startsWith("http")) {
      return (
        <div className="flex-shrink-0 mb-4">
          <img
            src={img}
            alt={alt}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl border-2 border-white/20 bg-white/10 p-2 mx-auto"
          />
        </div>
      );
    }
    return (
      <span className="text-5xl mb-4">{img}</span>
    );
  }

  if (queue.length === 0) {
    return (
      <div>
        <Navbar />
        <BackButton />
        <div className="flex flex-col items-center min-h-[450px]">
          <div className="w-[95vw] sm:w-[570px] max-w-[98vw] min-h-[360px] bg-pink-200 rounded-[2.2rem] mb-9 mt-5 shadow-[0_4px_30px_rgba(244,114,182,0.47)] text-pink-800 p-6 sm:p-10 pt-8 flex flex-col items-center transition-all duration-300 break-words">
            <div className="bg-pink-700 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide text-white">
              ¡Well Done!
            </div>
            <div className="text-2xl font-bold mt-10 mb-10 text-center leading-5 text-pink-800">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="bg-pink-400 text-pink-800 mt-10 mx-auto block text-lg font-bold py-3.5 px-10 border-none rounded-3xl shadow-[0_2px_14px_rgba(173,20,87,0.27)] cursor-pointer transition-all duration-200 hover:bg-pink-200 hover:text-white" onClick={handleRestart}>
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
      <div className="flex flex-col items-center min-h-[450px]">
        <div className="mt-6 text-pink-700 text-lg opacity-90 text-center mb-3 font-semibold tracking-wide">
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`w-[95vw] sm:w-[570px] max-w-[98vw] min-h-[360px] bg-pink-400 rounded-[2.2rem] mb-9 mt-5 shadow-[0_4px_30px_rgba(244,114,182,0.47)] text-white p-6 sm:p-10 pt-8 flex flex-col items-center transition-all duration-300 break-words ${
            animDirection === 'right' 
              ? 'transform translate-x-80 rotate-[18deg] opacity-0' 
              : animDirection === 'left' 
              ? 'transform -translate-x-80 -rotate-[18deg] opacity-0' 
              : ''
          }`}
          ref={cardRef}
        >
          <div className="bg-pink-700 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide text-white">
            {flashcard.category}
          </div>
          <div className="flex flex-col items-center w-full text-center mt-5 mb-1">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <div className="text-2xl sm:text-3xl font-bold tracking-wide break-words px-2">
              {flashcard.german}
            </div>
          </div>
          <div className="text-xl mt-1 mb-4 text-white">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="text-lg mt-4 text-white leading-6 text-center max-w-[95%] break-words whitespace-normal block">{flashcard.use}</div>
          )}
        </div>
        <div className="font-semibold mb-6 text-pink-700 text-lg">
          Flashcards Known: {knownCount} of {vocabularyHouse.length}
        </div>
        <div className="w-full flex justify-around mt-5 max-sm:flex-col max-sm:gap-5">
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-pink-200 text-pink-700 shadow-[0_2px_14px_rgba(244,114,182,0.4)] transition-colors duration-150 hover:text-white max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3 max-sm:px-0"
            onClick={() => handleAction('studyAgain')}
          >
            STUDY AGAIN
          </button>
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-pink-300 text-pink-700 shadow-[0_2px_14px_rgba(244,114,182,0.4)] transition-colors duration-150 hover:text-white max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3 max-sm:px-0"
            onClick={() => handleAction('know')}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
