import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import A1Sections from './pages/A1sections';
import Section1View from './pages/Section1View'; // 
import Section2View from './pages/Section2View';
import PracticeView from './pages/PracticeView';
import FlashcardsHouse from './pages/FlashcardsHouse';
import FlashcardsSchool from './pages/FlashcardsSchool';
import FlashcardsFood from './pages/FlashcardsFood';
import FlashcardsTravel from './pages/FlashcardsTravel';
import FlashcardsFamily from './pages/FlashcardsFamily'; // <-- Importa el componente
import Profile from './pages/Profile';
import Reminder from './pages/Reminder';
import OverallProgress from './pages/OverallProgress';
import Section3View from './pages/Section3View';

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
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/progress" element={<OverallProgress />} />
        <Route path="/sections/a1/section-3" element={<Section3View />} />

      </Routes>
    </Router>
  );
}

export default App;
