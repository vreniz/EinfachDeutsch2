// ClozeTest.tsx
import { useState } from "react";
import { clozeTestSets } from '../data/clozeTestDataS2';


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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="text-center text-lg text-slate-600 mb-6 font-medium">Select or type the words below in the correct order.</div>
      <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(56,189,248,0.15)] p-8 max-w-3xl w-full">
        <div className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Vervollständige die Sätze (Complete the sentences):
        </div>
        <div className="space-y-4 mb-6">
          {setData.sentences.map((sent, idx) => {
            const parts = sent.split("_____");
            return (
              <div className="flex items-center gap-2 text-lg text-slate-700 flex-wrap" key={idx}>
                {parts[0]}
                <input
                  className={`border-2 rounded-lg px-3 py-2 text-center font-semibold text-blue-800 min-w-[120px] transition-all duration-200 ${
                    result ? (result[idx] ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-blue-300 bg-blue-50 focus:border-blue-500 focus:outline-none"
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-colors duration-200 w-full mb-4" onClick={handleCheck}>
          CHECK
        </button>
        {result && (
          <div className={`text-center font-semibold py-3 px-4 rounded-xl ${
            result.every(Boolean) 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {result.every(Boolean)
              ? "All right! Well done!"
              : "Check your answers and try again."}
          </div>
        )}
      </div>
      <div className="flex gap-3 flex-wrap justify-center mt-6 max-w-4xl">
        {setData.options.map((option, idx) => (
          <button
            key={idx}
            className={`py-3 px-6 rounded-2xl font-semibold transition-all duration-200 border-2 ${
              inputs.includes(option) 
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-white border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-500 hover:scale-105"
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={inputs.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => handleNav(-1)}
          disabled={currentSet === 0}
          className={`w-12 h-12 rounded-full font-bold text-xl transition-all duration-200 ${
            currentSet === 0 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
          }`}
        >
          {"<"}
        </button>
        {clozeTestSets.map((_, i) => (
          <button
            key={i}
            className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
              i === currentSet 
                ? "bg-blue-700 text-white scale-110 shadow-lg" 
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105"
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
          className={`w-12 h-12 rounded-full font-bold text-xl transition-all duration-200 ${
            currentSet === clozeTestSets.length - 1 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ClozeTest;

