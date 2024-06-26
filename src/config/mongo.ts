import 'dotenv/config';
import { connect } from 'mongoose';

async function connectDB() {
  const url: string = process.env.MONGO_URI!;
  await connect(url);
}

export default connectDB;
