import { useState, useEffect } from 'react';
import Navbar from '../../components/NAVBAR';
import klaus from '../../assets/Klaus002.png';
import klaus2 from '../../assets/Klaus0004.png';
import nextImg from '../../assets/next.png';
import nextOp from '../../assets/nextop.png';
import LessonBoard from '../../components/LESSON_BOARD';
import ClozeTest from '../../components/CLOZETEST_S2';
import Flashcards from '../../components/FLASHCARDS_2';
import Questions from '../../components/QUESTIONS_S2';
import MarkAsDoneButton from '../../components/MARK_AS_DONE_BUTTON';
import Quiz from '../../components/QUIZ_2';
import ProgressReport from '../../components/PROGRESS_REPORT';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import type { ProgressField } from '../../api/api';

// Define el estado del progreso de la sección
type ProgressState = {
  lessons: boolean;
  activity1: boolean;
  activity2: boolean;
  activity3: boolean;
  quizDone: boolean;
  sectionDone: boolean;
};

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
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-1 gap-y-2 text-center text-sm sm:text-base mb-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-6 mb-1">
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
  // API-based progress system
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";
  const section = Number(rawParams.id) || 2;
  const navigate = useNavigate();
  const { progress: userProgress, updateProgress } = useUser();

  // Helper function to map API progress fields to component format
  const mapFromAPI = (apiProgress: Record<ProgressField, boolean> | undefined) => {
    if (!apiProgress) return null;
    return {
      lessons: apiProgress.lessons || false,
      activity1: apiProgress.activity_1 || false,
      activity2: apiProgress.activity_2 || false,
      activity3: apiProgress.activity_3 || false,
      quizDone: apiProgress.quiz || false,
      sectionDone: apiProgress.section_complete || false,
    };
  };

  // Helper function to map component field names to API field names
  const mapToAPIField = (field: keyof ProgressState): ProgressField => {
    const mapping: Record<keyof ProgressState, ProgressField> = {
      lessons: 'lessons',
      activity1: 'activity_1',
      activity2: 'activity_2', 
      activity3: 'activity_3',
      quizDone: 'quiz',
      sectionDone: 'section_complete'
    };
    return mapping[field];
  };

  // Estado local del progreso basado en el progreso del usuario desde la API
  const [progress, setProgress] = useState<ProgressState>(() => {
    const mappedProgress = mapFromAPI(userProgress?.section2);
    return mappedProgress || {
      lessons: false,
      activity1: false,
      activity2: false,
      activity3: false,
      quizDone: false,
      sectionDone: false,
    };
  });

  // Sync with API progress when userProgress changes
  useEffect(() => {
    const mappedProgress = mapFromAPI(userProgress?.section2);
    if (mappedProgress) {
      setProgress(mappedProgress);
    }
  }, [userProgress]);

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

  const unlockNextSection = (currentSectionId: number) => {
    const nextSectionId = currentSectionId + 1;
    localStorage.setItem(`section${nextSectionId}Unlocked`, "true");
  };

  const toggleProgress = async (key: keyof ProgressState) => {
    const newValue = !progress[key];
    
    try {
      // Map local field name to API field name
      const apiField = mapToAPIField(key);
      await updateProgress('section2', apiField, newValue);
      
      // Update local state for immediate UI feedback
      setProgress((prev) => ({ ...prev, [key]: newValue }));
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const setQuizDone = async () => {
    try {
      await updateProgress('section2', 'quiz', true);
      setProgress((prev) => ({ ...prev, quizDone: true }));
    } catch (error) {
      console.error('Failed to update quiz progress:', error);
    }
  };

  const setSectionDone = async () => {
    try {
      await updateProgress('section2', 'section_complete', true);
      setProgress((prev) => ({ ...prev, sectionDone: true }));
      unlockNextSection(section);
    } catch (error) {
      console.error('Failed to update section progress:', error);
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
            <h1 className="text-xl font-semibold">The Alphabet & Numbers / Personal pronouns & Present Tense</h1>
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
                      onClick={() => setLessonView("lesson2")}
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
            <div className="flex-1 flex flex-col items-center w-full">
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
                        <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center shadow-none" onClick={() => setLessonView("lesson2")}>
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
                        <LessonBoard boards={lessonBoards2} />
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
                            setLessonView("lesson2");
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

















