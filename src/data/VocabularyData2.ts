// src/data/VocabularyData2.ts
// src/data/VocabularyData2.ts

export interface FlashcardWord {
    german: string;
    translation: string;
    category: string;
    use: string;
    imageUrl?: string; // Nuevo campo opcional
  }
  
  export const vocabularyWords: FlashcardWord[] = [
    // Saludos
    {
      german: "Hallo",
      translation: "Hello",
      use: "Hallo, wie geht's? (Hello, how are you?)",
      category: "GREETINGS",
      imageUrl: "/images/Hallo.png",
    },
    {
      german: "Guten Tag",
      translation: "Good day",
      use: "Guten Tag, Herr Müller. (Good day, Mr. Müller.)",
      category: "GREETINGS",
      imageUrl: "/images/guten-tag.png",
    },
    {
      german: "Guten Morgen",
      translation: "Good morning",
      use: "Guten Morgen, Anna! (Good morning, Anna!)",
      category: "GREETINGS",
      imageUrl: "/images/guten-morgen.png",
    },
    {
      german: "Guten Abend",
      translation: "Good evening",
      use: "Guten Abend, meine Damen und Herren. (Good evening, ladies and gentlemen.)",
      category: "GREETINGS",
      imageUrl: "/images/guten-abend.png",
    },
    {
      german: "Tschüss",
      translation: "Bye",
      use: "Tschüss! Bis morgen! (Bye! See you tomorrow!)",
      category: "GREETINGS",
      imageUrl: "/images/tschuss.png",
    },
  
    // Nombres e introducciones
    {
      german: "Ich heiße...",
      translation: "My name is...",
      use: "Ich heiße Lina. (My name is Lina.)",
      category: "NAME",
      imageUrl: "/images/ich-heibe.png",
    },
    {
      german: "Wie heißt du?",
      translation: "What is your name?",
      use: "Wie heißt du? Ich heiße Marco. (What is your name? My name is Marco.)",
      category: "NAME",
      imageUrl: "/images/wie-heibt-du.png",
    },
    {
      german: "Wie ist dein Name?",
      translation: "What is your name?",
      use: "Wie ist dein Name? Mein Name ist Anna. (What is your name? My name is Anna.)",
      category: "NAME",
      imageUrl: "/images//wie-heibt-du.png",
    },
    {
      german: "Freut mich",
      translation: "Nice to meet you",
      use: "Hallo, ich bin Julia. – Freut mich! (Hello, I am Julia. – Nice to meet you!)",
      category: "NAME",
      imageUrl: "/images/freut-mich.png",
    },
  
    // Países
    {
      german: "Ich komme aus...",
      translation: "I come from...",
      use: "Ich komme aus Kolumbien. (I come from Colombia.)",
      category: "COUNTRY",
      imageUrl: "/images/ich-komme-aus.png",
    },
    {
      german: "Woher kommst du?",
      translation: "Where do you come from?",
      use: "Woher kommst du? – Ich komme aus Spanien. (Where do you come from? – I come from Spain.)",
      category: "COUNTRY",
      imageUrl: "/images/woher-kommst-du.png",
    },
    {
      german: "Deutschland",
      translation: "Germany",
      use: "Ich lebe in Deutschland. (I live in Germany.)",
      category: "COUNTRY",
      imageUrl: "/images/deutschland.png",
    },
    {
      german: "Spanien",
      translation: "Spain",
      use: "Meine Freundin kommt aus Spanien. (My friend comes from Spain.)",
      category: "COUNTRY",
      imageUrl: "/images/spanien.png",
    },
    {
      german: "USA",
      translation: "USA",
      use: "Er reist oft in die USA. (He often travels to the USA.)",
      category: "COUNTRY",
      imageUrl: "/images/usa.png",
    },
    {
      german: "England",
      translation: "England",
      use: "London liegt in England. (London is in England.)",
      category: "COUNTRY",
      imageUrl: "/images/england.png",
    },
    {
      german: "Frankreich",
      translation: "France",
      use: "Ich möchte Frankreich besuchen. (I would like to visit France.)",
      category: "COUNTRY",
      imageUrl: "/images/frankreich.png",
    },
    {
      german: "Italien",
      translation: "Italy",
      use: "Italien ist sehr schön. (Italy is very beautiful.)",
      category: "COUNTRY",
      imageUrl: "/images/italien.png",
    },{
      german: "Kolumbien",
      translation: "Colombia",
      use: "Kolumbien ist sehr schön. (Colombia is very beautiful.)",
      category: "COUNTRY",
      imageUrl: "/images/kolumbien.png",
    },
    // Ocupaciones
    {
      german: "Ich bin... von Beruf",
      translation: "I am... by profession",
      use: "Ich bin Ingenieur von Beruf. (I am an engineer by profession.)",
      category: "OCCUPATION",
      imageUrl: "/images/ich-bin-von-beruf.png",
    },
    {
      german: "Was bist du von Beruf?",
      translation: "What is your profession?",
      use: "Was bist du von Beruf? – Ich bin Lehrerin. (What is your profession? – I am a teacher.)",
      category: "OCCUPATION",
      imageUrl: "/images/was-bist-du-von-beruf.png",
    },
    {
      german: "Lehrer / Lehrerin",
      translation: "Teacher (m/f)",
      use: "Mein Vater ist Lehrer. (My father is a teacher.)",
      category: "OCCUPATION",
      imageUrl: "/images/lehrer.png",
    },
    {
      german: "Arzt / Ärztin",
      translation: "Doctor (m/f)",
      use: "Meine Mutter ist Ärztin. (My mother is a doctor.)",
      category: "OCCUPATION",
      imageUrl: "/images/arzt.png",
    },
    {
      german: "Ingenieur / Ingenieurin",
      translation: "Engineer (m/f)",
      use: "Ich möchte Ingenieur werden. (I want to become an engineer.)",
      category: "OCCUPATION",
      imageUrl: "/images/ingenieur.png",
    },
    {
      german: "Student / Studentin",
      translation: "Student (m/f)",
      use: "Sie ist Studentin an der Universität. (She is a student at the university.)",
      category: "OCCUPATION",
      imageUrl: "/images/student.png",
    },
    {
      german: "Programmierer / Programmiererin",
      translation: "Programmer (m/f)",
      use: "Er ist Programmierer bei einer Softwarefirma. (He is a programmer at a software company.)",
      category: "OCCUPATION",
      imageUrl: "/images/programmer.png",
      
    },
    {
      german: "Anwalt / Anwältin",
      translation: "Lawyer (m/f)",
      use: "Er ist Anwalt von Beruf. (He is a lawyer by profession.)",
      category: "OCCUPATION",
      imageUrl: "/images/anwalt.png",
    },
  
    // Frases útiles
    {
      german: "Und du?",
      translation: "And you?",
      use: "Ich komme aus Mexiko. Und du? (I come from Mexico. And you?)",
      category: "PHRASES",
      imageUrl: "/images/und-du.png",
    },
    {
      german: "Wie geht es dir?",
      translation: "How are you?",
      use: "Hallo Paul, wie geht es dir? (Hello Paul, how are you?)",
      category: "PHRASES",
      imageUrl: "/images/wie-geht-es-dir.png",
    },
    {
      german: "Danke, gut",
      translation: "Fine, thanks",
      use: "Wie geht's? – Danke, gut. (How are you? – Fine, thanks.)",
      category: "PHRASES",
      imageUrl: "/images/danke-gut.png",
    },
  ];
  