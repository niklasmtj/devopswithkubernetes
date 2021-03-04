import { v4 } from "uuid";
import express from 'express';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';

dotenv.config()

const PORT = 3000;
const app = express();
const randomString = v4();

const TIMESTAMP_PATH = path.join("/", "app", "files");
// const TIMESTAMP_PATH = process.env.NODE_ENV ? path.join("/", "app", "files") : process.cwd();

let timeStamp;
let pingPong;

const readTimestamp = async () => {
  try {
    const data = await readFile(`${TIMESTAMP_PATH}/timestamp.txt`, { encoding: "utf-8" })
    return data;
  } catch (err) {
    if (err) {
      console.error(err.message);
      return "Error happened";
    }
  }
}

const readPingPongFile = async () => {
  try {
    const data = await readFile(`${TIMESTAMP_PATH}/ping-pong.txt`, { encoding: "utf-8" })
    return parseInt(data, 10);
  } catch (err) {
    if (err) {
      console.error(err.message);
      return "Error happened";
    }
  }
}

const getStringValues = () => {
  timeStamp = readTimestamp();
  pingPong = readPingPongFile();
}

getStringValues();

const buildString = (ts, pg) => {
  return `
  ${ts}: ${randomString}
  Ping / Pong: ${pg}
  `
}

app.get('/', async (req, res) => {
  const t = await readTimestamp();
  const p = await readPingPongFile();
  const s = buildString(t, p)
  res.send(s);
});

const printingInterval = setInterval(async () => {
  // getStringValues()
  const t = await readTimestamp();
  const p = await readPingPongFile();
  const s = buildString(t, p)
  console.log(s);
}, 5000);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});