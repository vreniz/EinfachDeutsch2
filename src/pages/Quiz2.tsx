import { useState } from "react";
import { quizQuestions } from "../data/quizS2"; // este tengo que cambiar la data a quiz 2 
import klausIntro from "../assets/KlausIntro2.png";
import klausScore from "../assets/KlausSc.png";
import MarkAsDoneButton from "./MarkAsDoneButton";
import BadgeUnlocked from "./BadgeUnlocked2";

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
      <div className="flex flex-col items-center my-12 mb-8">
          
        <div className="flex items-end justify-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 text-white rounded-[2.5rem] p-8 font-bold w-full max-w-4xl box-border text-justify shadow-[0_6px_28px_rgba(10,78,197,0.2),_0_1px_8px_rgba(56,189,248,0.16)] ml-28 relative break-words">
            <div>
              <div style={{ textAlign: "center" }}>
                <span style={{
                 color: "#ffffff", background: "#1769aa"
                 , borderRadius: 8, padding: "2px 8px", marginRight: 6,fontSize:"1.3rem"
                }}>
                  INSTRUCTIONS
                </span>
              </div>
              <br /><br />
              <b>
                <span>Hi there! Now that you've completed the lessons and activities, <br>
                </br>it's time to start your quiz. </span>

                <span style={{ color: "#ffd94d" }}>Remember</span>
                {", you'll need at least "}
                <span style={{ color: "#19ffa3" }}>50%</span>
                {" to move on to the next section."}
              </b>
              <br /><br />
              <span style={{ color: "#d1f7ff" }}>Good luck — you're going to do <b style={{ color: "#fff" }}>great</b>! 🚀</span>
              <br />
              <span style={{ color: "#fff" }}>
                If you don’t pass, you can always go back, review the lesson and activities,<br /> and <b style={{ color: "#19ffa3" }}> try again</b>.
              </span>
            </div>
          </div>
          <img src={klausIntro} alt="Klaus" className="w-[150px] h-auto block mt-[-1.5rem] ml-[-3.8rem] filter drop-shadow-[0_8px_32px_rgba(56,189,248,0.5)]" />
        </div>
        <button className="mt-9 bg-orange-400 text-white border-none rounded-[2.5rem] font-bold text-3xl py-4 px-14 cursor-pointer shadow-[0_2px_10px_rgba(255,167,91,0.2)] transition-colors duration-200 hover:bg-orange-500" onClick={() => setStep("quiz")}>
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
      <div className="flex flex-col items-center min-h-[50vh] justify-center my-10">
        <div className="mb-5 text-center">
          <div className="font-bold text-blue-700 text-4xl tracking-widest">QUIZ</div>
        </div>
        <div className="flex items-center gap-10 mb-5">
          <div className="flex items-center justify-start min-w-[150px] filter drop-shadow-[0_8px_32px_rgba(56,189,248,0.5)]">
            <img src={klausScore} alt="Klaus" className="w-[145px] mx-auto block" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-5xl text-blue-700">SCORE</span>
            <br />
            <span className="font-bold text-6xl text-blue-700">{score}%</span>
          </div>
        </div>
        {passed ? (
          <div className="flex flex-col gap-4 items-center">
            <MarkAsDoneButton
              done={quizDone}
              onClick={setQuizDone}
              label="Mark quiz as done"
            />
            <button className="bg-sky-400 text-white border-none rounded-[2rem] font-bold text-lg px-9 py-3 my-4 mx-5 cursor-pointer transition-colors duration-150 hover:bg-sky-500" onClick={() => setShowBadge(true)}>
              GET BADGE
            </button>
          </div>
        ) : (
          <button className="bg-amber-400 text-white border-none rounded-[2rem] font-bold text-lg px-10 py-3 my-4 mx-2 cursor-pointer transition-colors duration-150 hover:bg-amber-500" onClick={restartQuiz}>
            TRY AGAIN
          </button>
        )}
      </div>
    );
  }

  // Quiz pregunta a pregunta
  return (
    <div className="flex flex-col items-center min-h-[50vh] justify-center my-10">
      <div className="flex items-center gap-10 mb-5 text-xl font-bold text-blue-700">
        <span className="text-2xl font-bold tracking-widest">QUIZ</span>
      </div>
      <div className="bg-white rounded-[2.3rem] text-blue-700 shadow-[0_8px_32px_rgba(0,21,75,0.06),_0_2px_8px_rgba(0,21,75,0.04)] my-3 mx-0 mb-6 px-9 py-11 max-w-[900px] w-[95%] min-w-[340px] break-words text-center flex flex-col items-center">
        <span className="text-2xl ml-auto font-bold text-blue-700">{current + 1}/7</span>
        <div className="text-slate-600 text-lg font-medium mb-6 -mt-1 text-center tracking-wide">
          Choose the only correct answer to the following questions.
        </div>
        <div className="bg-blue-500 text-white text-xl font-bold px-5 py-4 rounded-3xl mb-7 w-full max-w-[650px] min-w-[180px] text-center inline-block shadow-[0_2px_12px_rgba(50,152,255,0.09)] break-words">
          <span className="text-rose-600 font-bold text-2xl">❓</span>{" "}
          {q.question}
        </div>
        <div className="flex flex-col gap-3 items-stretch w-full">
          {q.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              className={
                `bg-sky-400 text-white font-bold text-lg px-9 py-4 border-none rounded-[2rem] my-1 mx-2 cursor-pointer transition-colors duration-150 text-center shadow-[0_2px_12px_rgba(56,189,248,0.1)] w-full max-w-full min-w-0 whitespace-normal break-words box-border text-left ${
                  selected === idx ? "bg-sky-200 text-blue-800" : ""
                } ${
                  checked && selected === idx && selected === q.answer ? "bg-emerald-500 text-white" : ""
                } ${
                  checked && selected === idx && selected !== q.answer ? "bg-red-400 text-white" : ""
                }`
              }
              onClick={() => handleSelect(idx)}
              disabled={checked}
            >
              <span className="mr-2 whitespace-nowrap">
               {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-700 text-white border-none rounded-[2rem] font-bold text-lg px-10 py-3 cursor-pointer shadow-[0_2px_14px_rgba(10,78,197,0.2)] my-4 mx-2 transition-colors duration-150 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheck}
          disabled={selected === null || checked}
        >
          {current === randomQuestions.length - 1 ? "FINISH" : "CHECK"}
        </button>
        {checked && (
          <div className="text-lg mt-5 font-bold">
            {selected === q.answer ? (
              <span className="text-emerald-500">✅ Correct!</span>
            ) : (
              <span className="text-rose-600">❌ Incorrect.</span>
            )}
          </div>
        )}
        {checked && (
          <button
            className="bg-blue-700 text-white border-none rounded-[2rem] font-bold text-lg px-10 py-3 cursor-pointer shadow-[0_2px_14px_rgba(10,78,197,0.2)] mt-3 mx-2 transition-colors duration-150 hover:bg-blue-800"
            onClick={handleNext}
          >
            {current === randomQuestions.length - 1 ? "Show Score" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
