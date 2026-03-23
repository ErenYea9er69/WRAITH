import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../wraith.db');
const db = new sqlite3.Database(dbPath);

export const run = promisify(db.run.bind(db));
export const get = promisify(db.get.bind(db));
export const all = promisify(db.all.bind(db));

export const initDB = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      wound TEXT,
      pressures TEXT,
      collapseQuestion TEXT,
      compass TEXT,
      isOriginComplete INTEGER,
      lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS chapters (
      project_id TEXT,
      chapter_id TEXT,
      type TEXT,
      intensity INTEGER,
      maskLoad INTEGER,
      PRIMARY KEY (project_id, chapter_id)
    )
  `);
};

export default db;
