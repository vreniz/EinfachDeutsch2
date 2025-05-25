// src/data/VocabularyTravel.ts

// src/data/VocabularyTravel.ts

export interface FlashcardWord {
  category: string;
  german: string;
  translation: string;
  use?: string;
  imageUrl?: string; // Puede ser emoji, URL o vacío
}

export const vocabularyTravel: FlashcardWord[] = [
  {
    category: "Travel",
    german: "der Flughafen",
    translation: "Airport",
    use: "Ich bin am Flughafen. (I am at the airport.)",
    imageUrl: "/imagesT/Flughafen.png", 
  },
  {
    category: "Travel",
    german: "der Koffer",
    translation: "Suitcase",
    use: "Ich packe meinen Koffer. (I'm packing my suitcase.)",
    imageUrl: "/imagesT/koffer.png",
  },
  {
    category: "Travel",
    german: "das Ticket",
    translation: "Ticket",
    use: "Ich habe ein Ticket gekauft. (I bought a ticket.)",
    imageUrl: "/imagesT/ticket.png",
  },
  {
    category: "Travel",
    german: "der Zug",
    translation: "Train",
    use: "Der Zug ist pünktlich. (The train is on time.)",
    imageUrl: "/imagesT/zug.png",
  },
  {
    category: "Travel",
    german: "das Hotel",
    translation: "Hotel",
    use: "Wir schlafen im Hotel. (We sleep in the hotel.)",
    imageUrl: "/imagesT/hotel.png",
  },
  {
    category: "Travel",
    german: "der Pass",
    translation: "Passport",
    use: "Ich habe meinen Pass vergessen. (I forgot my passport.)",
    imageUrl: "/imagesT/pass.png",
  },
  {
    category: "Travel",
    german: "die Reise",
    translation: "Trip, journey",
    use: "Die Reise war lang. (The journey was long.)",
    imageUrl: "/imagesT/reise.png",
  },
  {
    category: "Travel",
    german: "die Straßenbahn",
    translation: "Tram",
    use: "Die Straßenbahn kommt. (The tram is coming.)",
    imageUrl: "/imagesT/strassenbahn.png",
  },
  {
    category: "Travel",
    german: "die Karte",
    translation: "Map",
    use: "Hast du eine Karte? (Do you have a map?)",
    imageUrl: "/imagesT/karte.png",
  },
  {
    category: "Travel",
    german: "das Taxi",
    translation: "Taxi",
    use: "Wir nehmen ein Taxi. (We take a taxi.)",
    imageUrl: "/imagesT/taxi.png",
  },
];
