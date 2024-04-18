import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';

type Options = {
  port: number;
  router: Router;
};

export class Server {
  public readonly app: express.Application = express();
  private readonly port: number = 3000;
  public readonly router: Router;

  constructor({ port, router }: Options) {
    this.port = port;
    this.router = router;
  }

  async start() {
    this.app.use(
      cors({
        origin: [''],
      })
    );
    this.app.use(express.json());
    this.app.use(this.router);
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
