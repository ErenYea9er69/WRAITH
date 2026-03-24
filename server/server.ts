import express from 'express';
import cors from 'cors';
import { initDB, get, run } from './database.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize DB
initDB().then(() => {
  console.log('SQLite Database Initialized.');
});

// GET Project
app.get('/api/project/:id', async (req, res) => {
  try {
    const row = await (get as any)('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (row) {
      // Decode JSON fields
      row.pressures = JSON.parse(row.pressures || '[]');
      row.collapseQuestion = JSON.parse(row.collapseQuestion || '{}');
      row.compass = JSON.parse(row.compass || '{}');
      row.chapters = JSON.parse(row.chapters || '[]');
      row.isOriginComplete = !!row.isOriginComplete;
      res.json(row);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST Update Project
app.post('/api/project', async (req, res) => {
  const { id, wound, pressures, collapseQuestion, compass, isOriginComplete } = req.body;
  try {
    await (run as any)(`
      INSERT INTO projects (id, wound, pressures, collapseQuestion, compass, chapters, isOriginComplete)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        wound = excluded.wound,
        pressures = excluded.pressures,
        collapseQuestion = excluded.collapseQuestion,
        compass = excluded.compass,
        chapters = excluded.chapters,
        isOriginComplete = excluded.isOriginComplete,
        lastUpdated = CURRENT_TIMESTAMP
    `, [
      id, 
      wound, 
      JSON.stringify(pressures), 
      JSON.stringify(collapseQuestion), 
      JSON.stringify(compass),
      JSON.stringify(req.body.chapters || []),
      isOriginComplete ? 1 : 0
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Generate Chapter (Mock for now, but endpoint exists)
app.post('/api/generate-chapter', (req, res) => {
  const { projectId, context } = req.body;
  const content = `The weight of the ${context.pressures?.[0] || 'silence'} pressed against them. It wasn't the sound that hurt, but the implication of what came after. ${context.wound}... it was a signature written in blood on the interior of their skull. This was only the beginning of the ${projectId} manifestation.`;
  
  res.json({ content });
});

app.listen(PORT, () => {
  console.log(`WRAITH Persistence Server running at http://localhost:${PORT}`);
});
