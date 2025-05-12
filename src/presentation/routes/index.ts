import { Router } from 'express';
import { DictionaryRouter } from './dictionary';
import { UsersAuthRouter } from './usersAuth';
import { FlashcardRouter } from './flashcard';
import { QuizRouter } from './quiz';

export class AppRouter {
  static get routes() {
    const router = Router();
    router.use('/dictionary', DictionaryRouter.routes);
    router.use('/flashcard', DictionaryRouter.routes);
    router.use('/usersAuth', UsersAuthRouter.routes);
    router.use('/flashcard', FlashcardRouter.routes);
    router.use('/quiz', QuizRouter.routes);
    return router;
  }
}
