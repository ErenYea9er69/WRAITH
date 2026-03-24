import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

export type WorkspaceId = 'origin' | 'signal' | 'psyche' | 'cortex' | 'radar' | 'thematics' | 'laboratory' | 'dread' | 'continuity';

export interface Chapter {
  id: string;
  title: string;
  content: string;
  type: string;
  metrics: {
    intensity: number;
    maskLoad: number;
  };
}

interface ProjectState {
  id: string; // Add id for persistence
  wound: string;
  pressures: string[];
  collapseQuestion: {
    question: string;
    charA: { name: string; position: string };
    charB: { name: string; position: string };
  };
  compass: {
    voiceRegister: string;
    sentenceBehavior: {
      maxLengthAction: number;
      maxLengthEmotional: number;
      maxLengthTransitional: number;
      coordinationVsSubordination: 'coordination' | 'subordination';
      forbiddenPatterns: string[];
    };
    avoidWords: string[];
    pacingRatios: {
      action: number;
      interiority: number;
      dialogue: number;
      description: number;
    };
    rhythmRules: string;
  };
  chapters: Chapter[];
  isOriginComplete: boolean;
  // Dynamic Diagnostic Data
  psyche?: {
    signatures: Array<{ id: string; name: string; type: string; status: string; color: string; time: string }>;
    maskLoad: number;
    trajectory: Array<{ x: number; y: number; type: 'sincerity' | 'dread' }>;
  };
  structural?: {
    revelationCurve: Array<{ x: number; y: number }>;
    logicConsistency: number;
    propositions: string[];
    revelationDensity: string;
  };
  thematic?: {
    contradictions: Array<{ sideA: string; sideB: string; weight: number }>;
    resonanceModules: Array<{ title: string; desc: string; active: boolean }>;
    stagingMoments: Array<{ tag: string; title: string; state: string; chapter: string }>;
  };
  signal?: {
    beliefGap: Array<{ x: number; y: number }>;
    coherence: number;
    constellation: { nodes: any[]; links: any[] };
  };
  dread?: {
    beliefStack: Array<{ label: string; reader: string; truth: string; suspicion: number }>;
    calibration: number[];
  };
  continuity?: {
    promises: Array<{ id: string; text: string; status: string; chapter: string }>;
    logicLoops: Array<{ id: string; location: string; description: string }>;
  };
}

interface WraithStore {
  activeWorkspace: WorkspaceId;
  activeChapterId: string | null;
  project: ProjectState;
  
  setActiveWorkspace: (id: WorkspaceId) => void;
  setActiveChapter: (id: string | null) => void;
  updateProject: (data: Partial<ProjectState>) => void;
  addChapter: (chapter: Omit<Chapter, 'id'>) => Promise<void>;
  updateChapter: (id: string, data: Partial<Chapter>) => Promise<void>;
  completeOrigin: () => void;
  loadProject: (id: string) => Promise<void>;
  generateChapterSection: (chapterId: string) => Promise<void>;
  generateNovelDraft: () => Promise<void>;
  analyzeProject: () => Promise<void>;
}

export const useWraithStore = create<WraithStore>()(
  persist(
    (set, getStore) => ({
      activeWorkspace: 'origin',
      project: {
        id: 'main-story', // Default ID
        wound: '',
        pressures: [],
        collapseQuestion: { 
          question: '', 
          charA: { name: '', position: '' }, 
          charB: { name: '', position: '' } 
        },
        compass: {
          voiceRegister: '',
          sentenceBehavior: {
            maxLengthAction: 20,
            maxLengthEmotional: 35,
            maxLengthTransitional: 25,
            coordinationVsSubordination: 'subordination',
            forbiddenPatterns: [],
          },
          avoidWords: [],
          pacingRatios: {
            action: 25,
            interiority: 25,
            dialogue: 25,
            description: 25,
          },
          rhythmRules: '',
        },
        chapters: [],
        isOriginComplete: false,
      },
      activeChapterId: null,
      
      setActiveWorkspace: (id) => set({ activeWorkspace: id }),
      setActiveChapter: (id) => set({ activeChapterId: id }),
      
      updateProject: async (data) => {
        set((state) => ({ 
          project: { ...state.project, ...data } 
        }));
        // Sync to DB
        const fullProject = getStore().project;
        await api.saveProject(fullProject);
      },

      addChapter: async (chapterData) => {
        const currentChapters = getStore().project.chapters || [];
        const id = `CH_${String(currentChapters.length + 1).padStart(2, '0')}`;
        const newChapter: Chapter = { ...chapterData, id };
        
        set((state) => ({
          project: {
            ...state.project,
            chapters: [...currentChapters, newChapter]
          },
          activeChapterId: id
        }));
        
        await api.saveProject(getStore().project);
      },

      updateChapter: async (id, data) => {
        set((state) => ({
          project: {
            ...state.project,
            chapters: state.project.chapters.map(ch => ch.id === id ? { ...ch, ...data } : ch)
          }
        }));
        
        await api.saveProject(getStore().project);
      },

      completeOrigin: async () => {
        set((state) => ({ 
          project: { ...state.project, isOriginComplete: true },
          activeWorkspace: 'signal'
        }));
        const fullProject = getStore().project;
        await api.saveProject(fullProject);
      },

      loadProject: async (id) => {
        try {
          const remote = await api.getProject(id);
          if (remote && remote.id) {
            set((state) => ({
              project: {
                ...state.project,
                ...remote,
                chapters: remote.chapters || []
              }
            }));
          }
        } catch (err) {
          console.error('Failed to load project:', err);
        }
      },

      generateChapterSection: async (chapterId) => {
        const { project } = getStore();
        const chapter = project.chapters.find(c => c.id === chapterId);
        if (!chapter) return;

        try {
          const response = await api.generateChapter(project.id, {
            wound: project.wound,
            pressures: project.pressures,
            compass: project.compass,
            previousContent: chapter.content // Pass existing content to AI
          });

          if (response?.content) {
            const separator = chapter.content.trim() ? '\n\n' : '';
            await getStore().updateChapter(chapterId, {
              content: chapter.content + separator + response.content
            });
          }
        } catch (err) {
          console.error('Section generation failed:', err);
        }
      },

      generateNovelDraft: async () => {
        const { project, generateChapterSection } = getStore();
        const chapters = project.chapters || [];
        
        // Iteratively generate sections for each chapter that is empty or thin
        for (const chapter of chapters) {
          if (!chapter.content || chapter.content.length < 500) {
            await generateChapterSection(chapter.id);
            // Small delay to prevent rate limiting or race conditions if needed
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      },

      analyzeProject: async () => {
        const { project } = getStore();
        try {
          // This endpoint will be implemented in the backend to return a full analysis payload
          const analysis = await api.analyzeProject(project.id, {
            wound: project.wound,
            pressures: project.pressures,
            chapters: project.chapters
          });

          if (analysis) {
            set((state) => ({
              project: {
                ...state.project,
                ...analysis
              }
            }));
            await api.saveProject(getStore().project);
          }
        } catch (err) {
          console.error('Project analysis failed:', err);
        }
      }
    }),
    {
      name: 'wraith-storage',
    }
  )
);
