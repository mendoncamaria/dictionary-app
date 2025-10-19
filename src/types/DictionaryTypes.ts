interface Definition {
  length: number;
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Phonetic {
  text?: string;
  audio: string;
}

export interface DictionaryData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}