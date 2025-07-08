const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let highScores = [];

app.get('/', (req, res) => {
  res.send('✅ Eka Racing Backend is working!');
});

app.post('/submit-score', (req, res) => {
  const { player, score } = req.body;
  highScores.push({ player, score });
  highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json({ status: 'success', message: 'Score saved!' });
});

app.get('/leaderboard', (req, res) => {
  res.json(highScores);
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));