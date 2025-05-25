import Navbar from '../pages/Navbar';
import '../pages/A1sections.css';
import { useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock.png';
import { useState, useEffect } from 'react';

const NUM_SECTIONS = 8; // Cambia esto si tienes más/menos secciones

export default function A1Sections() {
  const navigate = useNavigate();

  // Estado dinámico según número de secciones
  const [sections, setSections] = useState(
    Array.from({ length: NUM_SECTIONS }, (_, i) => ({
      id: i + 1,
      unlocked: i === 0, // Solo Section 1 está desbloqueada al inicio
    }))
  );

  useEffect(() => {
    setSections(prevSections =>
      prevSections.map(section => ({
        ...section,
        unlocked:
          section.id === 1 ||
          localStorage.getItem(`section${section.id}Unlocked`) === 'true'
      }))
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="a1-container">
        <div className="a1-header">
          <button onClick={() => navigate('/home')} className="back-button">← A1</button>
          <h2 className="a1-title">Wilkommen! to Level A1</h2>
        </div>

        <div className="sections-grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`section-box ${!section.unlocked ? 'locked' : ''}`}
              onClick={() => {
                if (section.unlocked) {
                  navigate(`/sections/a1/section-${section.id}`);
                }
              }}
            >
              <p>SECTION {section.id}</p>
              {!section.unlocked && (
                <img src={lockIcon} alt="Lock icon" className="lock-icon" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
