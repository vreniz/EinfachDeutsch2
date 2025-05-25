// src/data/VocabularyFamily.ts

export interface FlashcardWord {
  category: string;
  german: string;
  translation: string;
  use?: string;
  imageUrl?: string;
}

export const vocabularyFamily: FlashcardWord[] = [
  {
    category: "Family",
    german: "die Mutter",
    translation: "Mother",
    use: "Meine Mutter ist freundlich. (My mother is friendly.)",
    imageUrl: "/imagesFa/mutter.png",
  },
  {
    category: "Family",
    german: "der Vater",
    translation: "Father",
    use: "Mein Vater kocht gern. (My father likes to cook.)",
    imageUrl: "/imagesFa/vater.png",
  },
  {
    category: "Family",
    german: "die Schwester",
    translation: "Sister",
    use: "Meine Schwester liest ein Buch. (My sister is reading a book.)",
    imageUrl: "/imagesFa/schwester.png",
  },
  {
    category: "Family",
    german: "der Bruder",
    translation: "Brother",
    use: "Mein Bruder spielt Fußball. (My brother plays football.)",
    imageUrl: "/imagesFa/bruder.png",
  },
  {
    category: "Family",
    german: "die Eltern",
    translation: "Parents",
    use: "Meine Eltern arbeiten viel. (My parents work a lot.)",
    imageUrl: "/imagesFa/eltern.png",
  },
  {
    category: "Family",
    german: "die Großmutter",
    translation: "Grandmother",
    use: "Meine Großmutter wohnt in Berlin. (My grandmother lives in Berlin.)",
    imageUrl: "/imagesFa/grossmutter.png",
  },
  {
    category: "Family",
    german: "der Großvater",
    translation: "Grandfather",
    use: "Mein Großvater trinkt Tee. (My grandfather drinks tea.)",
    imageUrl: "/imagesFa/grossvater.png",
  },
  {
    category: "Family",
    german: "die Tante",
    translation: "Aunt",
    use: "Meine Tante ist Lehrerin. (My aunt is a teacher.)",
    imageUrl: "/imagesFa/tante.png",
  },
  {
    category: "Family",
    german: "der Onkel",
    translation: "Uncle",
    use: "Mein Onkel fährt Auto. (My uncle drives a car.)",
    imageUrl: "/imagesFa/onkel.png",
  },
  {
    category: "Family",
    german: "das Kind",
    translation: "Child",
    use: "Das Kind spielt im Garten. (The child plays in the garden.)",
    imageUrl: "/imagesFa/kind.png",
  },
];
