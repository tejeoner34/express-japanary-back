import { Router } from 'express';
import { QuizDatasourceImpl } from '../../infrastructure/quiz/datasource/quiz.datasource.impl';
import { QuizRepositoryImpl } from '../../infrastructure/quiz/repository/quiz.repository.impl';
import { QuizController } from '../controllers/quiz.controller';

export class QuizRouter {
  static get routes() {
    const router = Router();
    const datasource = new QuizDatasourceImpl();
    const repository = new QuizRepositoryImpl(datasource);
    const controller = new QuizController(repository);
    router.get('/grammar-quiz', (req, res) => controller.getGrammarQuiz(req, res));
    router.get('/kanji-quiz', (req, res) => controller.getKanjiQuiz(req, res));
    return router;
  }
}
