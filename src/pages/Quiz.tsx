import { useState } from "react";
import { quizQuestions } from "../data/quiz1";
import klausIntro from "../assets/KlausIntro2.png";
import klausScore from "../assets/KlausSc.png";
import MarkAsDoneButton from "./MarkAsDoneButton";
import BadgeUnlocked from "./BadgeUnlocked1";

type QuizProps = {
  quizDone: boolean;
  setQuizDone: () => void;
  sectionDone: boolean;
  setSectionDone: () => void;
};

function getRandomQuestions(arr: any[], n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function Quiz({ quizDone, setQuizDone, sectionDone, setSectionDone }: QuizProps) {
  const [step, setStep] = useState<"intro" | "quiz" | "score">("intro");
  const [randomQuestions, setRandomQuestions] = useState(() =>
    getRandomQuestions(quizQuestions, 7)
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [, setAnswers] = useState<number[]>([]);
  const [showBadge, setShowBadge] = useState(false);

  function restartQuiz() {
    setRandomQuestions(getRandomQuestions(quizQuestions, 7));
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setCorrect(0);
    setStep("intro");
    setAnswers([]);
    // No resetees quizDone ni sectionDone porque son globales
  }

  if (step === "intro") {
    return (
      <div className="flex flex-col items-center mt-12 mb-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-3 lg:gap-4">
          <div className="bg-gradient-to-br from-blue-500 via-blue-500 to-cyan-400 text-white rounded-[2.5rem] p-8 lg:p-9 font-bold text-justify shadow-[0_6px_32px_rgba(59,130,246,0.25)] max-w-[820px] w-full lg:ml-28 overflow-wrap-break-word word-break-break-word order-2 lg:order-1">
            <div className="text-center">
              <span className="text-white bg-blue-800 rounded-lg px-3 py-2 mr-1.5 text-xl shadow-[0_2px_8px_rgba(30,64,175,0.3)]">
                INSTRUCTIONS
              </span>
            </div>
            <br /><br />
            <b>
              <span>Hi there! Now that you've completed the lessons and activities, <br />
              it's time to start your quiz. </span>
              <span className="text-yellow-300">Remember</span>
              {", you'll need at least "}
              <span className="text-green-300">50%</span>
              {" to move on to the next section."}
            </b>
            <br /><br />
            <span className="text-cyan-100">Good luck — you're going to do <b className="text-white">great</b>! 🚀</span>
            <br />
            <span className="text-white">
              If you don't pass, you can always go back, review the lesson and activities,<br /> and <b className="text-green-300"> try again</b>.
            </span>
          </div>
          <img 
            src={klausIntro} 
            alt="Klaus" 
            className="w-[150px] h-auto max-w-none min-w-0 block mt-0 lg:-mt-6 lg:-ml-[3.8rem] drop-shadow-[0_8px_32px_rgba(56,189,248,0.5)] order-1 lg:order-2"
          />
        </div>
        <button 
          className="mt-9 bg-orange-400 text-white border-none rounded-[2.5rem] font-bold text-2xl px-14 py-4 cursor-pointer shadow-[0_4px_20px_rgba(251,146,60,0.35)] transition-all duration-200 hover:bg-orange-500 hover:shadow-[0_6px_28px_rgba(251,146,60,0.45)] transform hover:scale-105 w-full max-w-sm lg:w-auto"
          onClick={() => setStep("quiz")}
        >
          START QUIZ
        </button>
      </div>
    );
  }

  const q = randomQuestions[current];

  function handleSelect(idx: number) {
    setSelected(idx);
    setChecked(false);
  }

  function handleCheck() {
    if (selected !== null) {
      setChecked(true);
      if (selected === q.answer) {
        setCorrect((c) => c + 1);
      }
      setAnswers((a) => [...a, selected]);
    }
  }

  function handleNext() {
    setChecked(false);
    setSelected(null);
    if (current < randomQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setStep("score");
    }
  }

  // Mostrar pantalla de badge (cuando get badge se presiona)
  if (showBadge) {
    return (
      <BadgeUnlocked
        done={sectionDone}
        onFinish={setSectionDone}
      />
    );
  }

  // Score view
  if (step === "score") {
    const score = Math.round((correct / randomQuestions.length) * 100);
    const passed = score >= 50;

    return (
      <div className="flex flex-col items-center min-h-[55vh] justify-center my-10 w-full">
        <div className="mb-5 text-center">
          <div className="font-bold text-blue-800 text-[2.1rem] tracking-[2px]">QUIZ</div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 mb-5 w-full max-w-[430px]">
          <div className="flex items-center justify-start min-w-[150px] drop-shadow-[0_8px_32px_rgba(56,189,248,0.5)]">
            <img src={klausScore} alt="Klaus" className="w-[145px] mx-auto block" />
          </div>
          <div className="font-bold text-blue-800 text-center mb-8">
            <span className="font-bold text-[2.6rem] text-blue-800">SCORE</span>
            <br />
            <span className="font-bold text-[4rem] text-blue-800">{score}%</span>
          </div>
        </div>
        {passed ? (
          <div className="flex flex-col gap-4 items-center">
            <MarkAsDoneButton
              done={quizDone}
              onClick={setQuizDone}
              label="Mark quiz as done"
            />
            <button 
              className="bg-orange-400 text-white border-none rounded-2xl font-bold text-[1.15rem] px-9 py-3 cursor-pointer transition-all duration-200 hover:bg-orange-500 hover:shadow-[0_4px_25px_rgba(251,146,60,0.4),_0_2px_12px_rgba(251,146,60,0.3)] transform hover:scale-105 shadow-[0_3px_20px_rgba(251,146,60,0.25)]"
              onClick={() => setShowBadge(true)}
            >
              GET BADGE
            </button>
          </div>
        ) : (
          <button 
            className="bg-yellow-400 text-white border-none rounded-2xl font-bold text-[1.18rem] px-10 py-3 cursor-pointer shadow-[0_2px_14px_rgba(250,204,21,0.25)] my-4 mx-2 transition-all duration-200 hover:bg-yellow-500 hover:shadow-[0_4px_20px_rgba(250,204,21,0.35)] transform hover:scale-105"
            onClick={restartQuiz}
          >
            TRY AGAIN
          </button>
        )}
      </div>
    );
  }

  // Quiz pregunta a pregunta
  return (
    <div className="flex flex-col items-center min-h-[55vh] justify-start my-10 w-full">
      <div className="flex items-center gap-10 mb-3 text-[2.2rem] font-bold text-blue-800">
        <span className="text-[1.7rem]">QUIZ</span>
      </div>
      <div className="bg-white rounded-[2.3rem] text-blue-700 shadow-[0_6_32px_rgba(59,130,246,0.12)] my-3 px-9 py-9 max-w-[800px] min-w-[380px] w-full break-words text-center flex flex-col items-center transition-all duration-200 border border-blue-50">
        <span className="text-2xl ml-auto font-bold text-blue-700">{current + 1}/7</span>
        <div className="text-slate-600 text-[1.18rem] font-medium mb-6 -mt-1 text-center tracking-wider">
          Choose the only correct answer to the following questions.
        </div>
        <div className="bg-blue-500 text-white text-[1.35rem] font-bold px-5 py-4 rounded-3xl mb-7 w-full max-w-[650px] min-w-[180px] text-center inline-block shadow-[0_2px_14px_rgba(59,130,246,0.25)] overflow-wrap-break-word break-words whitespace-pre-line">
          <span className="text-rose-600 font-bold text-[1.4rem]">❓</span>{" "}
          {q.question}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-9 w-full justify-items-center my-4">
          {q.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              className={
                `bg-sky-400 text-white font-bold text-[1.08rem] px-5 py-4 border-none rounded-[1.8rem] min-w-[180px] max-w-[320px] w-full my-1 mx-2 cursor-pointer transition-all duration-200 text-left shadow-[0_2px_14px_rgba(56,189,248,0.25)] flex items-center justify-start break-words hover:shadow-[0_4px_20px_rgba(56,189,248,0.35)] transform hover:scale-[1.02] ${
                  selected === idx ? "bg-sky-300 text-blue-900 shadow-[0_4px_20px_rgba(56,189,248,0.35)]" : ""
                } ${
                  checked && selected === idx && selected === q.answer ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(34,197,94,0.35)]" : ""
                } ${
                  checked && selected === idx && selected !== q.answer ? "bg-red-400 text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)]" : ""
                }`
              }
              onClick={() => handleSelect(idx)}
              disabled={checked}
            >
              <span className="font-bold mr-2 text-[1.11rem] tracking-wider whitespace-nowrap">
               {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        <button
          className={`border-none rounded-2xl font-bold text-[1.13rem] px-12 py-3 cursor-pointer my-7 mx-auto transition-all duration-200 block tracking-wider ${
            selected === null || checked 
              ? "bg-blue-200 text-white cursor-not-allowed shadow-[0_2px_8px_rgba(148,163,184,0.25)]" 
              : "bg-blue-500 text-white shadow-[0_2px_14px_rgba(59,130,246,0.25)] hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] transform hover:scale-105"
          }`}
          onClick={handleCheck}
          disabled={selected === null || checked}
        >
          {current === randomQuestions.length - 1 ? "FINISH" : "CHECK"}
        </button>
        {checked && (
          <div className="text-[1.18rem] mt-5 font-bold">
            {selected === q.answer ? (
              <span className="text-emerald-500">✅ Correct!</span>
            ) : (
              <span className="text-rose-600">❌ Incorrect.</span>
            )}
          </div>
        )}
        {checked && (
          <button
            className="bg-blue-500 text-white border-none rounded-2xl font-bold text-[1.13rem] px-12 py-3 cursor-pointer mt-3 mx-auto transition-all duration-200 block shadow-[0_2px_14px_rgba(59,130,246,0.25)] tracking-wider hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] transform hover:scale-105"
            onClick={handleNext}
          >
            {current === randomQuestions.length - 1 ? "Show Score" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
