import Navbar from '../pages/Navbar';
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
      <h1 className="text-center text-5xl sm:text-3xl font-bold mt-8 sm:mt-4 mb-4 sm:mb-2 text-blue-800 font-sans">Willkommen</h1>
     
       <p className="text-center text-xl sm:text-lg text-slate-700 mb-2 font-sans px-4">
         Ready to learn <span className="text-blue-700 font-semibold">Deutsch</span> with Klaus? <strong>Wähle dein Level und fang an!</strong>
         </p>
        <p className="text-center text-base sm:text-sm text-slate-500 mb-6 sm:mb-4 italic px-4">
        <em>"Choose your level and get started!"</em>
        </p>
      <div className="flex flex-col sm:flex-col lg:flex-row justify-center items-center lg:items-start p-8 sm:p-4 gap-6 sm:gap-4 mt-4 sm:mt-2">
      <img src={klaus} alt="Klaus" className="max-w-[300px] sm:max-w-[200px] h-auto drop-shadow-[0_8px_32px_rgba(56,189,248,0.5)] order-1 lg:order-1" />

      <div className="flex justify-center items-center flex-1 lg:-ml-60 order-2 lg:order-2">
        <div className="grid grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-4 max-w-3xl sm:max-w-sm w-full">
        <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-sky-400" onClick={() => navigate('/sections/a1')}>A1</button>
       <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-pink-500" onClick={handleUnavailableLevel}>A2</button>
       <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-indigo-500" onClick={handleUnavailableLevel}>B1</button>
       <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-violet-500" onClick={handleUnavailableLevel}>B2</button>
       <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-blue-500" onClick={handleUnavailableLevel}>C1</button>
       <button className="py-12 sm:py-6 px-12 sm:px-6 text-4xl sm:text-2xl font-bold border-none rounded-3xl sm:rounded-2xl text-white cursor-pointer transition-transform duration-200 shadow-lg hover:scale-105 bg-orange-500" onClick={handleUnavailableLevel}>C2</button>
        </div>
      </div>
    </div>
     {/* Modal */}
     {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(56,189,248,0.33)] p-8 text-center max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">🚧 Coming Soon</h3>
            <p className="text-slate-600 mb-6">This level is not available yet. Stay tuned for updates!</p>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200" onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
  </div>
  );
}

