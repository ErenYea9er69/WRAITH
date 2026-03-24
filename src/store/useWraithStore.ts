import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

export type WorkspaceId = 'origin' | 'signal' | 'psyche' | 'cortex' | 'radar' | 'thematics' | 'laboratory' | 'dread' | 'continuity' | 'archive' | 'revelation' | 'thematic' | 'structural';

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
      }
    }),
    {
      name: 'wraith-storage',
    }
  )
);
