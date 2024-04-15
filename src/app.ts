import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: [''],
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
