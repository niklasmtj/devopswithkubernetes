import express from 'express';
import { writeFile } from 'fs';
import pg from "pg";
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-svc',
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD.trim(),
  port: 5432,
})

const PORT = process.env.PORT || 3000;
const app = express();

// const TIMESTAMP_PATH = path.join("/", "app", "files");
// const TIMESTAMP_PATH = process.env.NODE_ENV === "dev" ? process.cwd() : path.join("/", "app", "files");
const TIMESTAMP_PATH = process.cwd();

const readStartingCount = async () => {
  const client = await pool.connect();
  let result;
  try {
    await client.query("BEGIN");
    try {
      const queryResult = await client.query("SELECT * FROM pingpong ORDER BY pong DESC LIMIT 1");
      if (queryResult.rows[0]) {
        result = queryResult.rows[0].pong;
      } else {
        result = 0
      }
      console.log(result)
      client.query("COMMIT");
      return result;
    } catch (e) {
      client.query("ROLLBACK");
      throw e;
    }
  } catch (e) {
    throw e
  }
  // readFile(`${TIMESTAMP_PATH}/ping-pong.txt`, {encoding: "utf-8"}, (err, data) => {
  //   if (err) return 0;
  //   return data;
  // })
}

let pingCounter = await readStartingCount();

const increaseCounter = async () => {
  pingCounter++;
  const client = await pool.connect();
  let result
  try {
    await client.query("BEGIN");
    try {
      result = await client.query(`INSERT INTO pingpong (pong) VALUES (${pingCounter})`);
      client.query("COMMIT");
    } catch (e) {
      client.query("ROLLBACK");
      throw e;
    }
  } catch (e) {
    throw e
  }
  return pingCounter;
}

app.get('/', async (req, res) => {
  const count = await increaseCounter();
  writeFile(`${TIMESTAMP_PATH}/ping-pong.txt`, count.toString(), { encoding: 'utf-8' }, (err) => {
    if (err) console.error(err.message);
  })
  res.send(`pong ${count}`)
});

app.get("/ping", async (req, res) => {
  const count = await increaseCounter();
  res.json({ pingCounter: count });
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});