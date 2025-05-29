// src/pages/FlashcardsSchool.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NAVBAR';
import { vocabularySchool } from '../../data/VocabularySchool';

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
    setQueue([...vocabularySchool]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  // ← SCHOOL button
  function BackButton() {
    return (
      <button
        className="flex items-center gap-2.5 bg-amber-400 border-none py-3 px-8 rounded-3xl font-bold text-xl text-white mt-8 ml-8 mb-5 cursor-pointer shadow-[0_4px_18px_rgba(251,191,36,0.47)] transition-all duration-150 outline-none tracking-wide self-start hover:bg-yellow-500 hover:shadow-[0_8px_28px_rgba(251,191,36,0.73)] hover:scale-105 focus:bg-yellow-500 focus:shadow-[0_8px_28px_rgba(251,191,36,0.73)] focus:scale-105"
        onClick={() => navigate('/practice')}
      >
        <span className="text-2xl mr-1">←</span>
        <span>SCHOOL</span>
      </button>
    );
  }

  if (queue.length === 0) {
    return (
      <div>
        <Navbar />
        <BackButton />
        <div className="flex flex-col items-center min-h-[450px]">
          <div className="w-[95vw] sm:w-[570px] max-w-[98vw] min-h-[360px] bg-amber-200 rounded-[2.2rem] mb-9 mt-5 shadow-[0_4px_30px_rgba(251,191,36,0.47)] text-amber-800 p-6 sm:p-10 pt-8 flex flex-col items-center transition-all duration-300 break-words">
            <div className="bg-amber-800 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide text-white">
              ¡Well Done!
            </div>
            <div className="text-2xl font-bold mt-10 mb-10 text-center leading-5 text-amber-800">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="bg-amber-400 text-amber-800 mt-10 mx-auto block text-lg font-bold py-3.5 px-10 border-none rounded-3xl shadow-[0_2px_14px_rgba(180,83,9,0.27)] cursor-pointer transition-all duration-200 hover:bg-amber-200 hover:text-white" onClick={handleRestart}>
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
          className="w-[90px] h-[83px] object-cover -mr-2 align-middle"
        />
      );
    }
    return (
      <span className="text-5xl mr-2.5">{img}</span>
    );
  }

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="flex flex-col items-center min-h-[450px]">
        <div className="mt-6 text-amber-700 text-lg opacity-90 text-center mb-3 font-semibold tracking-wide">
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`w-[95vw] sm:w-[570px] max-w-[98vw] min-h-[360px] bg-amber-400 rounded-[2.2rem] mb-9 mt-5 shadow-[0_4px_30px_rgba(251,191,36,0.47)] text-white p-6 sm:p-10 pt-8 flex flex-col items-center transition-all duration-300 break-words ${
            animDirection === 'right' 
              ? 'transform translate-x-80 rotate-[18deg] opacity-0' 
              : animDirection === 'left' 
              ? 'transform -translate-x-80 -rotate-[18deg] opacity-0' 
              : ''
          }`}
          ref={cardRef}
        >
          <div className="bg-amber-800 rounded-t-2xl py-3 px-6 -mt-10 mb-6 text-xl font-bold w-full text-center tracking-wide text-white">
            {flashcard.category}
          </div>
          <div className="text-2xl font-bold mt-5 mb-1 tracking-wide flex items-center justify-center gap-4 flex-wrap break-words w-full text-center">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span className="font-semibold text-3xl">
              {flashcard.german}
            </span>
          </div>
          <div className="text-xl mt-1 mb-4 text-white">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="text-lg mt-4 text-white leading-6 text-center max-w-[95%] break-words whitespace-normal block">{flashcard.use}</div>
          )}
        </div>
        <div className="font-semibold mb-6 text-amber-700 text-lg">
          Flashcards Known: {knownCount} of {vocabularySchool.length}
        </div>
        <div className="w-full flex justify-around mt-5 max-sm:flex-col max-sm:gap-5">
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-amber-200 text-amber-700 shadow-[0_2px_14px_rgba(251,191,36,0.4)] transition-colors duration-150 hover:text-white max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3 max-sm:px-0"
            onClick={() => handleAction('studyAgain')}
          >
            STUDY AGAIN
          </button>
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-amber-400 text-amber-700 shadow-[0_2px_14px_rgba(251,191,36,0.4)] transition-colors duration-150 hover:text-white max-sm:text-base max-sm:w-[95%] max-sm:mx-auto max-sm:py-3 max-sm:px-0"
            onClick={() => handleAction('know')}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
