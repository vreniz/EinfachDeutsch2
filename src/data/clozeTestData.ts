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
        "Ich komme aus _____.",
        "Ich bin _____.",
        "Und _____?"
      ],
      options: ["Mexiko", "bin", "du", "Student"],
      answers: ["bin", "Mexiko", "Student", "du"],
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
        "Ich komme aus _____.",
        "_____ du auch Student?",
      ],
      options: ["Guten", "Italien", "bin", "Bist"],
      answers: ["Guten", "bin", "Italien", "Bist"],
    },
    // Cloze 5
    {
      sentences: [
        "Wie _____ du?",
        "Ich _____ Julia.",
        "Ich bin _____ von Beruf.",
        "Und _____?",
      ],
      options: ["heiße", "bist", "Anwältin", "du"],
      answers: ["bist", "heiße", "Anwältin", "du"],
    },
    {
      sentences: [
        "Ich komme aus _____.",
        "_____ du aus Frankreich?",
        "Mein Freund _____ in Rom.",
        "Wir _____ aus England.",
      ],
      options: ["USA", "Bist", "wohnt", "kommen"],
      answers: ["USA", "Bist", "wohnt", "kommen"],
    },
    {
      sentences: [
        "Mein Onkel ist _____.",
        "Ich _____ Pilot.",
        "_____ du Architektin?",
        "Sie _____ Journalistin.",
      ],
      options: ["Koch", "bin", "Bist", "ist"],
      answers: ["Koch", "bin", "Bist", "ist"],
    }
    
    
    
  ];
  