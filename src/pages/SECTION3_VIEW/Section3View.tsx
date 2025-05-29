import { useState, useEffect } from 'react';
import Navbar from '../../components/NAVBAR';
import klaus from '../../assets/Klaus002.png';
import { useNavigate, useParams } from 'react-router-dom';
import LessonBoard from '../../components/LESSON_BOARD';
import klaus2 from '../../assets/Klaus0004.png';
import ClozeTest from '../../components/CLOZETEST';
import Flashcards from '../../components/FLASHCARDS';
import Questions from '../../components/QUESTIONS';
import MarkAsDoneButton from '../../components/MARK_AS_DONE_BUTTON';
import Quiz from '../../components/QUIZ';
import ProgressReport from '../../components/PROGRESS_REPORT';
import { useUser } from '../../Context/UserContext';
import type { ProgressField } from '../../api/api';
import toast from 'react-hot-toast';

// Define el estado del progreso de la sección
type ProgressState = {
  lessons: boolean;
  activity1: boolean;
  activity2: boolean;
  activity3: boolean;
  quizDone: boolean;
  sectionDone: boolean;
};

// Helper functions to map between local format and API format
const mapFromAPI = (apiProgress: Record<ProgressField, boolean> | undefined): ProgressState => {
  if (!apiProgress) {
    return {
      lessons: false,
      activity1: false,
      activity2: false,
      activity3: false,
      quizDone: false,
      sectionDone: false,
    };
  }
  
  return {
    lessons: apiProgress.lessons || false,
    activity1: apiProgress.activity_1 || false,
    activity2: apiProgress.activity_2 || false,
    activity3: apiProgress.activity_3 || false,
    quizDone: apiProgress.quiz || false,
    sectionDone: apiProgress.section_complete || false,
  };
};

const mapToAPIField = (localField: keyof ProgressState): ProgressField => {
  const mapping: Record<keyof ProgressState, ProgressField> = {
    lessons: 'lessons',
    activity1: 'activity_1',
    activity2: 'activity_2',
    activity3: 'activity_3',
    quizDone: 'quiz',
    sectionDone: 'section_complete',
  };
  return mapping[localField];
};

// Lesson boards for Section 3
const lessonBoards = [
  {
    title: "LESSON 1: Days of the Week",
    content: (
      <>
        <p>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          Heute ist Montag. Morgen ist Dienstag. Welcher Tag ist heute?
        </p>
        <p>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          "Today is Monday. Tomorrow is Tuesday. What day is today?"
        </p>
        <div style={{ textAlign: 'left', margin: '1.2rem 0' }}>
          <strong>This lesson introduces:</strong>
          <ul>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Days of the week →</span> die Wochentage</li>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Today →</span> heute</li>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Tomorrow →</span> morgen</li>
            <li><b>How to ask about days: Welcher Tag ist heute?</b></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: "Days of the Week 📅",
    content: (
      <div>
        <p>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>Die Wochentage (Days of the Week):</strong>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🌅</span>
            <div>
              <p><strong>Montag</strong></p>
              <p>Monday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>⭐</span>
            <div>
              <p><strong>Dienstag</strong></p>
              <p>Tuesday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🌸</span>
            <div>
              <p><strong>Mittwoch</strong></p>
              <p>Wednesday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>⚡</span>
            <div>
              <p><strong>Donnerstag</strong></p>
              <p>Thursday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🎉</span>
            <div>
              <p><strong>Freitag</strong></p>
              <p>Friday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🏖️</span>
            <div>
              <p><strong>Samstag</strong></p>
              <p>Saturday</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>☀️</span>
            <div>
              <p><strong>Sonntag</strong></p>
              <p>Sunday</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Time Expressions ⏰",
    content: (
      <div>
        <p>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>Zeitausdrücke (Time Expressions):</strong>
        </p>
        <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
          <li><strong>heute</strong> - today</li>
          <li><strong>morgen</strong> - tomorrow</li>
          <li><strong>gestern</strong> - yesterday</li>
          <li><strong>am Montag</strong> - on Monday</li>
          <li><strong>am Wochenende</strong> - on the weekend</li>
        </ul>
        <div style={{ background: "#e3fcec", padding: "10px 16px", borderRadius: "8px", margin: "10px 0" }}>
          <b>Grammar note:</b> Use "am" before days of the week (am Montag, am Dienstag, etc.)
        </div>
      </div>
    )
  }
];

export default function Section3View() {
  // Obtén nivel y número de sección de la URL (ej: /sections/A1/section-3)
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";
  const section = Number(rawParams.id) || 3;
  const navigate = useNavigate();
  const { progress: userProgress, updateProgress } = useUser();

  // Estado local del progreso basado en el progreso del usuario desde la API
  const [progress, setProgress] = useState<ProgressState>(() => {
    return mapFromAPI(userProgress?.section3);
  });

  // Sync with API progress when userProgress changes
  useEffect(() => {
    setProgress(mapFromAPI(userProgress?.section3));
  }, [userProgress]);

  // Estados de navegación/vista
  const [view, setView] = useState<'content' | 'activities' | 'quiz'>('content');
  const [showContent, setShowContent] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [lessonView, setLessonView] = useState('');
  const [activityView, setActivityView] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  // Títulos de las actividades
  const activityTitles: Record<string, string> = {
    activity1: "Flashcards",
    activity2: "Cloze test",
    activity3: "Multiple choice",
  };

  // Funciones para marcar progreso y desbloquear la siguiente sección
  const unlockNextSection = (currentSectionId: number) => {
    const nextSectionId = currentSectionId + 1;
    localStorage.setItem(`section${nextSectionId}Unlocked`, "true");
  };

  const toggleProgress = async (key: keyof ProgressState) => {
    const newValue = !progress[key];
    
    try {
      // Map local field name to API field name  
      const apiField = mapToAPIField(key);
      await updateProgress('section3', apiField, newValue);
      
      // Update local state for immediate UI feedback
      setProgress((prev) => ({ ...prev, [key]: newValue }));
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast.error('Failed to update progress. Please try again.');
    }
  };

  const setQuizDone = async () => {
    try {
      await updateProgress('section3', 'quiz', true);
      setProgress((prev) => ({ ...prev, quizDone: true }));
    } catch (error) {
      console.error('Failed to update quiz progress:', error);
      toast.error('Failed to update quiz progress. Please try again.');
    }
  };

  const setSectionDone = async () => {
    try {
      await updateProgress('section3', 'section_complete', true);
      setProgress((prev) => ({ ...prev, sectionDone: true }));
      unlockNextSection(section);
    } catch (error) {
      console.error('Failed to update section progress:', error);
      toast.error('Failed to complete section. Please try again.');
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Button */}
        <button 
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
          onClick={() => navigate(`/sections/${level}`)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>SECTION {section}</span>
        </button>

        {/* Topic Banner */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <h1 className="text-xl font-semibold">Days of the Week / Time Expressions</h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Modern Sidebar Navigation */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
              {/* Progress Overview */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Section Progress</h2>
                  <button
                    onClick={() => setShowProgress(!showProgress)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(progress).map(([key, completed]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-sm ${completed ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                        {key === 'quizDone' ? 'Quiz' : 
                         key === 'sectionDone' ? 'Section Complete' :
                         key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="p-6 space-y-3">
                <button
                  onClick={() => {
                    setView('content');
                    setShowContent(!showContent);
                    setShowActivities(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                    view === 'content' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium">Lessons</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${showContent ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showContent && (
                  <div className="ml-4 space-y-2">
                    {lessonBoards.map((lesson, index) => (
                      <button
                        key={index}
                        onClick={() => setLessonView(lesson.title)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          lessonView === lesson.title 
                            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{lesson.title}</span>
                      </button>
                    ))}
                    <MarkAsDoneButton
                      done={progress.lessons}
                      onClick={() => toggleProgress('lessons')}
                      label="Mark Lessons as Done"
                    />
                  </div>
                )}

                <button
                  onClick={() => {
                    setView('activities');
                    setShowActivities(!showActivities);
                    setShowContent(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                    view === 'activities' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="font-medium">Activities</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${showActivities ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showActivities && (
                  <div className="ml-4 space-y-2">
                    {['activity1', 'activity2', 'activity3'].map((activity) => (
                      <div key={activity} className="space-y-2">
                        <button
                          onClick={() => setActivityView(activity)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            activityView === activity 
                              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                              : 'hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          <span className="text-sm font-medium">{activityTitles[activity]}</span>
                        </button>
                        <MarkAsDoneButton
                          done={progress[activity as keyof ProgressState]}
                          onClick={() => toggleProgress(activity as keyof ProgressState)}
                          label="Mark as Done"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setView('quiz');
                    setShowContent(false);
                    setShowActivities(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                    view === 'quiz' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Quiz</span>
                  </div>
                  {progress.quizDone && (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[600px]">
              {view === 'content' && (
                <div className="p-8">
                  {lessonView ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setLessonView('')}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>Back to Lessons</span>
                        </button>
                      </div>
                      <LessonBoard 
                        boards={lessonBoards.filter(lesson => lesson.title === lessonView)} 
                      />
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="mb-8">
                        <img 
                          src={klaus} 
                          alt="Klaus mascot" 
                          className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg"
                        />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Section 3!</h2>
                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        In this section, you'll learn about days of the week and time expressions in German. 
                        Select a lesson from the sidebar to get started!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 bg-blue-50 rounded-xl">
                          <div className="text-4xl mb-3">📅</div>
                          <h3 className="font-semibold text-gray-800 mb-2">Days of the Week</h3>
                          <p className="text-sm text-gray-600">Learn all seven days and how to use them</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-xl">
                          <div className="text-4xl mb-3">⏰</div>
                          <h3 className="font-semibold text-gray-800 mb-2">Time Expressions</h3>
                          <p className="text-sm text-gray-600">Master today, tomorrow, and yesterday</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-xl">
                          <div className="text-4xl mb-3">💬</div>
                          <h3 className="font-semibold text-gray-800 mb-2">Practical Usage</h3>
                          <p className="text-sm text-gray-600">Practice in real conversation contexts</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {view === 'activities' && (
                <div className="p-8">
                  {activityView === 'activity1' && (
                    <Flashcards />
                  )}
                  
                  {activityView === 'activity2' && (
                    <ClozeTest />
                  )}
                  
                  {activityView === 'activity3' && (
                    <Questions />
                  )}
                  
                  {!activityView && (
                    <div className="text-center py-16">
                      <img 
                        src={klaus2} 
                        alt="Klaus mascot" 
                        className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg"
                      />
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Practice Activities</h2>
                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Choose an activity from the sidebar to practice what you've learned about days and time expressions!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {view === 'quiz' && (
                <div className="p-8">
                  <Quiz 
                    quizDone={progress.quizDone}
                    setQuizDone={setQuizDone}
                    sectionDone={progress.sectionDone}
                    setSectionDone={setSectionDone}
                  />
                </div>
              )}
            </div>

            {/* Section Completion */}
            {progress.lessons && progress.activity1 && progress.activity2 && progress.activity3 && progress.quizDone && !progress.sectionDone && (
              <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                  <p className="text-green-700 mb-6">
                    You've completed all activities in Section 3. Ready to mark this section as complete?
                  </p>
                  <button
                    onClick={setSectionDone}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
                  >
                    Complete Section 3
                  </button>
                </div>
              </div>
            )}

            {/* Progress Report */}
            {showProgress && (
              <div className="mt-8">
                <ProgressReport 
                  progress={progress}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
