import { QuizDataSource } from '../../../domain/datasource/quiz.datasource';
import { Question } from '../../../domain/entities/quiz.entity';
import { QuizRepository } from '../../../domain/repository/quiz.repository';

export class QuizRepositoryImpl implements QuizRepository {
  constructor(private datasource: QuizDataSource) {}
  getGrammarQuiz(level: string): Promise<Question[]> {
    return this.datasource.getGrammarQuiz(level);
  }
  getKanjiQuiz(level: string): Promise<Question[]> {
    return this.datasource.getKanjiQuiz(level);
  }
}
