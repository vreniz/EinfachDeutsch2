// src/data/vocabularyHouse.ts

export interface FlashcardWord {
    category: string;
    german: string;
    translation: string;
    use?: string;
    imageUrl?: string;
  }
  
// src/data/VocabularyHouse.ts

export interface FlashcardWord {
  category: string;
  german: string;
  translation: string;
  use?: string;
  imageUrl?: string; // emoji o ruta
}

export const vocabularyHouse: FlashcardWord[] = [
  {
    category: "House",
    german: "das Haus",
    translation: "House",
    use: "Ich wohne in einem großen Haus. (I live in a big house.)",
    imageUrl: "/imagesH/dasHaus.png",
  },
  {
    category: "House",
    german: "das Zimmer",
    translation: "Room",
    use: "Mein Zimmer ist hell. (My room is bright.)",
    imageUrl: "/imagesH/dasZimmer.png",
  },
  {
    category: "House",
    german: "die Küche",
    translation: "Kitchen",
    use: "Die Küche ist sauber. (The kitchen is clean.)",
    imageUrl: "/imagesH/dieKueche.png",
  },
  {
    category: "House",
    german: "das Badezimmer",
    translation: "Bathroom",
    use: "Das Badezimmer ist klein. (The bathroom is small.)",
    imageUrl: "/imagesH/dasBadezimmer.png",
  },
  {
    category: "House",
    german: "das Wohnzimmer",
    translation: "Living room",
    use: "Wir sitzen im Wohnzimmer. (We sit in the living room.)",
    imageUrl: "/imagesH/dasWohnzimmer.png",
  },
  {
    category: "House",
    german: "die Tür",
    translation: "Door",
    use: "Die Tür ist offen. (The door is open.)",
    imageUrl: "/imagesH/dieTuer.png",
  },
  {
    category: "House",
    german: "das Fenster",
    translation: "Window",
    use: "Das Fenster ist zu. (The window is closed.)",
    imageUrl: "/imagesH/dasFenster.png",
  },
  {
    category: "House",
    german: "der Tisch",
    translation: " Table",
    use: "Der Tisch ist im Esszimmer. (The table is in the dining room.)",
    imageUrl: "/imagesH/derTisch.png",
  },
  {
    category: "House",
    german: "der Stuhl",
    translation: "Chair",
    use: "Ich brauche einen Stuhl. (I need a chair.)",
    imageUrl: "/imagesH/derStuhl.png",
  },
  {
    category: "House",
    german: "das Bett",
    translation: " Bed",
    use: "Mein Bett ist bequem. (My bed is comfortable.)",
    imageUrl: "/imagesH/dasBett.png",
  },
];
