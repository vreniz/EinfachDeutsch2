import Navbar from '../../components/NAVBAR';
import { useNavigate } from 'react-router-dom';
import lockIcon from '../../assets/lock.png';
import { useState, useEffect } from 'react';
import { useUser } from '../../Context/UserContext';

const NUM_SECTIONS = 8; // Cambia esto si tienes más/menos secciones

export default function A1Sections() {
  const navigate = useNavigate();
  const { progress } = useUser();

  // Estado dinámico según número de secciones
  const [sections, setSections] = useState(
    Array.from({ length: NUM_SECTIONS }, (_, i) => ({
      id: i + 1,
      unlocked: i === 0, // Solo Section 1 está desbloqueada al inicio
    }))
  );

  // Función para verificar si una sección está 100% completada
  const isSectionCompleted = (sectionNumber: number): boolean => {
    if (!progress) return false;
    
    const sectionKey = `section${sectionNumber}` as 'section1' | 'section2' | 'section3';
    const sectionProgress = progress[sectionKey];
    
    if (!sectionProgress) return false;
    
    // Una sección está 100% completada si section_complete es true
    return sectionProgress.section_complete || false;
  };

  useEffect(() => {
    setSections(prevSections =>
      prevSections.map(section => {
        // Section 1 siempre está desbloqueada
        if (section.id === 1) {
          return { ...section, unlocked: true };
        }
        
        // Las demás secciones se desbloquean si la anterior está 100% completada
        const previousSectionCompleted = isSectionCompleted(section.id - 1);
        
        return {
          ...section,
          unlocked: previousSectionCompleted
        };
      })
    );
  }, [progress]); // Re-evaluar cuando el progreso cambie

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <button onClick={() => navigate('/home')} className="py-4 px-9 rounded-[2.5rem] font-bold text-xl border-none text-white bg-sky-400 cursor-pointer text-center shadow-[0_2px_10px_rgba(56,189,248,0.10)] ml-3 hover:bg-sky-500 transition-colors">← A1</button>
          <h2 className="text-center text-4xl font-bold mt-8 mb-4 text-blue-800 font-sans">Wilkommen! to Level A1</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`
                relative bg-sky-400 text-white font-bold text-xl p-8 rounded-3xl cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg text-center
                ${!section.unlocked ? 'bg-gray-400 cursor-not-allowed opacity-60' : 'hover:bg-sky-500'}
              `}
              onClick={() => {
                if (section.unlocked) {
                  navigate(`/sections/a1/section-${section.id}`);
                }
              }}
            >
              <p className="text-lg font-bold">SECTION {section.id}</p>
              {!section.unlocked && (
                <img src={lockIcon} alt="Lock icon" className="absolute top-2 right-2 w-6 h-6 opacity-80" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
