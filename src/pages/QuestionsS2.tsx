import { useState } from "react";
import { questions } from "../data/QuestionsDataS2.ts";
import "./Questions.css";

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
    <div className="questions-outer">
      <div className="questions-instructions">
        Choose the only correct answer to the following questions.
      </div>

      {finished ? (
        <div className="questions-finished">
          <div className="questions-finished-msg">
            🎉 You've completed all the questions! <br />
            <span style={{ fontSize: "1.1rem" }}>Well done!</span>
          </div>
          {/* Opcional: reiniciar quiz */}
          <button
            className="questions-check"
            style={{ marginTop: 25 }}
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
          <div className="questions-header">
            <span className="questions-count">{current + 1}/{questions.length}</span>
          </div>
          <div className="questions-card">
            <div className="questions-question">
              <span style={{ color: "#e11d48", fontWeight: "bold", fontSize: "1.4rem" }}>❓</span>{" "}
              {q.question}
            </div>
            <div className="questions-options">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={
                    "questions-option" +
                    (selected === idx ? " selected" : "") +
                    (checked
                      ? idx === q.answer
                        ? " correct"
                        : selected === idx
                        ? " incorrect"
                        : ""
                      : "")
                  }
                  onClick={() => handleSelect(idx)}
                  disabled={checked}
                >
                  <span className="option-letter">{letter(idx)}</span> {opt}
                </button>
              ))}
            </div>
            <button
              className="questions-check"
              onClick={handleCheck}
              disabled={selected === null || checked}
            >
              CHECK
            </button>
            {checked && (
              <div className="questions-feedback">
                {selected === q.answer ? "✅ Correct!" : "❌ Try again."}
              </div>
            )}
          </div>
          <div className="questions-nav">
            <button onClick={handlePrev} disabled={current === 0} className="questions-arrow">{'<'}</button>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleNav(idx)}
                className={"questions-nav-btn" + (idx === current ? " active" : "")}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={handleNext} disabled={current === questions.length - 1} className="questions-arrow">{'>'}</button>
          </div>
        </>
      )}
    </div>
  );
}