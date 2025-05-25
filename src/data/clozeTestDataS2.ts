// src/data/clozeTestS2.ts

export const clozeTestSets = [
    {
      sentences: [
        "Das deutsche _____ hat 26 Buchstaben.",
        "Wie _____ man 'Berlin'?",
        "Ä, Ö, Ü nennt man _____ .",
        "Das _____ steht nur im Deutschen: 'ß'.",
      ],
      options: ["buchstabiert", "Alphabet", "Umlaut", "Eszett"],
      answers: ["Alphabet", "buchstabiert", "Umlaut", "Eszett"],
    },
    {
      sentences: [
        "Eins, zwei, _____ , vier, fünf.",
        "Ich bin _____ Jahre alt.",
        "Wie sagt man '12' auf Deutsch? _____ .",
        "Wie _____ du?",
      ],
      options: ["drei", "zehn", "zwölf", "heißt"],
      answers: ["drei", "zehn", "zwölf", "heißt"],
    },
    {
      sentences: [
        "_____ lerne Deutsch.",
        "_____ bist du? – Ich bin Anna.",
        "Er _____ Fußball.",
        "Wir _____ Freunde.",
      ],
      options: ["Ich", "Wer", "spielt", "sind"],
      answers: ["Ich", "Wer", "spielt", "sind"],
    },
    {
      sentences: [
        "_____ bist freundlich.",          // Du
        "Sie _____ aus Deutschland.",      // kommt
        "_____ spreche ein bisschen Deutsch.", // Ich
        "_____ lebt in Berlin.",           // Sie
      ],
      options: ["Du", "Ich", "Sie", "kommt"],
      answers: ["Du", "kommt", "Ich", "Sie"],
    },

    {
      sentences: [
        "_____ heißt du?",             // Wie
        "Ich _____ Ben.",              // heiße
        "Woher _____ du?",             // kommst
        "Ich _____ aus Mexiko.",       // komme
      ],
      options: ["Wie", "heiße", "kommst", "komme"],
      answers: ["Wie", "heiße", "kommst", "komme"],
    }
    
  ];
  