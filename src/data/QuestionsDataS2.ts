// src/data/QuestionsDataS2.ts

export interface Question {
    question: string;
    options: string[];
    answer: number;
  }
  
  export const questions: Question[] = [
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
      question: "Wie buchstabiert man das Wort für 'Spanish' (nationality) auf Deutsch? (How do you spell the word for 'Spanish' in German?)",
      options: [
        "S-P-A-N-I-S-C-H",  // correcta
        "S-P-A-I-N-I-S-C-H",
        "S-P-A-N-S-I-C-H",
        "S-P-A-N-I-C-H",
      ],
      answer: 0,
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
      question: "Wie sagt man '10' auf Deutsch? (How do you say '10' in German?)",
      options: [
        "elf",
        "zehn", // correcta
        "zwanzig",
        "eins",
      ],
      answer: 1,
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
    }
  ];
  