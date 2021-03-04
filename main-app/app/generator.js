import dotenv from 'dotenv'
import express from 'express';
import {writeFile} from 'fs'
import path from 'path'

dotenv.config()

const PORT = 3001;
const app = express();

const TIMESTAMP_PATH = path.join("/", "app", "files");

const generateTimestampFile = () => {
  const d = new Date().toISOString();
  writeFile(`${TIMESTAMP_PATH}/timestamp.txt`, d, {encoding: 'utf-8'}, (err) => {
    if (err) {
      console.log(err)
    }
  });
}

const timestampInterval = setInterval(() => {
  generateTimestampFile();
}, 5000)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});