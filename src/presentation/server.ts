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
    const allowedOrigins = isDevelopment
      ? ['http://localhost:8100', 'http://localhost:4200', 'http://localhost:5173']
      : ['https://japanary.netlify.app', 'https://japanary-ionic.web.app'];
    this.app.use(
      cors({
        origin: (origin, callback) => {
          // origin が undefined の場合 (例えば Postman から) も許可したい場合はここで許可する
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
          }
        },
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
