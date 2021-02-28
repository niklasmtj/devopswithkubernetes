import express from 'express';
import path from 'path'

const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});