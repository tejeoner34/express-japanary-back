import { Question } from '../entities/quiz.entity';

export interface QuizRepository {
  getGrammarQuiz(level: string): Promise<Question[]>;
  getKanjiQuiz(level: string): Promise<Question[]>;
}
