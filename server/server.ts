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
      const diag = JSON.parse(row.diagnostics || '{}');
      Object.assign(row, diag); // Merge diagnostics into top level for convenience
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

function generateAnalysis(wound: string, pressures: string[]) {
  const intensities = pressures.map(() => Math.floor(Math.random() * 50) + 30);
  
  return {
    psyche: {
      signatures: [
        { id: 'S1', name: 'Evasive Redirect', type: 'Reactive', status: 'Active', color: 'crimson', time: '14:22' },
        { id: 'S2', name: 'Bureaucratic Deference', type: 'Protective', status: 'Logged', color: 'zinc-700', time: '12:05' },
        { id: 'S3', name: 'Somatic Suppression', type: 'Internal', status: 'Logged', color: 'zinc-700', time: '09:40' },
      ],
      maskLoad: 72,
      trajectory: [
        { x: 0, y: 180, type: 'dread' }, { x: 500, y: 40, type: 'dread' }, { x: 1000, y: 5, type: 'dread' },
        { x: 0, y: 50, type: 'sincerity' }, { x: 500, y: 180, type: 'sincerity' }, { x: 1000, y: 200, type: 'sincerity' }
      ]
    },
    structural: {
      revelationCurve: [
        { x: 0, y: 95 }, { x: 300, y: 30 }, { x: 600, y: 20 }, { x: 800, y: 5 }
      ],
      logicConsistency: 31,
      propositions: [
        "Protagonist's Complicity revealed via institutional data.",
        "The 'False Premise' of the Wound is inverted.",
        "Character B's true position is signaled in peripheral description."
      ],
      revelationDensity: "8.4 bits/chapter"
    },
    thematic: {
      contradictions: [
        { sideA: 'Institutional Security', sideB: 'Individual Truth', weight: 85 },
        { sideA: 'Somatic Comfort', sideB: 'Moral Duty', weight: 40 },
        { sideA: 'Legacy Preservation', sideB: 'Necessary Rupture', weight: 65 }
      ],
      resonanceModules: [
        { title: 'Somatic Grotesque', desc: 'High physical discomfort. Fetid humidity.', active: true },
        { title: 'Sterile Isolation', desc: 'Fluorescent hum. Cold palettes.', active: false }
      ],
      stagingMoments: [
        { tag: 'M_01', title: 'The Complicit Handshake', state: 'Staged', chapter: '02' },
        { tag: 'M_02', title: 'The Silence at the Sink', state: 'Simulation Required', chapter: '05' }
      ]
    },
    signal: {
      beliefGap: [
        { x: 0, y: 80 }, { x: 300, y: 40 }, { x: 500, y: 20 }, { x: 800, y: 10 }
      ],
      coherence: 94.2,
      constellation: { nodes: [], links: [] }
    },
    dread: {
      beliefStack: [
        { label: 'Protagonist Identity', reader: 'Stable', truth: 'Fractured', suspicion: 15 },
        { label: 'The Murders at the Sink', reader: 'Accidental', truth: 'Premeditated', suspicion: 65 }
      ],
      calibration: [20, 45, 30, 85, 60, 95, 40, 75, 50, 90]
    },
    continuity: {
      promises: [
        { id: 'P_01', text: 'The protagonist is verified blind in the left eye.', status: 'Broken', chapter: '03' },
        { id: 'P_02', text: 'The "Wound" occured exactly 12 years ago.', status: 'Verified', chapter: '01' }
      ],
      logicLoops: [
        { id: 'L1', location: 'CH_03 / CH_07', description: 'Temporal Offset detected in alibi.' }
      ]
    }
  };
}

// POST Analyze Project
app.post('/api/analyze-project', async (req, res) => {
  const { projectId, context } = req.body;
  const analysis = generateAnalysis(context.wound, context.pressures);
  
  try {
    // Save diagnostics to DB
    await (run as any)('UPDATE projects SET diagnostics = ? WHERE id = ?', [
      JSON.stringify(analysis),
      projectId
    ]);
    res.json(analysis);
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
