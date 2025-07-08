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
  try {
    const { player, score } = req.body;
    if (!player || typeof score !== 'number') {
      return res.status(400).json({ status: 'error', message: 'Invalid data' });
    }
    highScores.push({ player, score, date: new Date().toISOString() });
    highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 10);
    res.json({ status: 'success', message: 'Score saved!', highScores });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

app.get('/leaderboard', (req, res) => {
  res.json(highScores);
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
