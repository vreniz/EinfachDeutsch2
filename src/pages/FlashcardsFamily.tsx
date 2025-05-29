// src/pages/FlashcardsFamily.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { vocabularyFamily } from '../data/VocabularyFamily';

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
    setQueue([...vocabularyFamily]);
    setCurrentIndex(0);
    setAnimDirection('');
    setKnownCount(0);
  }

  function BackButton() {
    return (
      <button
        className="flex items-center gap-2 bg-red-500 border-none py-3 px-8 rounded-3xl font-bold text-xl text-white mt-8 ml-8 mb-5 cursor-pointer shadow-lg hover:bg-red-600 hover:shadow-xl hover:scale-105 transition-all duration-150 outline-none tracking-wide self-start"
        onClick={() => navigate('/practice')}
      >
        <span className="text-xl">←</span>
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
          className="w-20 h-20 object-cover -mr-2 align-middle"
        />
      );
    }
    return (
      <span className="text-4xl mr-2">{img}</span>
    );
  }

  if (queue.length === 0) {
    return (
      <div>
        <Navbar />
        <BackButton />
        <div className="flex flex-col items-center min-h-screen pt-20">
          <div className="bg-red-100 text-red-800 p-10 rounded-3xl shadow-xl max-w-md w-full mx-auto text-center border-2 border-red-200">
            <div className="bg-red-700 text-white text-xl font-bold rounded-2xl rounded-b-none py-3 px-6 -mt-10 mb-6 w-full text-center tracking-wide box-border">
              ¡Well Done!
            </div>
            <div className="text-red-700 text-3xl font-bold mt-5 mb-1 tracking-wide flex items-center justify-center gap-4 flex-wrap break-words w-full text-center">
              You've completed all the flashcards! 🎉<br /> Keep up the good work!
            </div>
            <button className="bg-red-500 text-red-700 font-bold text-lg py-3 px-10 border-none rounded-3xl shadow-md cursor-pointer transition-colors duration-150 hover:bg-red-600 hover:text-white mx-auto mt-10 block" onClick={handleRestart}>
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
      <div className="flex flex-col items-center min-h-screen pt-20">
        <div className="text-red-700 text-lg font-medium mb-6 text-center tracking-wide">
          Press 'Know' if you know it, or 'Study Again' to review.
        </div>
        <div
          className={`bg-red-500 shadow-2xl p-10 rounded-3xl max-w-md w-full mx-auto text-center text-white relative transition-transform duration-300 ${animDirection === 'left' ? '-translate-x-full opacity-0' : animDirection === 'right' ? 'translate-x-full opacity-0' : ''} sm:w-[97vw] sm:min-w-0 sm:px-3 sm:py-8`}
          ref={cardRef}
        >
          <div className="bg-red-700 text-white text-xl font-bold rounded-2xl rounded-b-none py-3 px-6 -mt-10 mb-6 w-full text-center tracking-wide box-border">
            {flashcard.category}
          </div>
          <div className="text-white text-2xl font-bold mt-5 mb-1 tracking-wide flex items-center justify-center gap-4 flex-wrap break-words w-full text-center">
            {renderFlashcardImage(flashcard.imageUrl, flashcard.german)}
            <span className="font-semibold text-3xl">
              {flashcard.german}
            </span>
          </div>
          <div className="text-red-100 text-xl mt-1 mb-4">{flashcard.translation}</div>
          {flashcard.use && (
            <div className="text-red-100 text-lg mt-4 leading-relaxed text-center max-w-[95%] break-words whitespace-normal block">{flashcard.use}</div>
          )}
        </div>
        <div className="font-semibold mb-6 text-red-700 text-lg">
          Flashcards Known: {knownCount} of {vocabularyFamily.length}
        </div>
        <div className="w-full flex justify-around mt-5 sm:flex-col sm:gap-5">
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-red-300 text-red-700 shadow-md transition-colors duration-150 hover:text-white sm:text-base sm:w-[95%] sm:mx-auto sm:py-3 sm:px-0"
            onClick={() => handleAction('studyAgain')}
          >
            STUDY AGAIN
          </button>
          <button
            className="py-3 px-9 rounded-3xl border-none font-bold text-lg mx-5 cursor-pointer bg-red-400 text-red-700 shadow-md transition-colors duration-150 hover:text-white sm:text-base sm:w-[95%] sm:mx-auto sm:py-3 sm:px-0"
            onClick={() => handleAction('know')}
          >
            KNOW
          </button>
        </div>
      </div>
    </div>
  );
}
