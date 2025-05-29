// ClozeTest.tsx
import { useState } from "react";
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
    <div className="flex flex-col items-center w-full">
      <div className="mt-8 text-blue-600 text-base opacity-85 text-center mb-4">Select or type the words below in the correct order.</div>
      <div className="bg-blue-500 p-8 rounded-3xl shadow-lg w-[498px] mb-4 max-w-[96vw] sm:w-[98vw] sm:min-w-0 sm:p-5">
        <div className="text-white font-bold mb-4 text-center text-lg">
          Vervollständige die Sätze (Complete the sentences):
        </div>
        <div className="mb-5">
          {setData.sentences.map((sent, idx) => {
            const parts = sent.split("_____");
            return (
              <div className="text-white text-lg mb-3" key={idx}>
                {parts[0]}
                <input
                  className={`w-[90px] mx-1 py-1 px-2 rounded-lg border-2 text-base ${
                    result ? (result[idx] ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50") : "border-blue-300"
                  } sm:w-[60px] sm:text-base sm:py-0.5 sm:px-1`}
                  value={inputs[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  maxLength={16}
                />
                {parts[1]}
              </div>
            );
          })}
        </div>
        <button className="mt-2 mx-auto block py-2.5 px-8 rounded-3xl font-bold bg-blue-800 text-white border-none text-lg cursor-pointer hover:bg-blue-900 transition-colors duration-200" onClick={handleCheck}>
          CHECK
        </button>
        {result && (
          <div className="mt-3 text-center font-bold text-white text-green-300">
            {result.every(Boolean)
              ? "All right! Well done!"
              : "Check your answers and try again."}
          </div>
        )}
      </div>
      <div className="flex justify-center flex-wrap gap-4 bg-sky-400 rounded-3xl p-4 w-[550px] mb-4 max-w-[98vw] sm:w-[98vw] sm:min-w-0 sm:p-3 sm:gap-2">
        {setData.options.map((option, idx) => (
          <button
            key={idx}
            className="bg-sky-600 text-white border-none rounded-2xl py-3 px-6 text-base font-bold cursor-pointer hover:bg-sky-700 transition-colors duration-200 disabled:bg-sky-200 disabled:text-slate-600 disabled:cursor-not-allowed"
            onClick={() => handleOptionClick(option)}
            disabled={inputs.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mb-4 sm:flex-wrap sm:gap-2 sm:justify-center sm:items-start sm:w-[98vw] sm:mx-auto sm:mb-3 sm:min-h-[4.6rem]">
        <button
          onClick={() => handleNav(-1)}
          disabled={currentSet === 0}
          className="bg-transparent border-none text-sky-400 text-3xl cursor-pointer disabled:text-slate-300 disabled:cursor-not-allowed sm:text-2xl sm:mx-1"
        >
          {"<"}
        </button>
        {clozeTestSets.map((_, i) => (
          <button
            key={i}
            className={`border-none rounded-xl text-lg font-bold mx-0.5 w-8 h-10 cursor-pointer transition-colors duration-150 flex items-center justify-center p-0 ${
              i === currentSet ? "bg-sky-400 text-white" : "bg-sky-200"
            } sm:w-9 sm:h-8 sm:text-base sm:mx-1 sm:my-1`}
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
          className="bg-transparent border-none text-sky-400 text-3xl cursor-pointer disabled:text-slate-300 disabled:cursor-not-allowed sm:text-2xl sm:mx-1"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ClozeTest;

