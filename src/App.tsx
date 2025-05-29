import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} /> {/* 👈 agrega ruta nueva */}
        <Route path="/sections/a1" element={<A1Sections />} />
        <Route path="/sections/a1/section-1" element={<Section1View />} />
        <Route path="/sections/a1/section-2" element={<Section2View />} />
        <Route path="/practice" element={<PracticeView />} />
        <Route path="/practice/house" element={<FlashcardsHouse />} />
        <Route path="/practice/school" element={<FlashcardsSchool />} />
        <Route path="/practice/food" element={<FlashcardsFood />} />
        <Route path="/practice/travel" element={<FlashcardsTravel />} />
        <Route path="/practice/family" element={<FlashcardsFamily />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/progress" element={<OverallProgress />} />
        <Route path="/sections/a1/section-3" element={<Section3View />} />

      </Routes>
    </Router>
  );
}

export default App;
