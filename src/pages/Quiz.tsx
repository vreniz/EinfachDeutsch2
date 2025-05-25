import { useState } from "react";
import { quizQuestions } from "../data/quiz1";
import klausIntro from "../assets/KlausIntro2.png";
import klausScore from "../assets/KlausSc.png";
import MarkAsDoneButton from "./MarkAsDoneButton";
import './Quiz.css';
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
      <div className="quiz-intro-container">
          
        <div className="quiz-intro-row">
          <div className="quiz-cloud">
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
          <img src={klausIntro} alt="Klaus" className="klaus-intro-img" />
        </div>
        <button className="start-quiz-btn" onClick={() => setStep("quiz")}>
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
      <div className="quiz-score-container">
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontWeight: 700, color: "#1353bd", fontSize: "2.1rem", letterSpacing: 2 }}>QUIZ</div>
        </div>
        <div className="quiz-score-row">
          <div className="Klaus-contenedor">
            <img src={klausScore} alt="Klaus" className="klaus-score-img" />
          </div>
          <div className="quiz-score-main">
            <span style={{ fontWeight: 700, fontSize: "2.6rem", color: "#1353bd" }}>SCORE</span>
            <br />
            <span style={{ fontWeight: 700, fontSize: "4rem", color: "#1353bd" }}>{score}%</span>
          </div>
        </div>
        {passed ? (
          <div className="quiz-score-btns">
            <MarkAsDoneButton
              done={quizDone}
              onClick={setQuizDone}
              label="Mark quiz as done"
            />
            <button className="quiz-badge-btn" onClick={() => setShowBadge(true)}>
              GET BADGE
            </button>
          </div>
        ) : (
          <button className="quiz-tryagain-btn" onClick={restartQuiz}>
            TRY AGAIN
          </button>
        )}
      </div>
    );
  }

  // Quiz pregunta a pregunta
  return (
    <div className="quiz-main-container">
      <div className="quiz-header">
        <span className="quiz-title">QUIZ</span>
      </div>
      <div className="quiz-question-card">
        <span className="quiz-count">{current + 1}/7</span>
        <div className="quiz-instructions">
          Choose the only correct answer to the following questions.
        </div>
        <div className="quiz-question">
          <span style={{ color: "#e11d48", fontWeight: "bold", fontSize: "1.4rem" }}>❓</span>{" "}
          {q.question}
        </div>
        <div className="quiz-options">
          {q.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              className={
                "quiz-option" +
                (selected === idx ? " selected" : "") +
                (checked && selected === idx && selected === q.answer ? " correct" : "") +
                (checked && selected === idx && selected !== q.answer ? " incorrect" : "")
              }
              onClick={() => handleSelect(idx)}
              disabled={checked}
            >
              <span className="option-letter" style={{ marginRight: 8, whiteSpace: "nowrap" }}>
               {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        <button
          className="quiz-check-btn"
          onClick={handleCheck}
          disabled={selected === null || checked}
        >
          {current === randomQuestions.length - 1 ? "FINISH" : "CHECK"}
        </button>
        {checked && (
          <div className="quiz-feedback" style={{ marginTop: 10 }}>
            {selected === q.answer ? (
              <span style={{ color: "#10b981" }}>✅ Correct!</span>
            ) : (
              <span style={{ color: "#e11d48" }}>❌ Incorrect.</span>
            )}
          </div>
        )}
        {checked && (
          <button
            className="quiz-next-btn"
            style={{ marginTop: 10 }}
            onClick={handleNext}
          >
            {current === randomQuestions.length - 1 ? "Show Score" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
