import express from 'express';
import {writeFile, readFile} from 'fs';
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// const TIMESTAMP_PATH = path.join("/", "app", "files");
// const TIMESTAMP_PATH = process.env.NODE_ENV === "dev" ? process.cwd() : path.join("/", "app", "files");
const TIMESTAMP_PATH = process.cwd();

const readStartingCount = () => {
  readFile(`${TIMESTAMP_PATH}/ping-pong.txt`, {encoding: "utf-8"}, (err, data) => {
    if (err) return 0;
    return data;
  })
  return 0;
}

let pingCounter = readStartingCount();

const increaseCounter = () => {
  pingCounter++;
  return pingCounter;
}

app.get('/', (req, res) => {
  const count = increaseCounter();
  writeFile(`${TIMESTAMP_PATH}/ping-pong.txt`, count.toString(), {encoding: 'utf-8'}, (err) => {
    if (err) console.error(err.message);
  })
  res.send(`pong ${count}`)
});

app.get("/ping", (req, res) => {
  const count = increaseCounter();
  res.json({pingCounter: count});
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});