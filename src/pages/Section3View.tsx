import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import '../pages/Section1View.css';
export default function Section2View() {
  const navigate = useNavigate();
  // Obtén el nivel de la URL (ejemplo: /sections/A1/section-2)
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";

  return (
    <div>
      <Navbar />
      <div className="top-section-btn-container">
        <button className="section-btn" onClick={() => navigate(`/sections/${level}`)}>
          ← SECTION 3
        </button>
      </div>
      <div style={{ margin: '3rem auto', textAlign: 'center' }}>
        <h2>Section 3</h2>
        <p>This is the placeholder for Section 3 content. Coming Soon...</p>
      </div>
    </div>
  );
}
