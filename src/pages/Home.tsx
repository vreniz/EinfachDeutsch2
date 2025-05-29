import Navbar from '../pages/Navbar';
import klaus from '../assets/Klaus01.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  function handleUnavailableLevel() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Willkommen
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-lg text-gray-700 mb-3 font-normal">
              Ready to learn <span className="text-blue-600 font-medium">Deutsch</span> with Klaus? 
              <br className="hidden sm:block" />
              <span className="font-medium">Wähle dein Level und fang an!</span>
            </p>
            <p className="text-base text-gray-500 italic">
              "Choose your level and get started!"
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Klaus Image */}
          <div className="flex-shrink-0 order-2 lg:order-1">
            <div className="relative">
              <img 
                src={klaus} 
                alt="Klaus" 
                className="w-80 sm:w-64 md:w-72 lg:w-80 h-auto filter drop-shadow-2xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Level Cards */}
          <div className="order-1 lg:order-2 w-full max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* A1 - Available */}
              <button 
                className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                onClick={() => navigate('/sections/a1')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-colors duration-300">
                    <span className="text-white text-xl font-bold group-hover:text-white">A1</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">A1</h3>
                  <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-100 transition-colors duration-300">Beginner</p>
                </div>
                <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 group-hover:ring-opacity-50 rounded-2xl transition-all duration-300"></div>
              </button>

              {/* A2-C2 - Coming Soon */}
              {[
                { level: 'A2', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-500', desc: 'Elementary' },
                { level: 'B1', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-500', desc: 'Intermediate' },
                { level: 'B2', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500', desc: 'Upper Int.' },
                { level: 'C1', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-500', desc: 'Advanced' },
                { level: 'C2', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-500', desc: 'Proficient' }
              ].map((item) => (
                <button 
                  key={item.level}
                  className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                  onClick={handleUnavailableLevel}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-colors duration-300`}>
                      <span className="text-white text-xl font-bold">{item.level}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{item.level}</h3>
                    <p className="text-sm text-gray-500 mt-2 group-hover:text-white/80 transition-colors duration-300">{item.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-30">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Material Design */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">Coming Soon</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                This level is not available yet. We're working hard to bring you more content!
              </p>
            </div>
            
            {/* Modal Actions */}
            <div className="px-6 pb-6 pt-2">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleCloseModal}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

