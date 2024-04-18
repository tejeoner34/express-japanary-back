import { Router } from 'express';
import { searchWord } from '../controllers/dictionary.controller';

export class DictionaryRouter {
  static get routes() {
    const router = Router();

    router.get('/', searchWord);

    return router;
  }
}
