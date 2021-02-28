import express from 'express';

const PORT = 3000;
const app = express();

let pingCounter = 0;

app.get('/', (req, res) => res.send(`pong ${pingCounter++}`));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});