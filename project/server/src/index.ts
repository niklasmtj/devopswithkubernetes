import express from 'express';
import path from 'path'
import todosRoutes from './routes/todos'
import helperRoutes from './routes/helper'

const app = express();
const PORT = 3001;

const BASE_PATH = __dirname;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")));

app.use('/api/public', express.static(`${__dirname}/public`));
app.use("/api/helper", helperRoutes);
app.use("/api/todos", todosRoutes);

app.listen(PORT, () => {
  console.log(__dirname)
  console.log(`Server started on port ${PORT}`);
});

export {BASE_PATH};