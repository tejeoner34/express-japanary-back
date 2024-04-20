import 'dotenv/config';
import db from './config/mongo';
import { AppRouter } from './presentation/routes';
import { Server } from './presentation/server';

const PORT = process.env.PORT || 3000;
const server = new Server({ port: Number(PORT), router: AppRouter.routes });

db().then(() => console.log('DB is connected'));
server.start();
