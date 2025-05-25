import Navbar from '../pages/Navbar';
import './Home.css';
import klaus from '../assets/Klaus01.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el pop-up

  function handleUnavailableLevel() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <h1 className="home-title">Willkommen</h1> {/* 👈 TÍTULO NUEVO */}
     
       <p className="home-subtitle">
         Ready to learn <span className="highlight-de">Deutsch</span> with Klaus? <strong>Wähle dein Level und fang an!</strong>
         </p>
        <p className="home-subtitle-translation">
        <em>“Choose your level and get started!”</em>
        </p>
      <div className="homepage-content">
      <img src={klaus} alt="Klaus" className="klaus" />

      <div className="levels-container"> {/* Nuevo contenedor */}
        <div className="level-buttons">
        <button className="level level-a1" onClick={() => navigate('/sections/a1')}>A1</button>
       <button className="level level-a2"onClick={handleUnavailableLevel}>A2</button>
       <button className="level level-b1"onClick={handleUnavailableLevel}>B1</button>
       <button className="level level-b2"onClick={handleUnavailableLevel}>B2</button>
       <button className="level level-c1"onClick={handleUnavailableLevel}>C1</button>
       <button className="level level-c2"onClick={handleUnavailableLevel}>C2</button>
        </div>
      </div>
    </div>
     {/* Modal */}
     {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>🚧 Coming Soon</h3>
            <p>This level is not available yet. Stay tuned for updates!</p>
            <button className="modal-btn" onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
  </div>
  );
}

