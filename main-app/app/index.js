import { v4 } from "uuid";
import express from 'express';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config()

const PORT = 3000;
const app = express();
const randomString = v4();

// const TIMESTAMP_PATH = path.join("/", "app", "files");
// const TIMESTAMP_PATH = process.env.NODE_ENV === "dev" ? process.cwd() : path.join("/", "app", "files");
const TIMESTAMP_PATH = process.cwd();
const BASE_URL = process.env.NODE_ENV === "dev" ? "http://localhost:3001" : "http://ping-pong-svc"


let timeStamp;
let pingPong;

const readTimestamp = async () => {
  // try {
  //   const data = await readFile(`${TIMESTAMP_PATH}/timestamp.txt`, { encoding: "utf-8" })
  //   return data;
  // } catch (err) {
  //   if (err) {
  //     console.error(err.message);
  //     return new Date().toISOString();
  //   }
  // }
  return new Date().toISOString();
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

const getPingPongCount = async () => {
  const {pingCounter} = await fetch(`${BASE_URL}/ping`).then((res) => res.json())
  return pingCounter;
  // return (await fetch(`${BASE_URL}/ping`).then((res) => res.json()).pingCounter)
}

const getStringValues = async () => {
  timeStamp = readTimestamp();
  // Pre Part 2
  // pingPong = readPingPongFile();
  pingPong = await getPingPongCount();
}

const buildString = (ts, pg) => {
  return `
  ${process.env.MESSAGE} \n
  ${ts}: ${randomString} \n
  Ping / Pong: ${pg}
  `
}

app.get('/', async (req, res) => {
  const t = await readTimestamp();
  // pre Part 2
  // const p = await readPingPongFile();
  const p = await getPingPongCount();
  const s = buildString(t, p)
  res.status(200).send(s);
});

app.get("/healthz", async (req, res) => {
  try {
    const answer = await fetch(`${BASE_URL}/healthz`).then((res) => res.status);
    res.sendStatus(answer)
  } catch (error) {
    res.sendStatus(400);
  }
})

const printingInterval = setInterval(async () => {
  const t = await readTimestamp();
  // pre Part 2
  // const p = await readPingPongFile();
  const p = await getPingPongCount();
  const s = buildString(t, p)
  console.log(s);
}, 5000);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});