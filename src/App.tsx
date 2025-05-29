import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/SIGNUP';
import LogIn from './pages/LOGIN';
import Home from './pages/HOME';
import A1Sections from './pages/A1SECTIONS';
import Section1View from './pages/SECTION1_VIEW';
import Section2View from './pages/SECTION2_VIEW';
import PracticeView from './pages/PRACTICE_VIEW';
import FlashcardsHouse from './pages/FLASHCARDS_HOUSE';
import FlashcardsSchool from './pages/FLASHCARDS_SCHOOL';
import FlashcardsFood from './pages/FLASHCARDS_FOOD';
import FlashcardsTravel from './pages/FLASHCARDS_TRAVEL';
import FlashcardsFamily from './pages/FLASHCARDS_FAMILY';
import Profile from './pages/PROFILE';
import OverallProgress from './pages/OVERALL_PROGRESS';
import Section3View from './pages/SECTION3_VIEW';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/sections/a1" element={<ProtectedRoute><A1Sections /></ProtectedRoute>} />
          <Route path="/sections/a1/section-1" element={<ProtectedRoute><Section1View /></ProtectedRoute>} />
          <Route path="/sections/a1/section-2" element={<ProtectedRoute><Section2View /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><PracticeView /></ProtectedRoute>} />
          <Route path="/practice/house" element={<ProtectedRoute><FlashcardsHouse /></ProtectedRoute>} />
          <Route path="/practice/school" element={<ProtectedRoute><FlashcardsSchool /></ProtectedRoute>} />
          <Route path="/practice/food" element={<ProtectedRoute><FlashcardsFood /></ProtectedRoute>} />
          <Route path="/practice/travel" element={<ProtectedRoute><FlashcardsTravel /></ProtectedRoute>} />
          <Route path="/practice/family" element={<ProtectedRoute><FlashcardsFamily /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><OverallProgress /></ProtectedRoute>} />
          <Route path="/sections/a1/section-3" element={<ProtectedRoute><Section3View /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            style: {
              border: '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
