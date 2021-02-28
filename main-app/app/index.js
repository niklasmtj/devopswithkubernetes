import { v4 } from "uuid";
import express from 'express';
import path from 'path'

const PORT = 3000;
const app = express();
const randomString = v4();

let timeStamp;

const printString = () => {
  timeStamp = new Date().toISOString();
  console.log(`${timeStamp}: ${randomString}`)
}
app.get('/', (req, res) => res.send(`${timeStamp}: ${randomString}`));

const printingInterval = setInterval(() => {
  printString()
}, 5000);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});