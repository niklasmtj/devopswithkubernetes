import { v4 } from "uuid";

const randomString = v4();

const printString = () => {
  console.log(`${new Date().toISOString()}: ${randomString}`)
}

setInterval(() => {
  printString()
}, 5000);