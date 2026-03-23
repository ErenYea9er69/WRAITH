import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WorkspaceId = 'origin' | 'signal' | 'psyche' | 'structural' | 'revelation' | 'thematic' | 'laboratory' | 'dread' | 'continuity';

interface ProjectState {
  wound: string;
  pressures: string[];
  collapseQuestion: {
    question: string;
    charA: string;
    charB: string;
  };
  compass: {
    voiceRegister: string;
    sentenceBehavior: string;
    avoidWords: string[];
    pacingRatios: Record<string, number>;
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
}

export const useWraithStore = create<WraithStore>()(
  persist(
    (set) => ({
      activeWorkspace: 'origin',
      project: {
        wound: '',
        pressures: [],
        collapseQuestion: { question: '', charA: '', charB: '' },
        compass: {
          voiceRegister: '',
          sentenceBehavior: '',
          avoidWords: [],
          pacingRatios: {},
          rhythmRules: '',
        },
        isOriginComplete: false,
      },
      
      setActiveWorkspace: (id) => set({ activeWorkspace: id }),
      updateProject: (data) => set((state) => ({ 
        project: { ...state.project, ...data } 
      })),
      completeOrigin: () => set((state) => ({ 
        project: { ...state.project, isOriginComplete: true },
        activeWorkspace: 'signal'
      })),
    }),
    {
      name: 'wraith-storage',
    }
  )
);
