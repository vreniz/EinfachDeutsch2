import { useState } from "react";
import { questions } from "../data/QuestionsData.ts";

const letter = (idx: number) => String.fromCharCode(65 + idx) + "."; // A., B., C., D.

export default function Questions() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setChecked(false);
  };

  const handleCheck = () => {
    if (selected !== null) {
      setChecked(true);
      // Si está en la última pregunta y presiona CHECK
      if (current === questions.length - 1) {
        setTimeout(() => setFinished(true), 800); // Pequeño delay para feedback
      }
    }
  };

  const handleNav = (idx: number) => {
    setCurrent(idx);
    setSelected(null);
    setChecked(false);
    setFinished(false);
  };

  const handlePrev = () => {
    if (current > 0) handleNav(current - 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) handleNav(current + 1);
  };

  const q = questions[current];

  return (
    <div className="bg-gray-100 rounded-[3.5rem] sm:rounded-[1.2rem] px-8 sm:px-1 py-6 sm:py-4 max-w-[800px] mx-auto shadow-lg shadow-blue-500/5 flex flex-col items-center">
      <div className="mt-8 sm:mt-4 text-blue-800 text-base sm:text-sm opacity-85 text-center mb-4 sm:mb-2 max-w-[96%] sm:max-w-[98%] sm:px-2 sm:break-words">
        Choose the only correct answer to the following questions.
      </div>

      {finished ? (
        <div className="text-center font-bold text-green-600 text-3xl mt-12 leading-tight">
          <div className="text-green-600 font-bold text-3xl mt-12 leading-tight">
            🎉 You've completed all the questions! <br />
            <span className="text-[1.1rem]">Well done!</span>
          </div>
          <button
            className="bg-blue-700 text-white font-bold text-xl px-12 py-3 rounded-2xl border-none cursor-pointer mt-6 shadow-lg shadow-blue-500/20 transition-colors duration-200 hover:bg-blue-800"
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setChecked(false);
              setFinished(false);
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-start pl-9 sm:pl-2 -mb-4 sm:-mb-2">
            <span className="text-blue-800 font-bold text-2xl tracking-wider select-none">{current + 1}/{questions.length}</span>
          </div>
          <div className="flex flex-col items-center w-[97%] sm:w-full mx-auto mb-3 sm:mb-2 bg-transparent">
            <div className="bg-blue-600 rounded-[2.5rem] sm:rounded-[1.2rem] text-white text-[1.45rem] sm:text-base font-bold my-3 sm:my-2 px-9 sm:px-2 py-4 sm:py-3 text-center max-w-[90vw] sm:max-w-[99vw] min-w-[350px] sm:min-w-0 shadow-lg shadow-blue-600/15 break-words whitespace-normal overflow-wrap-break-word">
              <span className="text-rose-600 font-bold text-[1.4rem]">❓</span>{" "}
              {q.question}
            </div>
            <div className="w-full flex flex-wrap sm:flex-col justify-center sm:items-stretch gap-4 sm:gap-2 mb-5 sm:mb-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`bg-cyan-400 text-white font-bold text-xl sm:text-base px-9 sm:px-3 py-4 sm:py-3 my-1 sm:my-1 mx-3 sm:mx-1 border-none rounded-[2.5rem] sm:rounded-[1.3rem] min-w-[260px] sm:min-w-0 text-center transition-all duration-200 cursor-pointer outline-none shadow-lg shadow-cyan-400/10 relative flex items-center gap-3 sm:break-words sm:max-w-[97vw] ${
                    selected === idx ? "bg-sky-400 text-blue-900 shadow-lg shadow-sky-400/15" : ""
                  } ${
                    checked && idx === q.answer ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" : ""
                  } ${
                    checked && selected === idx && idx !== q.answer ? "bg-red-400 text-white shadow-lg shadow-red-400/25" : ""
                  }`}
                  onClick={() => handleSelect(idx)}
                  disabled={checked}
                >
                  <span className="text-[1.1em] font-black">{letter(idx)}</span> {opt}
                </button>
              ))}
            </div>
            <button
              className={`bg-blue-700 text-white font-bold text-xl sm:text-base px-12 sm:px-6 py-3 sm:py-2 rounded-2xl sm:rounded-[1.2rem] border-none cursor-pointer mt-3 sm:mt-2 shadow-lg shadow-blue-500/20 transition-colors duration-200 ${
                selected === null || checked ? "bg-slate-400 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
              onClick={handleCheck}
              disabled={selected === null || checked}
            >
              CHECK
            </button>
            {checked && (
              <div className="mt-4 text-[1.1rem] font-bold text-green-600">
                {selected === q.answer ? "✅ Correct!" : "❌ Try again."}
              </div>
            )}
          </div>
          <div className="flex flex-wrap sm:flex-wrap items-center justify-center mt-4 sm:mt-2 gap-3 sm:gap-1">
            <button 
              onClick={handlePrev} 
              disabled={current === 0} 
              className={`bg-transparent text-sky-400 text-[2.3rem] sm:text-2xl border-none cursor-pointer px-1 font-bold leading-none select-none transition-colors duration-200 ${
                current === 0 ? "text-slate-300 cursor-not-allowed" : "hover:text-sky-600"
              }`}
            >
              {'<'}
            </button>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleNav(idx)}
                className={`bg-sky-300 text-blue-900 border-none rounded-lg sm:rounded-md font-bold text-[1.1rem] sm:text-base mx-1 sm:mx-0.5 w-[42px] h-[42px] sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 flex items-center justify-center p-0 ${
                  idx === current ? "bg-sky-400 text-white" : "hover:bg-sky-400 hover:text-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              onClick={handleNext} 
              disabled={current === questions.length - 1} 
              className={`bg-transparent text-sky-400 text-[2.3rem] sm:text-2xl border-none cursor-pointer px-1 font-bold leading-none select-none transition-colors duration-200 ${
                current === questions.length - 1 ? "text-slate-300 cursor-not-allowed" : "hover:text-sky-600"
              }`}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}