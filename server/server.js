import cors from 'cors';
import express from 'express';
import secPrograms from './db/secPrograms.js';
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, server world!');
});

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the api on my express server!' });
});

app.get('/api/sec/teams', (req, res) => {
  res.send(secPrograms);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
