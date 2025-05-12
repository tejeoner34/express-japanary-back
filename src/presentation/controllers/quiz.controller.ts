import { Request, Response } from 'express';
import { QuizRepository } from '../../domain/repository/quiz.repository';

export class QuizController {
  constructor(private quizRepository: QuizRepository) {}

  getGrammarQuiz(req: Request, res: Response) {
    const level: any = req.query.level;
    this.quizRepository
      .getGrammarQuiz(level)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.statusCode).json(error));
  }

  getKanjiQuiz(req: Request, res: Response) {
    const level: any = req.query.level;
    this.quizRepository
      .getKanjiQuiz(level)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.statusCode).json(error));
  }
}
