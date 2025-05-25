// src/data/QuestionsDataS2.ts

export interface Question {
    question: string;
    options: string[];
    answer: number;
  }
  
  export const quizQuestions  = [
    {
      question: "Wie viele Buchstaben hat das deutsche Alphabet? (How many letters does the German alphabet have?)",
      options: [
        "24",
        "25",
        "26", // correcta
        "27",
      ],
      answer: 2,
    },
    {
      question: "Wie buchstabiert man das Wort für 'Italy' (country) auf Deutsch? (How do you spell the word for 'Italy' in German?)",
      options: [
        "I-T-A-L-I-E-N",    // correcta
        "I-T-A-L-I-E-N-E",
        "I-T-A-L-E-I-N",
        "I-T-A-L-I-E-N-E-R",
      ],
      answer: 0,
    },
    
    {
      question: "Was ist ein Umlaut? (What is an umlaut?)",
      options: [
        "A special verb ending",
        "A letter with two dots above", // correcta
        "A German number",
        "A possessive pronoun",
      ],
      answer: 1,
    },
    {
      question: "Was ist die richtige Reihenfolge? (Which is the correct order?)",
      options: [
        "eins, drei, zwei, vier",
        "eins, zwei, drei, vier", // correcta
        "zwei, eins, vier, drei",
        "vier, drei, zwei, eins",
      ],
      answer: 1,
    },
    {
      question: "Wie sagt man '11' auf Deutsch? (How do you say '11' in German?)",
      options: [
        "elf",// correcta
        "zehn", 
        "zwanzig",
        "eins",
      ],
      answer: 0,
    },{
      question: "Wie sagt man '15' auf Deutsch? (How do you say '15' in German?)",
      options: [
        "fünfzehn",   // correcta
        "fünfzig",
        "vierzehn",
        "fünf",
      ],
      answer: 0,
    },    
    {
      question: "Was ist das Personalpronomen für 'we'? (What is the personal pronoun for 'we'?)",
      options: [
        "ihr",
        "sie",
        "wir", // correcta
        "du",
      ],
      answer: 2,
    },
    {
      question: "Wähle die korrekte Konjugation: Ich ____ Deutsch. (Choose the correct conjugation: I ____ German.)",
      options: [
        "lernst",
        "lerne", // correcta
        "lernt",
        "lernst du",
      ],
      answer: 1,
    },
    {
      question: "Wie heißt das scharfe S auf Deutsch? (What is the sharp S called in German?)",
      options: [
        "Oszett",
        "Eszett", // correcta
        "Essz",
        "Doppelt S",
      ],
      answer: 1,
    },
    {
      question: "Was passt? Er ____ in Berlin. (What fits? He ____ in Berlin.)",
      options: [
        "wohne",
        "wohnen",
        "wohnt", // correcta
        "wohnst",
      ],
      answer: 2,
    },
    {
        question: "Was ist die korrekte Reihenfolge der Zahlen? (What is the correct order of the numbers?)",
        options: [
          "drei, vier, fünf, sechs", // correcta
          "vier, fünf, sechs, drei",
          "sechs, fünf, vier, drei",
          "fünf, sechs, drei, vier",
        ],
        answer: 0,
      },
      {
        question: "Wie sagt man 'I am' auf Deutsch? (How do you say 'I am' in German?)",
        options: [
          "ich ist",
          "ich sind",
          "ich bin", // correcta
          "ich bist",
        ],
        answer: 2,
      },
      {
        question: "Wie heißt die Zahl 12 auf Deutsch? (What is the number 12 in German?)",
        options: [
          "zwölf", // correcta
          "zehn",
          "zwanzig",
          "sechs",
        ],
        answer: 0,
      },
      {
        question: "Was ist das Personalpronomen für 'they'? (What is the personal pronoun for 'they'?)",
        options: [
          "ihr",
          "sie", // correcta
          "wir",
          "du",
        ],
        answer: 1,
      },
      {
        question: "Wähle das richtige Verb: Wir ____ Deutsch. (Choose the right verb: We ____ German.)",
        options: [
          "lernst",
          "lernt",
          "lerne",
          "lernen", // correcta
        ],
        answer: 3,
      },
      {
        question: "Welche Buchstaben sind Umlaute im Deutschen? (Which letters are umlauts in German?)",
        options: [
          "Ä, Ö, Ü",
          "É, È, Ê",
          "A, O, U",
          "Ë, Ï, Ü"
        ],
        answer: 0
      },{
        question: "Wie sagt man '21' auf Deutsch? (How do you say '21' in German?)",
        options: [
          "einsundzwanzig",
          "einundzwanzig",
          "zwanzigeins",
          "zwanzeins"
        ],
        answer: 1 // einundzwanzig
      },
      {
        question: "Welches dieser Wörter enthält das Eszett? (Which of these words contains the Eszett?)",
        options: [
          "Stern",
          "Stein",
          "Straße",
          "Stuhl"
        ],
        answer: 2 // Straße
      },
      {
        question: "Was ist das Personalpronomen für 'she'? (What is the personal pronoun for 'she'?)",
        options: [
          "sie",
          "es",
          "wir",
          "er"
        ],
        answer: 0
      },{
        question: "Wähle die korrekte Konjugation: Ihr ____ Fußball. (Choose the correct conjugation: You (all) ____ football.)",
        options: [
          "spielen",
          "spielt",
          "spiele",
          "spielst"
        ],
        answer: 1
      },{
        question: "Wie sagt man '8' auf Deutsch? (How do you say '8' in German?)",
        options: [
          "acht",
          "achtzehn",
          "achtzig",
          "achten"
        ],
        answer: 0
      },{
        question: "Was ist die richtige Präsens-Endung für 'wir'? (What is the correct present tense ending for 'wir'?)",
        options: [
          "-e",
          "-t",
          "-st",
          "-en"
        ],
        answer: 3
      },
      {
        question: "Was ist die korrekte Schreibweise für die Zahl 17 auf Deutsch? (What is the correct spelling for the number 17 in German?)",
        options: [
          "siebzehn",
          "siebzehn",
          "siebensehn",
          "siebzhen"
        ],
        answer: 0
      },
      {
        question: "Welcher Buchstabe wird im deutschen Alphabet mit 'jot' ausgesprochen? (Which letter is pronounced 'jot' in the German alphabet?)",
        options: [
          "Y",
          "J",
          "U",
          "Z"
        ],
        answer: 1
      }
      ,{
        question: "Was ist das Personalpronomen für 'it' auf Deutsch? (What is the personal pronoun for 'it' in German?)",
        options: [
          "es",
          "sie",
          "er",
          "wir"
        ],
        answer: 0
      },{
        question: "In welchem dieser Wörter steht das Eszett ? (In which of these words is there an Eszett ?)",
        options: [
          "groß",
          "Masse",
          "Bus",
          "Kaffee"
        ],
        answer: 0 // groß
      },
      {
        question: "Was ist das Personalpronomen für 'you' (informell, Singular) auf Deutsch? (What is the personal pronoun for 'you' (informal, singular) in German?)",
        options: [
          "du",
          "Sie",
          "ihr",
          "er"
        ],
        answer: 0
      },
      {
        question: "Welches Pronomen benutzt man für eine Gruppe von Freunden? (Which pronoun do you use for a group of friends?)",
        options: [
          "du",
          "ihr",
          "er",
          "sie"
        ],
        answer: 1
      },
      
  
  ];
  