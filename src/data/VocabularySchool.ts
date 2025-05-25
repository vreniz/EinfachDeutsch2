// src/data/vocabularySchool.ts

export interface FlashcardWord {
  category: string;
  german: string;
  translation: string;
  use?: string;
  imageUrl?: string;
}

export const vocabularySchool = [
  {
    category: "School",
    german: "die Schule",
    translation: "School",
    use: "Ich gehe zur Schule. (I go to school.)",
    imageUrl: "/imagesS/dasSchule.png"
  },
  {
    category: "School",
    german: "das Klassenzimmer",
    translation: "Classroom",
    use: "Das Klassenzimmer ist groß. (The classroom is big.)",
    imageUrl: "/imagesS/klassenzimmer.png"
  },
  {
    category: "School",
    german: "der Lehrer",
    translation: "Teacher (male)",
    use: "Der Lehrer erklärt die Aufgabe. (The teacher explains the task.)",
    imageUrl: "/imagesS/lehrer.png"
  },
  {
    category: "School",
    german: "die Lehrerin",
    translation: "Teacher (female)",
    use: "Die Lehrerin ist freundlich. (The teacher is friendly.)",
    imageUrl: "/imagesS/lehrerin.png"
  },
  {
    category: "School",
    german: "der Schüler",
    translation: "Student (male)",
    use: "Der Schüler macht seine Hausaufgaben. (The student does his homework.)",
    imageUrl: "/imagesS/schueler.png"
  },
  {
    category: "School",
    german: "die Schülerin",
    translation: "Student (female)",
    use: "Die Schülerin liest ein Buch. (The student reads a book.)",
    imageUrl: "/imagesS/schuelerin.png"
  },
  {
    category: "School",
    german: "das Buch",
    translation: "Book",
    use: "Das Buch ist interessant. (The book is interesting.)",
    imageUrl: "/imagesS/buch.png"
  },
  {
    category: "School",
    german: "der Bleistift",
    translation: "Pencil",
    use: "Ich schreibe mit dem Bleistift. (I write with the pencil.)",
    imageUrl: "/imagesS/bleistift.png"
  },
  {
    category: "School",
    german: "das Heft",
    translation: "Notebook",
    use: "Ich notiere es im Heft. (I write it down in my notebook.)",
    imageUrl: "/imagesS/heft.png"
  },
  {
    category: "School",
    german: "die Tafel",
    translation: "Blackboard",
    use: "Die Lehrerin schreibt an die Tafel. (The teacher writes on the blackboard.)",
    imageUrl: "/imagesS/tafel.png"
  }
];
  