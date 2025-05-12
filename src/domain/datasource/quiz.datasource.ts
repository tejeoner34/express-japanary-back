import { Question } from '../entities/quiz.entity';

export interface QuizDataSource {
  getGrammarQuiz(level: string): Promise<Question[]>;
  getKanjiQuiz(level: string): Promise<Question[]>;
}
