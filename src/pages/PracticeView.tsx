// src/pages/PracticeView.tsx
import './PracticeView.css';
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
  <div className="practice-layout">
    <button className="back-button" onClick={() => navigate('/home')}>
      <span className="arrow-icon">←</span>
      <span>PRACTICE</span>
    </button>
    {/* ⬇️ Mueve las instrucciones AQUÍ ⬇️ */}
    <div className="intro-instructions">
      <strong>
        Choose a topic below to practice your vocabulary with themed flashcards.
      </strong>
      <span className="instr-german">
        Wähle ein Thema und erweitere deinen Wortschatz! (Choose a topic and expand your vocabulary!)
      </span>
    </div>
    <div className="hex-center">
      <div className="hex-row">
        {row1.map((topic) => (
          <div
            key={topic.label}
            className="hex"
            style={{ backgroundColor: topic.color }}
            onClick={() => handleClick(topic.label)}
          >
            {topic.label}
          </div>
        ))}
      </div>
      <div className="hex-row bottom-row">
        <div className="hex-row-spacer" />
        {row2.map((topic) => (
          <div
            key={topic.label}
            className="hex"
            style={{ backgroundColor: topic.color }}
            onClick={() => handleClick(topic.label)}
          >
            {topic.label}
          </div>
        ))}
        <div className="hex-row-spacer" />
      </div>
    </div>
    <img src={klausP} alt="Klaus" className="klaus-img-fixed" />
  </div>
</div>

  );
}
