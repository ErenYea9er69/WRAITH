const API_BASE = 'http://localhost:3001/api';

export const api = {
  async getProject(id: string) {
    const res = await fetch(`${API_BASE}/project/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  async saveProject(project: any) {
    const res = await fetch(`${API_BASE}/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return res.ok;
  },

  async generateChapter(projectId: string, context: any) {
    const res = await fetch(`${API_BASE}/generate-chapter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, context }),
    });
    if (!res.ok) return null;
    return res.json();
  },

  async analyzeProject(projectId: string, context: any) {
    const res = await fetch(`${API_BASE}/analyze-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, context }),
    });
    if (!res.ok) return null;
    return res.json();
  }
};
