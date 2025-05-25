import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../pages/Section1View.css'; // Usa el mismo CSS
import klaus from '../assets/Klaus002.png';
import klaus2 from '../assets/Klaus0004.png';
import nextImg from '../assets/next.png';
import nextOp from '../assets/nextop.png';
import Procs from '../assets/procs.png';
import LessonBoard from './LessonBoard';
import ClozeTest from './ClozetestS2.tsx'; // tengo que crearme otro tsx con su nuevo ts (sin css)
import Flashcards from './Flashcards2.tsx';// tengo que crearme otro tsx con su nuevo ts (sin css)
import Questions from './QuestionsS2.tsx';// tengo que crearme otro tsx con su nuevo ts (sin css)
import MarkAsDoneButton from './MarkAsDoneButton';
import Quiz from './Quiz2.tsx';//cambiar el import per section
import ProgressReport from './ProgressReport';
import { useNavigate, useParams } from 'react-router-dom';
// debo crear quiz nuevo con nueva badge siempre y cambiar el nombre del Label finished lesson (al numero de la nueva lesson)
// Define el estado del progreso de la sección
type ProgressState = {
  lessons: boolean;
  activity1: boolean;
  activity2: boolean;
  activity3: boolean;
  quizDone: boolean;
  sectionDone: boolean;
};

// Utils para guardar/cargar progreso
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

// Aquí defines el contenido para Section 2
const lessonBoards2 = [
  {
    title: "LESSON 2: The Alphabet & Numbers",
    content: (
      <>
        <p>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong>
          <br />
          Willkommen! In dieser Lektion lernst du das deutsche Alphabet und die Zahlen kennen.<br />
          Diese Grundlagen helfen dir, Wörter zu buchstabieren und Zahlen zu verstehen.<br /><br />
          <b>Beispiel:</b> <br />
          <span style={{ color: "#3b82f6" }}>
            Wie buchstabiert man „Berlin“? — B-E-R-L-I-N<br />
            Wie alt bist du? — Ich bin zwanzig Jahre alt.
          </span>
        </p>
        <p>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong>
          <br />
          Welcome! In this lesson, you’ll learn the German alphabet and numbers.<br />
          These basics help you spell words and understand ages or quantities.<br /><br />
          <b>Example:</b> <br />
          <span style={{ color: "#3b82f6" }}>
            How do you spell “Berlin”? — B-E-R-L-I-N<br />
            How old are you? — I am twenty years old.
          </span>
        </p>
      </>
    )
  },
  
  
  // ...puedes agregar más boards aquí para la lección 2
     // 1. Alphabet
     {
      title: "Alphabet Overview",
      content: (
        <>
          <p>
            <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
            Das deutsche Alphabet hat 26 Buchstaben (26 Letters):
            <br />
            <span style={{ color: "#64748b", fontStyle: "italic", fontSize: "0.97rem" }}>
            (In parentheses, you’ll find the phonetic pronunciation of each letter) 
            </span>
            <br />
            <span style={{ color: "#3b82f6" }}>
              <b>A</b> (ah), <b>B</b> (beh), <b>C</b> (tseh), <b>D</b> (deh), <b>E</b> (eh), <b>F</b> (eff), <b>G</b> (geh), <b>H</b> (hah), <b>I</b> (ee),<br />
              <b>J</b> (yot), <b>K</b> (kah), <b>L</b> (ell), <b>M</b> (emm), <b>N</b> (enn), <b>O</b> (oh), <b>P</b> (peh), <b>Q</b> (kuh),<br />
              <b>R</b> (err), <b>S</b> (ess), <b>T</b> (teh), <b>U</b> (uh), <b>V</b> (fau), <b>W</b> (veh), <b>X</b> (iks), <b>Y</b> (üpsilon), <b>Z</b> (tsett)
            </span>
          </p>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
            The German alphabet is the same size as English, but some letters sound different:
          </div>
          <div style={{ textAlign: "center", marginTop: 12, marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>
              <b>J</b> = “yot” <span style={{ color: "#64748b" }}>(sounds like “y” in “yes”)</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>V</b> = “fau” <span style={{ color: "#64748b" }}>(sounds like “f”)</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>W</b> = “veh” <span style={{ color: "#64748b" }}>(sounds like English “v”)</span>
            </div>
            <div>
              <b>Z</b> = “tsett” <span style={{ color: "#64748b" }}>(like “ts” in “cats”)</span>
            </div>
          </div>
        </>
      )
    },
    
    
    

  // 2. Special Letters
  {
    title: "Special Letters & Pronunciation",
    content: (
      <>
        <div>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          Umlaute: <span style={{ color: "#eab308" }}><b>Ä ä</b></span> (like “e” in “bed”),{" "}
          <span style={{ color: "#a3e635" }}><b>Ö ö</b></span> (like French “eu”),{" "}
          <span style={{ color: "#06b6d4" }}><b>Ü ü</b></span> (like “ee” but with rounded lips).<br />
          <b>ß</b> (“Eszett” or “scharfes S”): always pronounced as “ss.”
        </div>
        <div style={{ marginTop: 14 }}>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          German has special letters: Ä, Ö, Ü (“umlauts”) and ß (sharp s). These affect how words <br></br>are pronounced.<br />
          <b>Example:</b> Straße = “shtrah-seh” (street), Mädchen = “MEHT-hen” (girl)
        </div>
        <div style={{ background: "#e0f7fa", padding: "10px 16px", borderRadius: 8, margin: "14px 0" }}>
          <b>Tip:</b> Umlaut vowels are important for meaning. <br></br>For example: <b>schon</b> (already) vs. <b>schön</b> (beautiful).
        </div>
      </>
    )
  },
  // 3. Numbers 1–12
  {
    title: "Numbers 1–12",
    content: (
      <>
        <div>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          <span style={{ color: "#3b82f6" }}>
            1: <b>eins</b> (ains), 2: <b>zwei</b> (tsvai), 3: <b>drei</b> (drai), 4: <b>vier</b> (feer),<br />
            5: <b>fünf</b> (fünf), 6: <b>sechs</b> (zeks), 7: <b>sieben</b> (zeeben),<br />
            8: <b>acht</b> (acht), 9: <b>neun</b> (noyn), 10: <b>zehn</b> (tsayn),<br />
            11: <b>elf</b> (elf), 12: <b>zwölf</b> (tsvölf)
          </span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          The numbers from 1 to 12 have unique names. Their pronunciation is shown in parentheses.
        </div>
        <div style={{ background: "#fff3cd", padding: "10px 16px", borderRadius: 8, margin: "14px 0" }}>
          <b>Tip:</b> 7 and 17 in German are <span style={{ color: "#0ea5e9" }}>“sieben”</span> and <span style={{ color: "#0ea5e9" }}>“siebzehn”</span> (not “sieb-enzehn”).
        </div>
      </>
    )
  },
  // 4. Numbers 13–20 & Pattern
  {
    title: "Numbers 13–20 & Patterns",
    content: (
      <>
        <div>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          <span style={{ color: "#7c3aed " }}>
            13: <b>dreizehn</b> (drai-tsayn), 14: <b>vierzehn</b> (feer-tsayn),<br />
            15: <b>fünfzehn</b> (fünf-tsayn), 16: <b>sechzehn</b> (zek-tsayn),<br />
            17: <b>siebzehn</b> (zeeb-tsayn), 18: <b>achtzehn</b> (acht-tsayn),<br />
            19: <b>neunzehn</b> (noyn-tsayn), 20: <b>zwanzig</b> (tsvan-tsig)
          </span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          13–19 follow the pattern “unit + zehn (10)”: <b>dreizehn</b> = “three-ten”,<br></br> <b>vierzehn</b> = “four-ten”, etc. 20 is “zwanzig”.
        </div>
        <div style={{ background: "#f0fff4", padding: "10px 16px", borderRadius: 8, margin: "14px 0" }}>
          <b>Pattern:</b> [unit] + zehn. (Ex: 18 = achtzehn)
        </div>
      </>
    )
  },
  // 5. Numbers above 20
  {
    title: "Numbers Above 20",
    content: (
      <>
        <div>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          <span style={{ color: "#22c55e" }}>
            21: <b>einundzwanzig</b> (ain-und-tsvan-tsig)<br />
            32: <b>zweiunddreißig</b> (tsvai-und-drai-sig)<br />
            44: <b>vierundvierzig</b> (feer-und-feer-tsig)
          </span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          For numbers 21 and above, the unit comes first, then “und” (and), then the ten.<br></br> Ex: 21 = one-and-twenty.
        </div>
        <div style={{ background: "#e0f7fa", padding: "10px 16px", borderRadius: 8, margin: "14px 0" }}>
          <b>Structure:</b> [unit] + und + [ten] (e.g., dreiundzwanzig = 23)
        </div>
      </>
    )
  },
  // 6. Personal Pronouns & Present Tense
  {
    title: "Personal Pronouns & Present Tense",
    content: (
      <>
        <div>
          <span role="img" aria-label="german-flag">🇩🇪</span> <strong>DEUTSCH:</strong><br />
          <b>ich</b> (I), <b>du</b> (you), <b>er</b> (he), <b>sie</b> (she), <b>es</b> (it),<br />
          <b>wir</b> (we), <b>ihr</b> (you all), <b>sie</b> (they)
          <br /><br />
          <b>sein</b> (to be):<br />
          ich <b>bin</b> (I am), du <b>bist</b> (you are), er/sie/es <b>ist</b> (he/she/it is),<br />
          wir <b>sind</b> (we are), ihr <b>seid</b> (you all are), sie <b>sind</b> (they are)
        </div>
        <div style={{ marginTop: 10 }}>
          <span role="img" aria-label="british-flag">🇬🇧</span> <strong>Explanation in English:</strong><br />
          German verbs change their ending with each pronoun. <br></br>Example: <b>ich bin</b> = “I am”, <b>du bist</b> = “you are”, <b>sie sind</b> = “they are”.
        </div>
        <div style={{ background: "#ffeaea", padding: "10px 16px", borderRadius: 8, margin: "14px 0" }}>
          <b>Tip:</b> Unlike English, you always use the pronoun in German.
        </div>
      </>
    )
  },
  {
    title: "Present Tense",
    content: (
      <div>
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: "1.12rem", marginBottom: 14 }}>
          How does the present tense work in German?
        </div>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          In German, the present tense (<b>Präsens</b>) is used to talk about what you do now,<br></br> what happens regularly, or even future plans.<br />
          <span style={{ color: "#0ea5e9", fontWeight: 500 }}>
            You use it much more than in English!
          </span>
        </div>
        <div style={{
          background: "#f0f9ff",
          borderRadius: 10,
          padding: "15px 16px",
          margin: "0 auto 14px auto",
          maxWidth: 520,
          fontSize: "1.06rem",
          lineHeight: 1.6
        }}>
          <b>Examples:</b><br />
          <span style={{ color: "#a21caf" }}>Ich lerne Deutsch.</span> <span style={{ color: "#64748b" }}>I learn German. / I am learning German.</span><br />
          <span style={{ color: "#a21caf" }}>Du wohnst in Berlin.</span> <span style={{ color: "#64748b" }}>You live in Berlin.</span><br />
          <span style={{ color: "#a21caf" }}>Er spielt Fußball.</span> <span style={{ color: "#64748b" }}>He plays football. / He is playing football.</span><br />
          <span style={{ color: "#a21caf" }}>Wir gehen ins Kino.</span> <span style={{ color: "#64748b" }}>We are going to the cinema.</span>
        </div>
        <div style={{ textAlign: "center", margin: "8px 0 0 0", color: "#16a34a", fontWeight: 500 }}>
          <span role="img" aria-label="bulb">💡</span> <b>Tip:</b> The same form is used for “I learn” and “I am learning.”<br />
          Just change the verb ending for each pronoun!
        </div>
        <div style={{ background: "#fff3cd", borderRadius: 8, padding: "8px 15px", margin: "18px auto 0 auto", maxWidth: 520, color: "#a86d00", textAlign: "center" }}>
          <b>Pattern:</b> Pronoun + verb (with correct ending) + rest of the sentence.<br />
          <span style={{ color: "#3b82f6" }}>Ex: Ich lerne – Du lernst – Er lernt</span>
        </div>
      </div>
    )
  },
  {
    title: "Present Tense Endings – Common Verbs",
    content: (
      <div>
        <div style={{
          background: "#f6eafe",
          borderRadius: 16,
          padding: "32px 36px 22px 36px",
          margin: "0 auto 18px auto",
          maxWidth: 800,
          boxShadow: "0 2px 12px #c7b1e622"
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.12rem", textAlign: "center", marginBottom: 10 }}>
            Present Tense Endings
          </div>
          <div style={{ color: "#a21caf", textAlign: "center", marginBottom: 15, fontSize: "1.01rem" }}>
            <b>How to use:</b> Match the correct ending to the subject pronoun (who does the action).<br />
            Each pronoun always takes its own ending.<br />
            <span style={{ color: "#16a34a" }}>
              For example:<br />
              <b>ich</b> → <b>-e</b> (“I”), <b>du</b> → <b>-st</b> (“you”), <b>er/sie/es</b> → <b>-t</b> (“he/she/it”),<br />
              <b>wir</b> → <b>-en</b> (“we”), <b>ihr</b> → <b>-t</b> (“you all”), <b>sie/Sie</b> → <b>-en</b> (“they/you formal”)
            </span>
          </div>
          {/* Tabla visual de terminaciones */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(54px,1fr))",
            gap: "0px 4px",
            fontSize: "1.02rem",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}>
            <div><b>ich</b></div>
            <div><b>du</b></div>
            <div><b>er<br />sie<br />es</b></div>
            <div><b>wir</b></div>
            <div><b>ihr</b></div>
            <div><b>sie<br />Sie</b></div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-e</div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-st</div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-t</div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-en</div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-t</div>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>-en</div>
          </div>
          {/* Verbos comunes en dos columnas y uno abajo */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 32px",
            marginTop: 22,
            marginBottom: 4,
            alignItems: "start"
          }}>
            <div>
              <b>lernen</b> <span style={{ color: "#64748b" }}>(to learn):</span><br />
              <span style={{ color: "#0ea5e9" }}>lerne, lernst, lernt, lernen, lernt, lernen</span>
            </div>
            <div>
              <b>kommen</b> <span style={{ color: "#64748b" }}>(to come):</span><br />
              <span style={{ color: "#0ea5e9" }}>komme, kommst, kommt, kommen, kommt,<br></br> kommen</span>
            </div>
          </div>
          <div style={{ marginTop: 14, textAlign: "center" }}>
            <b>sprechen</b> <span style={{ color: "#64748b" }}>(to speak):</span><br />
            <span style={{ color: "#0ea5e9" }}>spreche, sprichst, spricht, sprechen, sprecht, sprechen</span>
          </div>
        </div>
        <div style={{ textAlign: "center", color: "#a21caf", fontSize: "1rem", marginTop: 2 }}>
          Just add the right ending to the stem for each pronoun. <span role="img" aria-label="wink">😉</span>
        </div>
      </div>
    )
  },
  
  
  
  
  // 7. Dialogue 1: Greetings & Age
  {
    title: "Mini Dialogue: Greetings & Age",
    content: (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: "1.12rem", textAlign: "center" }}>Sample Conversation</div>
        <div style={{
          background: "#f8fafc",
          borderRadius: 18,
          padding: "26px 32px",
          margin: "18px auto",
          boxShadow: "0 2px 8px #e0e7ef22",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Anna */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 12
          }}>
            <div style={{
              background: "#0ea5e9",
              color: "#fff",
              borderRadius: 24,
              padding: "8px 32px",
              fontWeight: 600,
              fontSize: "1.07rem",
              marginRight: 24,
              minWidth: 90,
              textAlign: "center"
            }}>
              Anna
            </div>
            <div>
              Hallo! Ich bin Anna.<br />
              <span style={{ color: "#64748b", fontSize: "1.04rem" }}>Hello! I am Anna.</span>
            </div>
          </div>
          {/* Paul */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 12
          }}>
            <div style={{
              background: "#4ade80",
              color: "#212121",
              borderRadius: 24,
              padding: "8px 32px",
              fontWeight: 600,
              fontSize: "1.07rem",
              marginRight: 24,
              minWidth: 90,
              textAlign: "center"
            }}>
              Paul
            </div>
            <div>
              Hallo Anna! Ich heiße Paul.<br />
              <span style={{ color: "#60a5fa", fontSize: "1.04rem" }}>Hello Anna! My name is Paul.</span>
            </div>
          </div>
          {/* Anna */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 12
          }}>
            <div style={{
              background: "#0ea5e9",
              color: "#fff",
              borderRadius: 24,
              padding: "8px 32px",
              fontWeight: 600,
              fontSize: "1.07rem",
              marginRight: 24,
              minWidth: 90,
              textAlign: "center"
            }}>
              Anna
            </div>
            <div>
              Wie alt bist du?<br />
              <span style={{ color: "#60a5fa", fontSize: "1.04rem" }}>How old are you?</span>
            </div>
          </div>
          {/* Paul */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}>
            <div style={{
              background: "#4ade80",
              color: "#212121",
              borderRadius: 24,
              padding: "8px 32px",
              fontWeight: 600,
              fontSize: "1.07rem",
              marginRight: 24,
              minWidth: 90,
              textAlign: "center"
            }}>
              Paul
            </div>
            <div>
              Ich bin <b>achtzehn</b> Jahre alt. <span style={{ color: "#60a5fa" }}>[acht-tsayn]</span><br />
              <span style={{ color: "#60a5fa", fontSize: "1.04rem" }}>I am 18 years old.</span>
            </div>
          </div>
        </div>
        <div style={{
          textAlign: "center",
          fontSize: "1.08rem",
          color: "#a21caf",
          marginTop: 10
        }}>
          See how <b>“ich bin”</b> (I am) and numbers are used for age.
        </div>
      </div>
    )
  },

  {
    title: "Mini Dialogue: Pronouns & Present Tense",
    content: (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: "1.12rem", textAlign: "center" }}>
          Sample Conversation
        </div>
        <div
          style={{
            background: "#f1f5f9",
            borderRadius: 30,
            padding: "32px 38px",
            margin: "16px auto",
            boxShadow: "0 2px 8px #e0e7ef22",
            maxWidth: 650,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Sofia */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            width: "100%",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 14px",
              fontWeight: 600,
              fontSize: "0.99rem",
              marginRight: 16,
              minWidth: 56,
              textAlign: "center",
              boxShadow: "0 2px 4px #7c3aed18"
            }}>
              Sofia
            </div>
            <div style={{
              textAlign: "left",
              fontSize: "1.08rem"
            }}>
              Hallo Ben! Woher kommst du?<br />
              <span style={{ color: "#64748b", fontSize: "0.97rem" }}>
                Hi Ben! Where are you from?
              </span>
            </div>
          </div>
          {/* Ben */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            width: "100%",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#0891b2",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 14px",
              fontWeight: 600,
              fontSize: "0.99rem",
              marginRight: 16,
              minWidth: 56,
              textAlign: "center",
              boxShadow: "0 2px 4px #0891b218"
            }}>
              Ben
            </div>
            <div style={{
              textAlign: "left",
              fontSize: "1.08rem"
            }}>
              Ich komme aus Deutschland. Und du?<br />
              <span style={{ color: "#64748b", fontSize: "0.97rem" }}>
                I come from Germany. And you?
              </span>
            </div>
          </div>
          {/* Sofia */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            width: "100%",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 14px",
              fontWeight: 600,
              fontSize: "0.99rem",
              marginRight: 16,
              minWidth: 56,
              textAlign: "center",
              boxShadow: "0 2px 4px #7c3aed18"
            }}>
              Sofia
            </div>
            <div style={{
              textAlign: "left",
              fontSize: "1.08rem"
            }}>
              Ich bin aus Mexiko. Lebst du in Berlin?<br />
              <span style={{ color: "#64748b", fontSize: "0.97rem" }}>
                I am from Mexico. Do you live in Berlin?
              </span>
            </div>
          </div>
          {/* Ben */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            width: "100%",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#0891b2",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 14px",
              fontWeight: 600,
              fontSize: "0.99rem",
              marginRight: 16,
              minWidth: 56,
              textAlign: "center",
              boxShadow: "0 2px 4px #0891b218"
            }}>
              Ben
            </div>
            <div style={{
              textAlign: "left",
              fontSize: "1.08rem"
            }}>
              Ja, ich lebe dort. Sprichst du Deutsch?<br />
              <span style={{ color: "#64748b", fontSize: "0.97rem" }}>
                Yes, I live there. Do you speak German?
              </span>
            </div>
          </div>
          {/* Sofia */}
          <div style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: 16,
              padding: "6px 14px",
              fontWeight: 600,
              fontSize: "0.99rem",
              marginRight: 16,
              minWidth: 56,
              textAlign: "center",
              boxShadow: "0 2px 4px #7c3aed18"
            }}>
              Sofia
            </div>
            <div style={{
              textAlign: "left",
              fontSize: "1.08rem"
            }}>
              Ein bisschen! Ich spreche mehr Englisch.<br />
              <span style={{ color: "#64748b", fontSize: "0.97rem" }}>
                A little! I speak more English.
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: "1rem", color: "#7c3aed", marginTop: 10 }}>
          This dialogue uses different personal pronouns and several present tense verbs:<br />
          <b>bin</b> (am), <b>komme</b> (come), <b>lebe</b> (live), <b>sprichst</b> (speak), <b>spreche</b> (speak).
        </div>
      </div>
    )
  }
  

];

export default function Section2View() {
  // Igual que Section1View
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";
  const section = Number(rawParams.id) || 2;
  const navigate = useNavigate();

  const [progress, setProgress] = useState<ProgressState>(
    () => loadSectionProgress(level, section)
  );

  useEffect(() => {
    saveSectionProgress(level, section, progress);
  }, [progress, level, section]);

  const [view, setView] = useState<'content' | 'activities' | 'quiz'>('content');
  const [showContent, setShowContent] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [lessonView, setLessonView] = useState('');
  const [activityView, setActivityView] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  // Puedes personalizar los títulos de las actividades para Section 2
  const activityTitles: Record<string, string> = {
    activity1: "Flashcards",
    activity2: "Cloze test",
    activity3: "Multiple choice",
  };

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
    <div>
      <Navbar />
      <div className="top-section-btn-container">
        <button className="section-btn" onClick={() => navigate(`/sections/${level}`)}>
          ← SECTION {section}
        </button>
      </div>
      <div className="section-title-centered">
        {/* Cambia el título para Section 2 */}
        “The Alphabet & Numbers/ Personal pronouns & Present Tense”
      </div>
      <div className="section-view-container">
        <div className="section-sidebar">
          {/* El resto de la barra lateral puede ser igual */}
          <button
            className="sidebar-btn"
            onClick={() => {
              setShowContent(!showContent);
              setShowActivities(false);
              setView("content");
              setLessonView("");
              setActivityView("");
            }}
          >
            CONTENT ▼
          </button>
          {showContent && (
            <div className="dropdown-list">
              <span className="dropdown-item" onClick={() => setLessonView("lesson2")}>
                • Lessons
              </span>
            </div>
          )}
          <button
            className="sidebar-btn activities-btn"
            onClick={() => {
              setShowActivities(!showActivities);
              setShowContent(false);
              setView("activities");
              setLessonView("");
              setActivityView("");
            }}
          >
            ACTIVITIES ▼
          </button>
          {showActivities && (
            <div className="dropdown-list">
              <span className="dropdown-item" onClick={() => setActivityView("activity1")}>
                • Activity 1: Flashcards
              </span>
              <span className="dropdown-item" onClick={() => setActivityView("activity2")}>
                • Activity 2: Cloze test
              </span>
              <span className="dropdown-item" onClick={() => setActivityView("activity3")}>
                • Activity 3: Multiple choice
              </span>
            </div>
          )}
          <button
            className="sidebar-btn quiz-btn"
            onClick={() => {
              setView("quiz");
              setShowContent(false);
              setShowActivities(false);
              setLessonView("");
              setActivityView("");
            }}
          >
            QUIZ
          </button>
          <button
            className="sidebar-btn progress-btn"
            onClick={() => setShowProgress(true)}
          >
            <img src={Procs} alt="Progress" className="progress-icon" /> PROGRESS
          </button>
        </div>

        <div className="section-main">
          {showProgress ? (
            <div style={{ width: "100%", marginTop: 32 }}>
              <ProgressReport progress={progress} />
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <button
                  className="section-btn"
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
                <div className="section-content">
                  {lessonView === "" ? (
                    <>
                      <div className="klaus-balloon-container">
                      <span className="intro-reminder tip">
                          Don’t forget to mark your lessons, activities, quiz,<br />
                          and section as <span className="done-green">done</span> to track your progress!
                         </span>
                        <img src={klaus} className="klaus-img" alt="Klaus mascot" />
                      </div>
                      <div className="next-btn-wrapper-intro">
                        <button className="next-btn" onClick={() => setLessonView("lesson2")}>
                          <img src={nextImg} alt="Next" className="next-img" />
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
                      <LessonBoard boards={lessonBoards2} />
                      <MarkAsDoneButton
                        done={progress.lessons}
                        onClick={() => toggleProgress("lessons")}
                        label="Finish Lessons"
                      />
                      <div className="next-btn-wrapper" style={{ marginTop: 30 }}>
                        <button
                          className="next-btn"
                          onClick={() => {
                            setView("activities");
                            setLessonView("");
                          }}
                        >
                          <img src={nextImg} alt="Next" className="next-img" />
                        </button>
                        <button className="next-btn" onClick={() => setLessonView("")}>
                          <img src={nextOp} alt="Back" className="next-img" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {view === "activities" && (
                <div className="section-content">
                  {activityView === "" ? (
                    <>
                      <p>Choose a learning activity from the dropdown menu.</p>
                      <div className="klaus-activity-container" style={{ marginTop: "60px" }}>
                        <img src={klaus2} className="klaus-img" alt="Klaus Activity mascot" />
                      </div>
                      <div className="next-btn-wrapper">
                        <button
                          className="next-btn-actv"
                          onClick={() => setActivityView("activity1")}
                        >
                          <img src={nextImg} alt="Next" className="next-img" />
                        </button>
                        <button
                          className="next-btn"
                          onClick={() => {
                            setView("content");
                            setLessonView("lesson2");
                          }}
                        >
                          <img src={nextOp} alt="Back" className="next-img" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>
                          {`Activity ${activityView.replace("activity", "")}: ${
                            activityTitles[activityView]
                          }`}
                        </strong>
                      </p>
                      {activityView === "activity1" && (
                        <div style={{ margin: "30px 0" }}>
                          <Flashcards />
                          <MarkAsDoneButton
                            done={progress.activity1}
                            onClick={() => toggleProgress("activity1")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      {activityView === "activity2" && (
                        <div style={{ margin: "30px 0" }}>
                          <ClozeTest />
                          <MarkAsDoneButton
                            done={progress.activity2}
                            onClick={() => toggleProgress("activity2")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      {activityView === "activity3" && (
                        <div style={{ margin: "30px 0" }}>
                          <Questions />
                          <MarkAsDoneButton
                            done={progress.activity3}
                            onClick={() => toggleProgress("activity3")}
                            label="Mark as done"
                          />
                        </div>
                      )}
                      <div className="next-btn-wrapper">
                        <button
                          className="next-btn-actv"
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
                          <img src={nextImg} alt="Next" className="next-img" />
                        </button>
                        <button
                          className="next-btn"
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
                          <img src={nextOp} alt="Back" className="next-img" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              {view === "quiz" && (
                <div className="section-content">
                  <Quiz
                    quizDone={progress.quizDone}
                    setQuizDone={setQuizDone}
                    sectionDone={progress.sectionDone}
                    setSectionDone={setSectionDone}
                  />
                  <div className="next-btn-wrapper-quiz">
                    <button
                      className="next-btn"
                      onClick={() => {
                        setView("activities");
                        setActivityView("activity3");
                      }}
                    >
                      <img src={nextOp} alt="Back" className="next-img" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

















