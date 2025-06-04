import React, { useState } from "react";

type Board = {
  title: string;
  content: React.ReactNode;
};

interface LessonBoardProps {
  boards: Board[];
}

const LessonBoard: React.FC<LessonBoardProps> = ({ boards }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white rounded-[2.2rem] shadow-[0_6px_44px_rgba(51,65,85,0.12)] border border-slate-100 py-9 px-8 mx-auto mb-7 w-[570px] max-w-[98vw] min-w-[230px] flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6 mt-0 text-center text-slate-800 tracking-wide">
          {boards[current].title}
        </h2>
        <div className="text-base text-slate-700 mx-auto text-center max-w-[680px] break-words leading-6">
          {boards[current].content}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center w-[95vw] sm:w-full max-w-[95vw] px-2 sm:px-0">
        <button
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-lg sm:text-xl transition-all duration-200 shadow-sm flex-shrink-0 ${
            current === 0 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_2px_8px_rgba(59,130,246,0.35)] transform hover:scale-110"
          }`}
        >
          {"<"}
        </button>
        {boards.map((_, idx) => (
          <button
            key={idx}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-sm flex-shrink-0 ${
              idx === current 
                ? "bg-blue-700 text-white scale-110 shadow-[0_2px_8px_rgba(59,130,246,0.35)]" 
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-[0_2px_8px_rgba(59,130,246,0.25)] transform hover:scale-105"
            }`}
            onClick={() => setCurrent(idx)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrent((prev) => Math.min(prev + 1, boards.length - 1))}
          disabled={current === boards.length - 1}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-lg sm:text-xl transition-all duration-200 shadow-sm flex-shrink-0 ${
            current === boards.length - 1 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_2px_8px_rgba(59,130,246,0.35)] transform hover:scale-110"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default LessonBoard;
