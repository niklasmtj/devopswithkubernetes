import dotenv from 'dotenv'
import express from 'express';
import path from 'path'
import todosRoutes from './routes/todos'
import helperRoutes from './routes/helper'
import cors from 'cors';
import prismaClient from './services/prisma-client'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_PATH = __dirname;


app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")));

app.get("/healthz", (req, res) => {
  res.sendStatus(200);
})

app.get("/healthz-db", (req, res) => {
  if (prismaClient) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
})

app.use('/api/public', express.static(`${__dirname}/public`));
app.use("/api/helper", helperRoutes);
app.use("/api/todos", todosRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export { BASE_PATH };