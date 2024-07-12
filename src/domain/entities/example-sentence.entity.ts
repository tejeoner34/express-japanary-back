export interface JapaneseSentence {
  furigana: string;
  word: string;
}

export interface ExampleSentence {
  english: string;
  japanese: JapaneseSentence[];
}
