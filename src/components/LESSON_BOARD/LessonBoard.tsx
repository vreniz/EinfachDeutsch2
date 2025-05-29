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
      <div className="flex justify-center items-center gap-4 my-5">
        <button
          className={`w-12 h-12 rounded-xl font-bold text-xl transition-all duration-200 shadow-sm border-none ${
            current === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700 hover:shadow-[0_2px_8px_rgba(71,85,105,0.35)] transform hover:scale-110"
          }`}
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          &lt;
        </button>
        <div className="flex gap-2">
          {boards.map((_, idx) => (
            <button
              key={idx}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 border-none shadow-sm ${
                current === idx
                  ? "bg-slate-600 text-white shadow-[0_2px_8px_rgba(71,85,105,0.35)] scale-110"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-[0_2px_8px_rgba(107,114,128,0.25)] transform hover:scale-105"
              }`}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className={`w-12 h-12 rounded-xl font-bold text-xl transition-all duration-200 shadow-sm border-none ${
            current === boards.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700 hover:shadow-[0_2px_8px_rgba(71,85,105,0.35)] transform hover:scale-110"
          }`}
          onClick={() => setCurrent((prev) => Math.min(prev + 1, boards.length - 1))}
          disabled={current === boards.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LessonBoard;
