import express from 'express';
import {writeFile, readFile} from 'fs';
import path from 'path'

const PORT = 3000;
const app = express();

const TIMESTAMP_PATH = path.join("/", "app", "files");
// const TIMESTAMP_PATH = process.env.NODE_ENV ? path.join("/", "app", "files") : process.cwd();

const readStartingCount = () => {
  readFile(`${TIMESTAMP_PATH}/ping-pong.txt`, {encoding: "utf-8"}, (err, data) => {
    if (err) return 0;
    return data;
  })
  return 0;
}

let pingCounter = readStartingCount();

app.get('/', (req, res) => {
  pingCounter++
  writeFile(`${TIMESTAMP_PATH}/ping-pong.txt`, pingCounter.toString(), {encoding: 'utf-8'}, (err) => {
    if (err) console.error(err.message);
  })
  res.send(`pong ${pingCounter}`)
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});