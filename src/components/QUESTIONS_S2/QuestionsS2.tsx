import { useState } from "react";
import { questions } from "../../data/QuestionsData";

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-8 sm:px-6 py-8 sm:py-6 max-w-[800px] mx-auto flex flex-col items-center">
      <div className="mt-4 sm:mt-2 text-slate-600 text-lg sm:text-base font-medium text-center mb-6 sm:mb-4 max-w-[96%] sm:max-w-[98%] sm:px-2 sm:break-words tracking-wider">
        Choose the only correct answer to the following questions.
      </div>

      {finished ? (
        <div className="text-center font-bold text-green-600 text-3xl mt-12 leading-tight">
          <div className="text-green-600 font-bold text-3xl mt-12 leading-tight">
            🎉 You've completed all the questions! <br />
            <span className="text-[1.1rem]">Well done!</span>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-12 py-3 rounded-2xl border-none cursor-pointer mt-6 shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:scale-105"
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
          <div className="w-full flex justify-end pr-6 sm:pr-2 -mb-4 sm:-mb-2">
            <span className="text-blue-800 font-bold text-2xl tracking-wider select-none">{current + 1}/{questions.length}</span>
          </div>
          <div className="flex flex-col items-center w-[97%] sm:w-full mx-auto mb-3 sm:mb-2 bg-transparent">
            <div className="bg-blue-500 text-white text-[1.35rem] sm:text-base font-bold px-5 sm:px-3 py-4 sm:py-3 rounded-3xl sm:rounded-2xl mb-7 sm:mb-5 w-full max-w-[95vw] sm:max-w-[99vw] min-w-0 text-center shadow-[0_2px_14px_rgba(59,130,246,0.25)] break-words whitespace-normal overflow-wrap-break-word">
              <span className="text-rose-600 font-bold text-[1.4rem] sm:text-lg">❓</span>{" "}
              {q.question}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3 lg:gap-6 w-full justify-items-center my-4 px-2 sm:px-0">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`bg-sky-400 text-white font-bold text-lg sm:text-base px-6 sm:px-4 py-4 sm:py-3 border-none rounded-2xl sm:rounded-xl w-full max-w-full text-center transition-all duration-200 cursor-pointer outline-none shadow-[0_2px_14px_rgba(56,189,248,0.25)] flex items-center gap-3 break-words hover:shadow-[0_4px_20px_rgba(56,189,248,0.35)] transform hover:scale-[1.02] ${
                    selected === idx ? "bg-sky-300 text-blue-900 shadow-[0_4px_20px_rgba(56,189,248,0.35)]" : ""
                  } ${
                    checked && idx === q.answer ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(34,197,94,0.35)]" : ""
                  } ${
                    checked && selected === idx && idx !== q.answer ? "bg-red-400 text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)]" : ""
                  }`}
                  onClick={() => handleSelect(idx)}
                  disabled={checked}
                >
                  <span className="font-bold text-[1.1em] tracking-wider whitespace-nowrap">{letter(idx)}</span> 
                  <span className="text-left">{opt}</span>
                </button>
              ))}
            </div>
            <button
              className={`border-none rounded-2xl font-bold text-xl sm:text-base px-12 sm:px-8 py-3 sm:py-2 cursor-pointer mt-6 sm:mt-4 transition-all duration-200 tracking-wider ${
                selected === null || checked 
                  ? "bg-blue-200 text-white cursor-not-allowed shadow-[0_2px_8px_rgba(148,163,184,0.25)]" 
                  : "bg-blue-500 text-white shadow-[0_2px_14px_rgba(59,130,246,0.25)] hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] transform hover:scale-105"
              }`}
              onClick={handleCheck}
              disabled={selected === null || checked}
            >
              CHECK
            </button>
            {checked && (
              <div className="mt-5 text-[1.18rem] font-bold">
                {selected === q.answer ? (
                  <span className="text-emerald-500">✅ Correct!</span>
                ) : (
                  <span className="text-rose-600">❌ Try again.</span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap sm:flex-wrap items-center justify-center mt-8 sm:mt-6 gap-4 sm:gap-2">
            <button 
              onClick={handlePrev} 
              disabled={current === 0} 
              className={`bg-transparent text-blue-500 text-[2.3rem] sm:text-2xl border-none cursor-pointer px-2 font-bold leading-none select-none transition-all duration-200 ${
                current === 0 ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 transform hover:scale-110"
              }`}
            >
              {'<'}
            </button>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleNav(idx)}
                className={`border-none rounded-lg sm:rounded-md font-bold text-[1.1rem] sm:text-base mx-1 sm:mx-0.5 w-[42px] h-[42px] sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 flex items-center justify-center p-0 shadow-sm ${
                  idx === current 
                    ? "bg-blue-600 text-white shadow-[0_2px_8px_rgba(59,130,246,0.35)] scale-110" 
                    : "bg-blue-100 hover:bg-blue-200 text-blue-700 hover:shadow-[0_2px_8px_rgba(59,130,246,0.25)] transform hover:scale-105"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              onClick={handleNext} 
              disabled={current === questions.length - 1} 
              className={`bg-transparent text-blue-500 text-[2.3rem] sm:text-2xl border-none cursor-pointer px-2 font-bold leading-none select-none transition-all duration-200 ${
                current === questions.length - 1 ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 transform hover:scale-110"
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