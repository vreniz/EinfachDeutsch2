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
      <div className="bg-white rounded-[2.2rem] border-none py-9 px-8 mx-auto mb-7 max-w-3xl w-[98vw] min-w-[230px] shadow-[0_6px_44px_0_rgba(51,65,85,0.12)] flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6 mt-0 text-center text-slate-800 tracking-wide">
          {boards[current].title}
        </h2>
        <div className="text-base text-slate-800 mx-auto text-center max-w-[680px] break-words leading-6">
          {boards[current].content}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 my-5">
        <button
          className="w-12 h-12 bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xl cursor-pointer transition-all duration-200 flex items-center justify-center border-none"
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          &lt;
        </button>
        <div className="flex gap-2">
          {boards.map((_, idx) => (
            <button
              key={idx}
              className={`w-10 h-10 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none ${
                current === idx
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className="w-12 h-12 bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xl cursor-pointer transition-all duration-200 flex items-center justify-center border-none"
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
