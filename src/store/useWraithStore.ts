import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

export type WorkspaceId = 'origin' | 'signal' | 'psyche' | 'cortex' | 'radar' | 'thematics' | 'laboratory' | 'dread' | 'continuity' | 'archive' | 'revelation' | 'thematic' | 'structural';

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
  isOriginComplete: boolean;
}

interface WraithStore {
  activeWorkspace: WorkspaceId;
  project: ProjectState;
  
  setActiveWorkspace: (id: WorkspaceId) => void;
  updateProject: (data: Partial<ProjectState>) => void;
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
        isOriginComplete: false,
      },
      
      setActiveWorkspace: (id) => set({ activeWorkspace: id }),
      
      updateProject: async (data) => {
        set((state) => ({ 
          project: { ...state.project, ...data } 
        }));
        // Sync to DB
        const fullProject = getStore().project;
        await api.saveProject(fullProject);
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
        const remote = await api.getProject(id);
        if (remote) {
          set({ project: remote });
        }
      }
    }),
    {
      name: 'wraith-storage',
    }
  )
);
