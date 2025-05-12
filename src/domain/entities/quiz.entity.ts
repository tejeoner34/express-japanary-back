export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  options: Option[];
  explanation: string;
}
