import { v4 } from "uuid";
import express from 'express';
import dotenv from 'dotenv';
import { readFile } from 'fs';
import path from 'path';

dotenv.config()

const PORT = 3000;
const app = express();
const randomString = v4();

const TIMESTAMP_PATH = path.join("/", "app", "files");

let timeStamp;

const printString = () => {
  readFile(`${TIMESTAMP_PATH}/timestamp.txt`, {encoding: "utf-8"}, (err, data) => {
    if (err) {
      console.error(err.message);
    }
    timeStamp = data;
    console.log(`${timeStamp}: ${randomString}`)
  })
}
app.get('/', (req, res) => res.send(`${timeStamp}: ${randomString}`));

const printingInterval = setInterval(() => {
  printString()
}, 5000);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});