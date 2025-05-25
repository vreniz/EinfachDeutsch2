// src/data/clozeTestData.ts

export const clozeTestSets = [
    {
      sentences: [
        "Hallo! Ich _____ Anna.",
        "Ich _____ aus Spanien.",
        "Ich bin _____ von Beruf.",
        "Und _____ ?",
      ],
      options: ["komme", "heiße", "du", "Lehrerin"],
      answers: ["heiße", "komme", "Lehrerin", "du"],
    },
    {
      sentences: [
        "Guten Morgen! Ich _____ Pablo.",
        "Ich _____ aus Mexiko.",
        "Ich bin _____ von Beruf.",
        "Und _____ ?"
      ],
      options: ["komme", "bin", "du", "Student"],
      answers: ["bin", "komme", "Student", "du"],
    },
    {
      sentences: [
        "Guten _____! Ich heiße Max.",
        "Ich _____ aus Deutschland.",
        "Ich bin _____ von Beruf.",
        "Wie _____ du?",
      ],
      options: ["Tag", "komme", "bist", "Arzt"],
      answers: ["Tag", "komme", "Arzt", "bist"],
    },
    // Cloze 4
    {
      sentences: [
        "_____ Morgen! Ich bin Anna.",
        "Ich _____ Studentin.",
        "Ich _____ aus Spanien.",
        "_____ du auch Student?",
      ],
      options: ["Guten", "komme", "bin", "Bist"],
      answers: ["Guten", "bin", "komme", "Bist"],
    },
    // Cloze 5
    {
      sentences: [
        "Wie _____ du?",
        "Ich _____ Julia.",
        "Ich _____ Lehrerin von Beruf.",
        "Und _____?",
      ],
      options: ["heiße", "bist", "bin", "du"],
      answers: ["bist", "heiße", "bin", "du"],
    },
    
  ];
  