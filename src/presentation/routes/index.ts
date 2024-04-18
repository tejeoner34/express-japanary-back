import { Router } from 'express';
import { DictionaryRouter } from './dictionary';
import { UsersAuthRouter } from './usersAuth';

export class AppRouter {
  static get routes() {
    const router = Router();

    router.use('/dictionary', DictionaryRouter.routes);
    router.use('/usersAuth', UsersAuthRouter.routes);
    return router;
  }
}
