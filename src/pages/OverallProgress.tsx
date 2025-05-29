import ExpBar from './ExpBar';
import Navbar from '../pages/Navbar';
import { useNavigate } from "react-router-dom";

export default function OverallProgress() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col items-center p-6">
        {/* Botón X en la esquina */}
        <button
          className="fixed top-20 right-6 w-12 h-12 bg-blue-600 text-white rounded-full text-2xl font-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg z-10 flex items-center justify-center"
          onClick={() => navigate('/home')}
          aria-label="Close and go to Home"
        >
          ×
        </button>
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_4px_32px_rgba(56,189,248,0.15)] p-8 mt-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Overall Progress</h2>
          </div>
          <p className="text-center text-lg text-slate-600 mb-8 leading-relaxed">
            Here you can track your experience progress for each level.<br />
            Complete sections, lessons and quizzes to earn more EXP and unlock the next stages!
          </p>
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-2xl font-bold text-lg mb-8 mx-auto block w-fit">
            Level: <span className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-xl">A1</span>
          </div>
          <ExpBar level="A1" />
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 mt-8 text-center">
            <span className="text-slate-700 text-lg">
              <b className="text-blue-700">Tip:</b> Finish all <span className="text-blue-700 font-bold">A1</span> sections to fill the bar and level up!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
