import ExpBar from '../../components/EXP_BAR';
import Navbar from '../../components/NAVBAR';
import { useNavigate } from "react-router-dom";

export default function OverallProgress() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Overall Progress
            </h1>
            <p className="text-gray-600">
              Track your learning journey and experience
            </p>
          </div>
          
          <button
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-gray-800 border border-gray-100"
            onClick={() => navigate('/home')}
            aria-label="Close and go to Home"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Progress Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Your Learning Journey</h2>
                <p className="text-blue-100">Complete sections, lessons and quizzes to earn more EXP!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-center">
                  <p className="text-blue-100 text-sm font-medium">Current Level</p>
                  <p className="text-3xl font-bold">A1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Content */}
          <div className="p-8">
            {/* Level Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-2xl px-6 py-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-blue-800 font-semibold text-lg">
                  Currently Learning: <span className="bg-blue-600 text-white px-3 py-1 rounded-lg ml-2">A1</span>
                </span>
              </div>
            </div>

            {/* Experience Bar Section */}
            <div className="mb-8">
              <ExpBar level="A1" />
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-1">5</h3>
                <p className="text-green-600 font-medium">Lessons Completed</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-700 mb-1">850</h3>
                <p className="text-blue-600 font-medium">Experience Points</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-700 mb-1">12</h3>
                <p className="text-purple-600 font-medium">Activities Done</p>
              </div>
            </div>

            {/* Achievement Tip */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-1">💡 Pro Tip</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Complete all <span className="font-semibold bg-amber-200 px-2 py-1 rounded text-amber-800">A1</span> sections to fill the experience bar and unlock the next level! 
                    Consistency is key to mastering German.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
