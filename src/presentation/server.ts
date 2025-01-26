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
    const isDevelopment = process.env.NODE_ENV === 'development';
    const allowedOrigin = isDevelopment ? 'http://localhost:5173' : 'https://japanary.netlify.app';
    this.app.use(
      cors({
        origin: allowedOrigin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(this.router);
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
