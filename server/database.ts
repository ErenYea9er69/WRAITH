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
  try {
    await run(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        wound TEXT,
        pressures TEXT,
        collapseQuestion TEXT,
        compass TEXT,
        chapters TEXT,
        isOriginComplete INTEGER,
        lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add chapters column if it doesn't exist (for existing tables)
    try {
      await run('ALTER TABLE projects ADD COLUMN chapters TEXT');
    } catch (e) {
      // Column likely already exists
    }

    // Clean up redundant table if it exists
    try {
      await run('DROP TABLE IF EXISTS chapters');
    } catch (e) {
      // Ignore
    }
  } catch (err) {
    console.error('Failed to initialize database:', err);
    throw err;
  }
};

export default db;
