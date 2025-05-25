// src/data/VocabularyDataS2.ts

export interface FlashcardWord {
    german: string;
    translation: string;
    category: string;
    use: string;
    imageUrl?: string; 
  }
  
  export const vocabularyWords: FlashcardWord[] = [
    // Alphabet
    {
      german: "das Alphabet",
      translation: "Alphabet",
      category: "ALPHABET",
      use: "Das deutsche Alphabet hat 26 Buchstaben. (The German alphabet has 26 letters.)",
      imageUrl: "/imagesS2/alphabet.png",
    },
    {
      german: "Buchstabe",
      translation: "Letter (of the alphabet)",
      category: "ALPHABET",
      use: "Wie buchstabiert man das? (How do you spell that?)",
      imageUrl: "/imagesS2/letter.png",
    },
    {
      german: "Umlaut",
      translation: "Umlaut (Ä, Ö, Ü)",
      category: "ALPHABET",
      use: "Ä, Ö, Ü sind Umlaute im Deutschen. (Ä, Ö, Ü are umlauts in German.)",
      imageUrl: "/imagesS2/umlaut.png",
    },
    {
      german: "ß (Eszett)",
      translation: "Sharp S (ß)",
      category: "ALPHABET",
      use: "Straße hat ein Eszett. (Straße has an Eszett.)",
      imageUrl: "/imagesS2/eszett.png",
    },
    // Números 1–5
    {
      german: "eins",
      translation: "One",
      category: "NUMBERS",
      use: "Ich habe eins. (I have one.)",
      imageUrl: "/imagesS2/one.png",
    },
    {
      german: "zwei",
      translation: "Two",
      category: "NUMBERS",
      use: "Zwei Katzen. (Two cats.)",
      imageUrl: "/imagesS2/two.png",
    },
    {
      german: "drei",
      translation: "Three",
      category: "NUMBERS",
      use: "Drei Bücher. (Three books.)",
      imageUrl: "/imagesS2/three.png",
    },
      // Números del 4 al 9
     {
    german: "vier",
   translation: "Four",
   category: "NUMBER",
   use: "Ich habe vier Bücher. (I have four books.)",
   imageUrl: "/imagesS2/vier.png",
  },
   {
   german: "fünf",
   translation: "Five",
   category: "NUMBER",
   use: "Wir sind fünf Freunde. (We are five friends.)",
   imageUrl: "/imagesS2/fuenf.png",
   },
  {
   german: "sechs",
   translation: "Six",
   category: "NUMBER",
   use: "Der Würfel zeigt sechs. (The die shows six.)",
   imageUrl: "/imagesS2/sechs.png",
  },
  {
   german: "sieben",
   translation: "Seven",
   category: "NUMBER",
   use: "Ich wache um sieben Uhr auf. (I wake up at seven o'clock.)",
   imageUrl: "/imagesS2/sieben.png",
  },
  {
   german: "acht",
   translation: "Eight",
   category: "NUMBER",
   use: "Die Klasse beginnt um acht Uhr. (The class starts at eight o'clock.)",
   imageUrl: "/imagesS2/acht.png",
   },
   {
   german: "neun",
   translation: "Nine",
   category: "NUMBER",
   use: "Heute ist der neunte Tag. (Today is the ninth day.)",
   imageUrl: "/imagesS2/neun.png",
   },

    {
      german: "zehn",
      translation: "Ten",
      category: "NUMBERS",
      use: "Ich bin zehn Jahre alt. (I am ten years old.)",
      imageUrl: "/imagesS2/ten.png",
    },

    // Saludos útiles y frases
    {
      german: "Wie buchstabiert man?",
      translation: "How do you spell ...?",
      category: "PHRASE",
      use: "Wie buchstabiert man, Berlin“? (How do you spell 'Berlin'?)",
      imageUrl: "/imagesS2/spell.png",
    },
    {
      german: "Wie alt bist du?",
      translation: "How old are you?",
      category: "PHRASE",
      use: "Wie alt bist du? Ich bin zwölf. (How old are you? I am twelve.)",
      imageUrl: "/imagesS2/age.png",
    },
    {
      german: "Kannst du das wiederholen?",
      translation: "Can you repeat that?",
      category: "PHRASE",
      use: "Kannst du das wiederholen, bitte? (Can you repeat that, please?)",
      imageUrl: "/imagesS2/repeat.png",
    },
    {
      german: "Wie schreibt man das?",
      translation: "How do you write that?",
      category: "PHRASE",
      use: "Wie schreibt man das Wort? (How do you write the word?)",
      imageUrl: "/imagesS2/write.png",
    },
    
    // Pronombres personales
    {
      german: "ich",
      translation: "I",
      category: "PRONOUN",
      use: "Ich lerne Deutsch. (I learn German.)",
      imageUrl: "/imagesS2/ich.png",
    },
    {
      german: "du",
      translation: "You (informal, singular)",
      category: "PRONOUN",
      use: "Du bist nett. (You are nice.)",
      imageUrl: "/imagesS2/du.png",
    },
    {
      german: "er",
      translation: "He",
      category: "PRONOUN",
      use: "Er ist mein Freund. (He is my friend.)",
      imageUrl: "/imagesS2/er.png",
    },
    {
      german: "sie",
      translation: "She",
      category: "PRONOUN",
      use: "Sie ist meine Schwester. (She is my sister.)",
      imageUrl: "/imagesS2/sie.png",
    },
    {
      german: "es",
      translation: "It",
      category: "PRONOUN",
      use: "Es ist kalt. (It is cold.)",
      imageUrl: "/imagesS2/es.png",
    },
    {
      german: "wir",
      translation: "We",
      category: "PRONOUN",
      use: "Wir gehen zur Schule. (We go to school.)",
      imageUrl: "/imagesS2/wir.png",
    },
    {
      german: "ihr",
      translation: "You (plural, informal)",
      category: "PRONOUN",
      use: "Ihr seid lustig. (You are funny.)",
      imageUrl: "/imagesS2/du.png",
    },
    {
      german: "sie",
      translation: "They",
      category: "PRONOUN",
      use: "Sie spielen Fußball. (They play football.)",
      imageUrl: "/imagesS2/they.png",
    },
    {
      german: "Sie",
      translation: "You (formal, singular and plural)",
      category: "PRONOUN",
      use: "Sie sind Lehrerin. (You are a teacher.)",
      imageUrl: "/imagesS2/du.png",
    },
    
  ];
  
  
  