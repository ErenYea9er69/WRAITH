import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WorkspaceId = 'origin' | 'signal' | 'psyche' | 'structural' | 'revelation' | 'thematic' | 'laboratory' | 'dread' | 'continuity';

interface ProjectState {
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
}

export const useWraithStore = create<WraithStore>()(
  persist(
    (set) => ({
      activeWorkspace: 'origin',
      project: {
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
