// src/data/QuestionsData.ts

export interface Question {
    question: string;
    options: string[];
    answer: number; // El índice de la opción correcta (0, 1, 2, 3)
  }
  
  export const questions: Question[] = [
    {
      question: "Wie heißt du? (What’s your name?)",
      options: [
        "Ich bin Lehrer.",       // A
        "Ich komme aus Mexiko.", // B
        "Ich heiße Lukas.",      // C (correcta)
        "Ich wohne in Berlin.",  // D
      ],
      answer: 2, // Respuesta correcta: "Ich heiße Lukas."
    },
    // Agrega más preguntas aquí
    {
      question: "Wo wohnst du? (Where do you live?)",
      options: [
        "Ich wohne in Berlin.",
        "Ich bin Arzt.",
        "Ich komme aus Spanien.",
        "Ich heiße Maria.",
      ],
      answer: 0,
    },
    {
      question: "Was bist du von Beruf? (What is your profession?)",
      options: [
        "Ich komme aus Frankreich.",
        "Ich bin Studentin.",
        "Ich bin Koch von Beruf.",
        "Ich wohne in München.",
      ],
      answer: 2,
    },
    {
      question: "Woher kommst du? (Where are you from?)",
      options: [
        "Ich wohne in Hamburg.",
        "Ich bin Lehrerin.",
        "Ich komme aus Kolumbien.",
        "Ich heiße Sandra.",
      ],
      answer: 2,
    },
    {
      question: "Was bedeutet 'Freut mich'? (What does 'Freut mich' mean?)",
      options: [
        "Good night",
        "Nice to meet you",
        "Goodbye",
        "See you soon",
      ],
      answer: 1,
    },
    {
      question: "Was sagt man am Abend zur Begrüßung? (What do you say to greet someone in the evening?)",
      options: [
        "Guten Abend",
        "Guten Morgen",
        "Gute Nacht",
        "Hallo",
      ],
      answer: 0,
    },
    {
      question: "Wie sagt man 'I am from Italy' auf Deutsch?",
      options: [
        "Ich bin Italiener.",
        "Ich komme aus Italien.",
        "Ich heiße Italien.",
        "Ich wohne in Italien.",
      ],
      answer: 1,
    },
    {
      question: "Was ist die weibliche Form von 'Lehrer'? (What is the feminine form of 'Lehrer'?)",
      options: [
        "Lehrerin",
        "Arzt",
        "Student",
        "Ingenieur",
      ],
      answer: 0,
    },
    {
      question: "Welche Antwort passt zu 'Wie geht es dir?' (Which answer fits 'How are you?')",
      options: [
        "Danke, gut.",
        "Ich heiße Anna.",
        "Ich bin Arzt.",
        "Ich wohne in Berlin.",
      ],
      answer: 0,
    }
  ];
  