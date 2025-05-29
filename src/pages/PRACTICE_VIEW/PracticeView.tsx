// src/pages/PracticeView.tsx
import Navbar from '../../components/NAVBAR';
import klausP from '../../assets/KlausP.png';
import { useNavigate } from 'react-router-dom';

export default function PracticeView() {
  const navigate = useNavigate();

  const topics = [
    { 
      label: 'House', 
      color: 'from-pink-500 to-pink-600',
      icon: '🏠',
      description: 'Learn vocabulary about home and furniture'
    },
    { 
      label: 'School', 
      color: 'from-amber-500 to-orange-500',
      icon: '🎓',
      description: 'Educational terms and classroom objects'
    },
    { 
      label: 'Food', 
      color: 'from-green-500 to-emerald-600',
      icon: '🍎',
      description: 'Kitchen, meals, and food vocabulary'
    },
    { 
      label: 'Travel', 
      color: 'from-violet-500 to-purple-600',
      icon: '✈️',
      description: 'Transportation and travel phrases'
    },
    { 
      label: 'Family', 
      color: 'from-red-500 to-rose-600',
      icon: '👨‍👩‍👧‍👦',
      description: 'Relationships and family members'
    },
  ];

  const handleClick = (topic: string) => {
    navigate(`/practice/${topic.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            onClick={() => navigate('/home')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-light text-gray-900">Practice</h1>
        </div>

        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Choose a Topic to Practice
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-2">
              Expand your German vocabulary with themed flashcards and interactive exercises.
            </p>
            <p className="text-blue-600 italic font-medium">
              Wähle ein Thema und erweitere deinen Wortschatz!
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Topic Cards */}
          <div className="flex-1 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.label}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleClick(topic.label)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 text-center">
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {topic.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2">
                      {topic.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Action Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Ring */}
                  <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 group-hover:ring-opacity-50 rounded-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* Coming Soon Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-4xl mb-3">🔮</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">More Topics Coming Soon!</h3>
              <p className="text-gray-600 text-sm">
                We're working on adding more vocabulary themes to help you master German.
              </p>
            </div>
          </div>

          {/* Klaus Character */}
          <div className="flex-shrink-0 lg:ml-8">
            <div className="relative">
              <img 
                src={klausP} 
                alt="Klaus Practice Mascot" 
                className="w-80 md:w-96 lg:w-80 xl:w-96 h-auto filter drop-shadow-2xl"
              />
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-1">💡 Practice Tips</h3>
              <p className="text-blue-700 leading-relaxed">
                Start with topics you encounter daily like <span className="font-semibold">House</span> and <span className="font-semibold">Food</span>. 
                Regular practice with flashcards will help you remember new words faster!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
