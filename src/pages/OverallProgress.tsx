import ExpBar from './ExpBar';
import Navbar from '../pages/Navbar';
import './OverallProgress.css';
import { useNavigate } from "react-router-dom";

export default function OverallProgress() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="overall-progress-container">
        {/* Botón X en la esquina */}
        <button
          className="close-x-btn"
          onClick={() => navigate('/home')}
          aria-label="Close and go to Home"
        >
          ×
        </button>
        <div className="progress-header-row">
          <h2>Overall Progress</h2>
        </div>
        <p className="overall-progress-description">
          Here you can track your experience progress for each level.<br />
          Complete sections, lessons and quizzes to earn more EXP and unlock the next stages!
        </p>
        <div className="level-chip">Level: <span className="chip-level">A1</span></div>
        <ExpBar level="A1" />
        <div className="overall-progress-tip">
          <span>
            <b>Tip:</b> Finish all <span style={{ color: "#1769aa", fontWeight: 700 }}>A1</span> sections to fill the bar and level up!
          </span>
        </div>
      </div>
    </div>
  );
}
