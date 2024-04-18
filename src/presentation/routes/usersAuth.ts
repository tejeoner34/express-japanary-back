import { Router, Response, Request } from 'express';

export class UsersAuthRouter {
  static get routes() {
    const router = Router();
    router.get('/', (req: Request, res: Response) => {
      res.send('Hello World');
    });
    return router;
  }
}
