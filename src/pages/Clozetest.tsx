// ClozeTest.tsx
import { useState } from "react";
import "./Clozetest.css"
import { clozeTestSets } from '../data/clozeTestData';


const ClozeTest = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const [result, setResult] = useState<null | boolean[]>(null);

  const setData = clozeTestSets[currentSet];

  const handleInputChange = (idx: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[idx] = value;
    setInputs(newInputs);
    setResult(null); // Borra resultado anterior si hay cambio
  };

  const handleOptionClick = (value: string) => {
    // Rellena el primer hueco vacío
    const firstEmpty = inputs.findIndex((val) => val === "");
    if (firstEmpty !== -1) handleInputChange(firstEmpty, value);
  };

  const handleCheck = () => {
    const res = inputs.map((input, idx) => input === setData.answers[idx]);
    setResult(res);
  };

  const handleNav = (dir: number) => {
    setCurrentSet(currentSet + dir);
    setInputs(["", "", "", ""]);
    setResult(null);
  };

  return (
    <div className="cloze-container">
      <div className="cloze-instructions">Select or type the words below in the correct order.</div>
      <div className="cloze-card">
        <div className="cloze-title">
          Vervollständige die Sätze (Complete the sentences):
        </div>
        <div className="cloze-sentences">
          {setData.sentences.map((sent, idx) => {
            const parts = sent.split("_____");
            return (
              <div className="cloze-sentence" key={idx}>
                {parts[0]}
                <input
                  className={`cloze-input ${
                    result ? (result[idx] ? "correct" : "incorrect") : ""
                  }`}
                  value={inputs[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  maxLength={16}
                />
                {parts[1]}
              </div>
            );
          })}
        </div>
        <button className="cloze-check" onClick={handleCheck}>
          CHECK
        </button>
        {result && (
          <div className="cloze-feedback">
            {result.every(Boolean)
              ? "All right! Well done!"
              : "Check your answers and try again."}
          </div>
        )}
      </div>
      <div className="cloze-options">
        {setData.options.map((option, idx) => (
          <button
            key={idx}
            className="cloze-option"
            onClick={() => handleOptionClick(option)}
            disabled={inputs.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="cloze-nav">
        <button
          onClick={() => handleNav(-1)}
          disabled={currentSet === 0}
          className="cloze-nav-btn"
        >
          {"<"}
        </button>
        {clozeTestSets.map((_, i) => (
          <button
            key={i}
            className={`cloze-nav-page ${
              i === currentSet ? "active" : ""
            }`}
            onClick={() => {
              setCurrentSet(i);
              setInputs(["", "", "", ""]);
              setResult(null);
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handleNav(1)}
          disabled={currentSet === clozeTestSets.length - 1}
          className="cloze-nav-btn"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ClozeTest;

