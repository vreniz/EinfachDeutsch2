import { useState } from 'react';
import Navbar from './Navbar';
import klaus from '../assets/Klaus002.png';
import { useNavigate } from 'react-router-dom';
import nextImg from '../assets/next.png';
import nextOp from '../assets/nextop.png';
import LessonBoard from './LessonBoard';
import klaus2 from '../assets/Klaus0004.png';
import ClozeTest from './Clozetest.tsx';
import Flashcards from './Flashcards.tsx';
import Questions from './Questions.tsx';
import MarkAsDoneButton from './MarkAsDoneButton';
import Quiz from './Quiz.tsx'; // Ajusta la ruta si es diferente
import ProgressReport from './ProgressReport';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


// Define el estado del progreso de la sección
type ProgressState = {
  lessons: boolean;
  activity1: boolean;
  activity2: boolean;
  activity3: boolean;
  quizDone: boolean;
  sectionDone: boolean;
};

// Utilidad para guardar/cargar progreso en localStorage
function loadSectionProgress(level: string, section: number): ProgressState {
  const key = `progress_${level}_section${section}`;
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  return {
    lessons: false,
    activity1: false,
    activity2: false,
    activity3: false,
    quizDone: false,
    sectionDone: false,
  };
}

function saveSectionProgress(level: string, section: number, state: ProgressState) {
  const key = `progress_${level}_section${section}`;
  localStorage.setItem(key, JSON.stringify(state));
}


// Boards para el LessonBoard

const lessonBoards = [
  {
    title: "LESSON 1: Self-introduction",
    content: (
      <>
        <p >
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          Hallo! Ich heiße Lina und ich komme aus Kolumbien. Ich bin Lehrerin von Beruf. Und du?
        </p>
        <p>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          “Hello! My name is Lina and I come from Colombia. I am a teacher by profession. And you?”
        </p>
        <div style={{ textAlign: 'left', margin: '1.2rem 0' }}>
          <strong>This short paragraph introduces:</strong>
          <ul>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Name →</span> Ich heiße…</li>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Country of origin →</span> Ich komme aus…</li>
            <li><span style={{ color: '#ea2626', fontWeight: 700 }}>Occupation →</span> Ich bin … von Beruf</li>
            <li><b>And invites the other person to respond with Und du? ("And you?")</b></li>
          </ul>
        </div>
      </>
    )
  },
  {
    title: "Example",
    content: (
      <div>
        <b>Presentation example:</b>
        <br />
        <span style={{ color: "#3b82f6" }}>
          Hallo! Ich heiße Marco und ich bin Ingenieur aus Deutschland.
        </span>
        <br /><br />
        <b>Translates:</b>
        <br />
        <span>Hello! My name is Marco and I am an engineer from Germany.</span>
        <br /><br />
        <b>More examples:</b>
        <ul>
          <li>
            <span style={{ color: "#3b82f6" }}>
              Ich heiße Julia. Ich bin Studentin. Ich komme aus Kolumbien.
            </span>
            <span> (My name is Julia. I am a student.<br />I come from Colombia.)</span>
          </li>
          <li>
            <span style={{ color: "#3b82f6" }}>
              Ich heiße Paul und ich bin Lehrer von Beruf.
            </span>
            <span> (My name is Paul and I am a teacher by profession.)</span>
          </li>
        </ul>
        <div style={{ background: "#ffeaea", padding: "12px 16px", borderRadius: "8px", margin: "15px 0" }}>
          <strong>Common mistake:</strong>
          <br />
          <span style={{ color: "#e53935" }}>
            ❌ "Ich heiße Lehrer." <b>Incorrect!</b>
            <br />
            <b style={{ color: "#22c55e" }}>✔ Correct: "Ich bin Lehrer von Beruf."</b>
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Tip",
    content: (
      <div>
        <b>Tip:</b>
        <span style={{ color: "#f97316" }}>"Ich bin … von Beruf"</span> is used to talk about professions, not temporary jobs or being a student.
        <br /><br />
        <span>
          For students, simply say: <b>Ich bin Student/Studentin.</b>
        </span>
        <br /><br />
        <div style={{ background: "#e3fcec", padding: "10px 16px", borderRadius: "8px", margin: "10px 0" }}>
          <b>Grammar note:</b> Remember to match the gender of the profession: Lehrer (m), Lehrerin (f).
        </div>
        <br />
        <span>
          <b>How to ask:</b> 
          <br />
          Was bist du von Beruf? (What is your profession?)<br />
          Bist du Student/Studentin? (Are you a student?)
        </span>
        <br /><br />
        <span>
          ¿And you? — <b>Und du?</b>
        </span>
      </div>
    ),
  },
  {
    title: "Concepts",
    content: (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Key Concepts:</div>
        <div style={{ lineHeight: 1.7 }}>
          <b>Ich heiße ...</b> — My name is ...<br />
          <b>Ich komme aus ...</b> — I come from ... (country)<br />
          <b>Ich bin ... von Beruf</b> — I am ... by profession<br />
          <b>Ich bin Student/Studentin</b> — I am a student<br />
          <b>Nationality:</b> Masculine <b>-er</b> / Feminine <b>-in</b><br />
          &nbsp;&nbsp; <b>Spanier</b> (m), <b>Spanierin</b> (f)<br />
          <b>Und du?</b> — And you?
        </div>
        <div style={{ background: "#e0f7fa", borderRadius: 8, padding: "8px 15px", marginTop: 16 }}>
          <span role="img" aria-label="info">ℹ️</span>
          <b style={{ marginLeft: 6 }}>Tip:</b> In German, the verb comes second:
          <br />
          <span style={{ color: "#246" }}>Ich heiße Anna. Ich komme aus Mexiko.</span>
        </div>
      </div>
    ),
  },
  {
    title: "Greetings 👋",
    content: (
      <>
        <p>
          <span role="img" aria-label="german-flag">
            🇩🇪
          </span>{" "}
          <strong>DEUTSCH:</strong>
          <br />
          <span style={{ fontSize: "1.1rem" }}>
            Guten Morgen! (Good morning) <br />
            Guten Tag! (Good day) <br />
            Guten Abend! (Good afternoon/evening) <br />
            Gute Nacht! (Good night - as we say goodbye to sleep)
          </span>
        </p>
        <div style={{ backgroundColor: "#f0f9ff", padding: "15px", borderRadius: "8px", margin: "15px 0" }}>
          <p>
            <span role="img" aria-label="light-bulb">
              💡
            </span>{" "}
            <strong>Did you know that...?</strong>
          </p>
          <p>In Germany, "Guten Tag" is used as a general greeting during the day. </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "10px 0" }}>
          <div style={{ display: "flex", alignItems: "center", margin: "0 15px" }}>
            <span style={{ fontSize: "2rem", marginRight: "10px" }}>🌅</span>
            <span>Guten Morgen!</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", margin: "0 15px" }}>
            <span style={{ fontSize: "2rem", marginRight: "10px" }}>☀️</span>
            <span>Guten Tag!</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", margin: "0 15px" }}>
            <span style={{ fontSize: "2rem", marginRight: "10px" }}>🌙</span>
            <span>Guten Abend!</span>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Countries & Nationalities 🌍",
    content: (
      <>
        <p>
          <span role="img" aria-label="german-flag">
            🇩🇪
          </span>{" "}
          <strong>DEUTSCH:</strong>
          <br />
          <span style={{ fontSize: "1.1rem" }}>Länder (Countries) und Nationalitäten (Nationalities):</span>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
          <div style={{ textAlign: "center", width: "120px" }}>
            <span style={{ fontSize: "2rem" }}>🇩🇪</span>
            <p>
              <strong>Deutschland</strong>
            </p>
            <p>deutsch</p>
          </div>
          <div style={{ textAlign: "center", width: "120px" }}>
            <span style={{ fontSize: "2rem" }}>🇪🇸</span>
            <p>
              <strong>Spanien</strong>
            </p>
            <p>spanisch</p>
          </div>
          <div style={{ textAlign: "center", width: "120px" }}>
            <span style={{ fontSize: "2rem" }}>🇺🇸</span>
            <p>
              <strong>USA</strong>
            </p>
            <p>amerikanisch</p>
          </div>
          <div style={{ textAlign: "center", width: "120px" }}>
            <span style={{ fontSize: "2rem" }}>🇲🇽</span>
            <p>
              <strong>Mexiko</strong>
            </p>
            <p>mexikanisch</p>
          </div>
          <div style={{ textAlign: "center", width: "120px" }}>
            <span style={{ fontSize: "2rem" }}>🇨🇴</span>
            <p>
              <strong>Kolumbien</strong>
            </p>
            <p>kolumbianisch</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#f0fff4", padding: "15px", borderRadius: "8px", margin: "15px 0" }}>
          <p>
            <span role="img" aria-label="notebook">
              📝
            </span>{" "}
            <strong>Structure:</strong>
          </p>
          <p>"Ich komme aus [Country]" = "I come from [Country]"</p>
          <p>"Ich bin [Nationality]" = "I am [Nationality]"</p>
        </div>

        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <p style={{ fontSize: "1.2rem", color: "#3b82f6" }}>"Ich komme aus Mexiko. Ich bin Mexikaner."</p>
          <p>(I come from Mexico. I am Mexican.)</p>
        </div>
      </>
    ),
  },
  {
    title: "Conversation Example: Countries & Nationalities",
    content: (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 14, fontSize: "1.18rem", textAlign: "center" }}>Sample Conversation</div>
        <div style={{
          background: "#f8fafc",
          borderRadius: 14,
          padding: "20px 30px",
          margin: "16px 0",
          boxShadow: "0 2px 8px #e0e7ef22"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#3b82f6", color: "#fff", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Lena
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Hallo! Ich heiße Lena. Ich komme aus Kolumbien. Und du?</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Hi! My name is Lena. I come from Colombia. And you?
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#facc15", color: "#3a3a3a", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Marco
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Hallo Lena! Ich heiße Marco. Ich komme aus Spanien.</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Hi Lena! My name is Marco. I come from Spain.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#3b82f6", color: "#fff", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Lena
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Bist du Spanier?</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Are you Spanish?
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#facc15", color: "#3a3a3a", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Marco
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Ja, ich bin Spanier.</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Yes, I am Spanish.
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: "0.85rem", marginTop: 10 }}>
          <b>Notice:</b> See how each line matches a simple question or answer about nationality and country.
        </div>
      </div>
    )
  },
  {
    title: "Professions 💼",
    content: (
      <>
        <p>
          <span role="img" aria-label="german-flag">
            🇩🇪
          </span>{" "}
          <strong>DEUTSCH:</strong>
          <br />
          <span style={{ fontSize: "1.1rem" }}>Berufe (Professions):</span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px",
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👩‍🏫</span>
            <div>
              <p>
                <strong>Lehrer/in</strong>
              </p>
              <p>Teacher</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👨‍⚕️</span>
            <div>
              <p>
                <strong>Arzt/Ärztin</strong>
              </p>
              <p>Doctor</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👩‍💼</span>
            <div>
              <p>
                <strong>Anwalt/Anwältin</strong>
              </p>
              <p>Lawyer</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👨‍💻</span>
            <div>
              <p>
                <strong>Programmierer/in</strong>
              </p>
              <p>Programmer</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👩‍🍳</span>
            <div>
              <p>
                <strong>Koch/Köchin</strong>
              </p>
              <p>Cook</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>👨‍🔧</span>
            <div>
              <p>
                <strong>Ingenieur/in</strong>
              </p>
              <p>Engineer</p>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#fff0f6", padding: "15px", borderRadius: "8px", margin: "15px 0" }}>
          <p>
            <span role="img" aria-label="info">
              ℹ️
            </span>{" "}
            <strong>Grammar note:</strong>
          </p>
          <p>
            In German, many professions have masculine and feminine forms. <br />
            The feminine form is usually formed by adding "-in" at the end.
          </p>
          <p>Ejemplo: Lehrer , Lehrerin → (Teacher)</p>
        </div>

        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <p style={{ fontSize: "1.2rem", color: "#3b82f6" }}>"Ich bin Ingenieur von Beruf."</p>
          <p>(I am an engineer by profession.)</p>
        </div>
      </>
    ),
  },
  {
    title: "Conversation Example: Professions",
    content: (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 14, fontSize: "1.18rem", textAlign: "center" }}>Sample Conversation</div>
        <div style={{
          background: "#f9f6ff",
          borderRadius: 14,
          padding: "20px 30px",
          margin: "16px 0",
          boxShadow: "0 2px 8px #e0e7ef22"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#06b6d4", color: "#fff", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Emma
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Was bist du von Beruf?</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                What is your profession?
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#a3e635", color: "#25431b", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Thomas
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Ich bin Ingenieur von Beruf. Und du?</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                I am an engineer by profession. And you?
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 14, justifyContent: "center" }}>
            <div style={{ background: "#06b6d4", color: "#fff", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Emma
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Ich bin Lehrerin. 👩‍🏫</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                I am a teacher.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#a3e635", color: "#25431b", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Thomas
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Arbeitest du an einer Schule?</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Do you work at a school?
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#06b6d4", color: "#fff", borderRadius: 16, padding: "7px 18px", fontWeight: 500, minWidth: 70, textAlign: "center" }}>
              Emma
            </div>
            <div style={{ marginLeft: 18, textAlign: "left" }}>
              <div>Ja, ich arbeite in Berlin.</div>
              <div style={{ fontSize: "0.98rem", color: "#475569", marginTop: 2 }}>
                Yes, I work in Berlin.
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: "0.85rem", marginTop: 10 }}>
          <b>Notice:</b> This is how you ask and answer about professions in a conversation.
        </div>
      </div>
    )
  },{
      title: "Note: Articles in German & English",
      content: (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Key Concept:</div>
          <div style={{ lineHeight: 1.7 }}>
            In German, every noun has a definite article that shows its gender:<br />
            <b>der</b> (masculine), <b>die</b> (feminine), <b>das</b> (neuter).<br />
            In English, the article is always <b>the</b>, no matter the gender.
          </div>
          <div style={{ background: "#fff3cd", borderRadius: 8, padding: "8px 15px", marginTop: 16 }}>
            <span role="img" aria-label="info">ℹ️</span>
            <b style={{ marginLeft: 6 }}>Tip:</b> Remember! The German article changes, but English stays the same.<br />
            <span style={{ color: "#a86d00" }}>
              <b>die Schule</b> = <b>the school</b><br />
              <b>der Apfel</b> = <b>the apple</b><br />
              <b>das Haus</b> = <b>the house</b>
            </span>
          </div>
        </div>
      ),
    }
];


export default function Section1View() {
  // Obtén nivel y número de sección de la URL (ej: /sections/A1/section-1)
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";
  const section = Number(rawParams.id) || 1;
  const navigate = useNavigate();

  // Estado global del progreso, guardado/cargado desde localStorage
  const [progress, setProgress] = useState<ProgressState>(
    () => loadSectionProgress(level, section)
  );

  // Cada vez que cambia el progreso, guárdalo automáticamente
  useEffect(() => {
    saveSectionProgress(level, section, progress);
  }, [progress, level, section]);

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
  function unlockNextSection(currentSectionId: number) {
    const nextSectionId = currentSectionId + 1;
    localStorage.setItem(`section${nextSectionId}Unlocked`, "true");
  }

  function toggleProgress(key: keyof ProgressState) {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function setQuizDone() {
    setProgress((prev) => ({ ...prev, quizDone: true }));
  }

  function setSectionDone() {
    setProgress((prev) => ({ ...prev, sectionDone: true }));
    unlockNextSection(section);
  }

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
            <h1 className="text-xl font-semibold">Self-introduction / Countries / Professions</h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Modern Sidebar Navigation */}
          <div className="lg:w-80 w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
              
              {/* Content Section */}
              <div className="mb-6">
                <button
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                    showContent 
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => {
                    setShowContent(!showContent);
                    setShowActivities(false);
                    setView("content");
                    setLessonView("");
                    setActivityView("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Content</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showContent && (
                  <div className="mt-3 ml-4 space-y-2">
                    <button
                      className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg w-full text-left transition-colors duration-200"
                      onClick={() => setLessonView("lesson1")}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Lessons</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Activities Section */}
              <div className="mb-6">
                <button
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                    showActivities 
                      ? 'bg-purple-50 text-purple-700 border-2 border-purple-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => {
                    setShowActivities(!showActivities);
                    setShowContent(false);
                    setView("activities");
                    setLessonView("");
                    setActivityView("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span>Activities</span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showActivities ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showActivities && (
                  <div className="mt-3 ml-4 space-y-2">
                    <button
                      className="flex items-center gap-2 p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg w-full text-left transition-colors duration-200"
                      onClick={() => setActivityView("activity1")}
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Activity 1: Flashcards</span>
                    </button>
                    <button
                      className="flex items-center gap-2 p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg w-full text-left transition-colors duration-200"
                      onClick={() => setActivityView("activity2")}
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Activity 2: Cloze test</span>
                    </button>
                    <button
                      className="flex items-center gap-2 p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg w-full text-left transition-colors duration-200"
                      onClick={() => setActivityView("activity3")}
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Activity 3: Multiple choice</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quiz Section */}
              <div className="mb-6">
                <button
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                    view === "quiz"
                      ? 'bg-orange-50 text-orange-700 border-2 border-orange-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => {
                    setView("quiz");
                    setShowContent(false);
                    setShowActivities(false);
                    setLessonView("");
                    setActivityView("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Quiz</span>
                  </div>
                </button>
              </div>

              {/* Progress Section */}
              <div>
                <button
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                    showProgress
                      ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setShowProgress(true)}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Progress</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[600px]">
        <div className="flex-1 flex flex-col items-center min-w-0 w-full">
          {showProgress ? (
            <div style={{ width: "100%", marginTop: 32 }}>
              <ProgressReport progress={progress} />
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <button
                  className="px-9 py-4 rounded-full font-bold text-xl border-none text-white bg-sky-400 cursor-pointer text-center shadow-lg transition-all duration-150 hover:bg-sky-500 hover:shadow-2xl hover:scale-105"
                  style={{
                    background: "#1769aa",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    borderRadius: 40,
                  }}
                  onClick={() => setShowProgress(false)}
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <>
              {view === "content" && (
                <div className="flex flex-col items-center text-center mt-9 w-full">
                  {lessonView === "" ? (
                    <>
                      <div className="relative flex flex-col items-center mb-6">
                      <span className="block text-lg text-blue-900 mt-1.5 text-center font-normal tracking-wide max-sm:text-sm max-sm:px-3 max-sm:pb-2 max-sm:break-words max-sm:max-w-[98vw] max-sm:mx-auto max-sm:leading-tight">
                          Don't forget to mark your lessons, activities, quiz,<br />
                          and section as <span className="text-emerald-500 font-medium">done</span> to track your progress!
                         </span>

                        <img src={klaus} className="w-[395px] h-auto mb-2.5 drop-shadow-2xl max-sm:w-full max-sm:max-w-[500px] max-sm:block max-sm:mx-auto" alt="Klaus mascot" />
                      </div>
                      <div className="w-full flex justify-center mt-[-2.5rem] mb-0 ml-28">
                        <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none" onClick={() => setLessonView("lesson1")}>
                          <img src={nextImg} alt="Next" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="flex flex-col items-center gap-6 my-8">
                        <LessonBoard boards={lessonBoards} />
                        <MarkAsDoneButton
                          done={progress.lessons}
                          onClick={() => toggleProgress("lessons")}
                          label="Finish Lessons"
                        />
                      </div>
                      <div className="w-full flex flex-row justify-between px-12 gap-4 flex-row-reverse max-sm:px-4 max-sm:justify-between">
                        <button
                          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                          onClick={() => {
                            setView("activities");
                            setLessonView("");
                          }}
                        >
                          <img src={nextImg} alt="Next" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                        <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none" onClick={() => setLessonView("")}>
                          <img src={nextOp} alt="Back" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {view === "activities" && (
                <div className="flex flex-col items-center text-center mt-9 w-full">
                  {activityView === "" ? (
                    <>
                      <p className="mb-[-2rem] max-sm:text-sm max-sm:px-3 max-sm:pb-2 max-sm:break-words max-sm:max-w-[98vw] max-sm:mx-auto max-sm:leading-tight">Choose a learning activity from the dropdown menu.</p>
                      <div className="flex justify-center items-center my-5 mt-15" style={{ marginTop: "60px" }}>
                        <img src={klaus2} className="w-[395px] h-auto mb-2.5 drop-shadow-2xl max-sm:w-full max-sm:max-w-[500px] max-sm:block max-sm:mx-auto" alt="Klaus Activity mascot" />
                      </div>
                      <div className="w-full flex flex-row justify-between px-12 mt-8 gap-4 flex-row-reverse max-sm:px-4 max-sm:justify-between">
                        <button
                          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                          onClick={() => setActivityView("activity1")}
                        >
                          <img src={nextImg} alt="Next" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                        <button
                          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                          onClick={() => {
                            setView("content");
                            setLessonView("lesson1");
                          }}
                        >
                          <img src={nextOp} alt="Back" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="max-sm:text-sm max-sm:px-3 max-sm:pb-2 max-sm:break-words max-sm:max-w-[98vw] max-sm:mx-auto max-sm:leading-tight">
                        <strong>
                          {`Activity ${activityView.replace("activity", "")}: ${
                            activityTitles[activityView]
                          }`}
                        </strong>
                      </p>
                      {activityView === "activity1" && (
                        <div className="flex flex-col items-center gap-6 my-8">
                          <Flashcards />
                          <MarkAsDoneButton
                            done={progress.activity1}
                            onClick={() => toggleProgress("activity1")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      {activityView === "activity2" && (
                        <div className="flex flex-col items-center gap-6 my-8">
                          <ClozeTest />
                          <MarkAsDoneButton
                            done={progress.activity2}
                            onClick={() => toggleProgress("activity2")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      {activityView === "activity3" && (
                        <div className="flex flex-col items-center gap-6 my-8">
                          <Questions />
                          <MarkAsDoneButton
                            done={progress.activity3}
                            onClick={() => toggleProgress("activity3")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      <div className="w-full flex flex-row justify-between px-12 mt-8 gap-4 flex-row-reverse max-sm:px-4 max-sm:justify-between">
                        <button
                          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                          onClick={() => {
                            if (activityView === "activity1") {
                              setActivityView("activity2");
                            } else if (activityView === "activity2") {
                              setActivityView("activity3");
                            } else if (activityView === "activity3") {
                              setView("quiz");
                              setActivityView("");
                            }
                          }}
                        >
                          <img src={nextImg} alt="Next" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                        <button
                          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                          onClick={() => {
                            if (activityView === "activity3") {
                              setActivityView("activity2");
                            } else if (activityView === "activity2") {
                              setActivityView("activity1");
                            } else if (activityView === "activity1") {
                              setActivityView("");
                            }
                          }}
                        >
                          <img src={nextOp} alt="Back" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {view === "quiz" && (
                <div className="flex flex-col items-center text-center mt-9 w-full">
                  <Quiz
                    quizDone={progress.quizDone}
                    setQuizDone={setQuizDone}
                    sectionDone={progress.sectionDone}
                    setSectionDone={setSectionDone}
                  />
                  <div className="w-full flex flex-row justify-between px-12 mt-8 gap-4 flex-row-reverse max-sm:px-4 max-sm:justify-between">
                    <button
                      className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none"
                      onClick={() => {
                        setView("activities");
                        setActivityView("activity3");
                      }}
                    >
                      <img src={nextOp} alt="Back" className="w-[70px] h-[70px] object-contain block bg-transparent rounded-none shadow-none" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
