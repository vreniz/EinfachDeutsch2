// src/pages/PracticeView.tsx
import Navbar from './Navbar';
import klausP from '../assets/KlausP.png';
import { useNavigate } from 'react-router-dom';

export default function PracticeView() {
  const navigate = useNavigate();

  // 3 hexágonos arriba, 2 abajo
  const row1 = [
    { label: 'House', color: '#f472b6' },
    { label: 'School', color: '#fbbf24' },
    { label: 'Food', color: '#22c55e' },
  ];
  const row2 = [
    { label: 'Travel', color: '#a78bfa' },
    { label: 'Family', color: '#ef4444' },
  ];

  const handleClick = (topic: string) => {
    navigate(`/practice/${topic.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-[75vh] flex flex-col">
        <button 
          className="flex items-center gap-2.5 bg-sky-400 border-none py-3 px-10 rounded-full font-bold text-xl text-white mt-10 ml-10 mb-4 cursor-pointer shadow-[0_4px_18px_rgba(56,189,248,0.47)] transition-all duration-150 outline-none tracking-wide self-start hover:bg-sky-500 hover:shadow-[0_8px_28px_rgba(56,189,248,0.6)] hover:scale-105 focus:bg-sky-500 focus:shadow-[0_8px_28px_rgba(56,189,248,0.6)] focus:scale-105"
          onClick={() => navigate('/home')}
        >
          <span className="text-2xl mr-1">←</span>
          <span>PRACTICE</span>
        </button>
        
        <div className="mt-3 mb-5 text-xl text-center text-slate-700 bg-slate-50 py-4 px-3 rounded-3xl max-w-[650px] mx-auto shadow-[0_2px_16px_rgba(56,189,248,0.12)] tracking-wide">
          <strong>
            Choose a topic below to practice your vocabulary with themed flashcards.
          </strong>
          <span className="text-blue-500 italic text-lg block mt-1">
            Wähle ein Thema und erweitere deinen Wortschatz! (Choose a topic and expand your vocabulary!)
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-start min-h-[50vh] w-full mb-10 gap-2">
          <div className="flex justify-center items-center gap-9 mb-6">
            {row1.map((topic) => (
              <div
                key={topic.label}
                className="w-[185px] h-[165px] flex items-center justify-center font-bold text-white text-xl cursor-pointer shadow-[0_4px_32px_rgba(0,0,0,0.13),0_1px_6px_rgba(0,0,0,0.2)] transition-all duration-150 relative z-10 outline-none select-none hover:scale-110 hover:-rotate-2 hover:shadow-[0_8px_42px_rgba(56,189,248,0.54),0_3px_16px_rgba(0,0,0,0.07)] hover:brightness-110 hover:z-20 hover:drop-shadow-[0_4px_20px_rgba(255,255,255,0.13)] focus:scale-110 focus:-rotate-2 focus:shadow-[0_8px_42px_rgba(56,189,248,0.54),0_3px_16px_rgba(0,0,0,0.07)] focus:brightness-110 focus:z-20 focus:drop-shadow-[0_4px_20px_rgba(255,255,255,0.13)] max-sm:w-[62vw] max-sm:max-w-[130px] max-sm:min-w-[75px] max-sm:h-[14vw] max-sm:max-h-[74px] max-sm:min-h-[48px] max-sm:text-base max-sm:mx-1 max-[400px]:w-[85vw] max-[400px]:min-w-[34px] max-[400px]:max-w-[96px] max-[400px]:h-[18vw] max-[400px]:max-h-[44px] max-[400px]:text-xs max-[400px]:p-0"
                style={{ 
                  backgroundColor: topic.color,
                  clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
                }}
                onClick={() => handleClick(topic.label)}
              >
                {topic.label}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-9 mb-0">
            <div className="w-[95px] h-[1px] max-sm:hidden" />
            {row2.map((topic) => (
              <div
                key={topic.label}
                className="w-[185px] h-[165px] flex items-center justify-center font-bold text-white text-xl cursor-pointer shadow-[0_4px_32px_rgba(0,0,0,0.13),0_1px_6px_rgba(0,0,0,0.2)] transition-all duration-150 relative z-10 outline-none select-none hover:scale-110 hover:-rotate-2 hover:shadow-[0_8px_42px_rgba(56,189,248,0.54),0_3px_16px_rgba(0,0,0,0.07)] hover:brightness-110 hover:z-20 hover:drop-shadow-[0_4px_20px_rgba(255,255,255,0.13)] focus:scale-110 focus:-rotate-2 focus:shadow-[0_8px_42px_rgba(56,189,248,0.54),0_3px_16px_rgba(0,0,0,0.07)] focus:brightness-110 focus:z-20 focus:drop-shadow-[0_4px_20px_rgba(255,255,255,0.13)] max-sm:w-[62vw] max-sm:max-w-[130px] max-sm:min-w-[75px] max-sm:h-[14vw] max-sm:max-h-[74px] max-sm:min-h-[48px] max-sm:text-base max-sm:mx-1 max-[400px]:w-[85vw] max-[400px]:min-w-[34px] max-[400px]:max-w-[96px] max-[400px]:h-[18vw] max-[400px]:max-h-[44px] max-[400px]:text-xs max-[400px]:p-0"
                style={{ 
                  backgroundColor: topic.color,
                  clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
                }}
                onClick={() => handleClick(topic.label)}
              >
                {topic.label}
              </div>
            ))}
            <div className="w-[95px] h-[1px] max-sm:hidden" />
          </div>
        </div>
        
        <img 
          src={klausP} 
          alt="Klaus" 
          className="fixed bottom-9 right-8 w-[425px] max-w-[38vw] z-[5] drop-shadow-[0_6px_28px_rgba(56,189,248,0.42)] pointer-events-none select-none transition-all duration-200 max-[1210px]:static max-[1210px]:block max-[1210px]:mx-auto max-[1210px]:mt-9 max-[1210px]:mb-2 max-[1210px]:w-[44vw] max-[1210px]:min-w-[110px] max-[1210px]:max-w-[340px] max-[1210px]:right-auto max-[1210px]:bottom-auto max-[1210px]:z-[3] max-sm:w-[90vw] max-sm:max-w-[260px] max-sm:min-w-[110px] max-sm:mt-9 max-sm:mb-3 max-[400px]:w-[98vw] max-[400px]:min-w-[90px] max-[400px]:max-w-[330px] max-[400px]:mt-6 max-[400px]:mb-1" 
        />
      </div>
    </div>
  );
}
