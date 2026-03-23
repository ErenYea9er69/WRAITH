import { useWraithStore } from '../store/useWraithStore';
import type { WorkspaceId } from '../store/useWraithStore';
import { 
  Target,
  Radio, 
  Activity, 
  User, 
  Layers, 
  Key, 
  Tent, 
  FlaskConical, 
  Eye, 
  History,
  AlertCircle,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKSPACES: { id: WorkspaceId; icon: any; label: string; status?: 'amber' | 'crimson' | 'dark' | 'none' }[] = [
  { id: 'origin', icon: Target, label: 'Origin Chamber', status: 'amber' },
  { id: 'signal', icon: Radio, label: 'Signal Room', status: 'crimson' },
  { id: 'psyche', icon: User, label: 'Psyche Engine', status: 'dark' },
  { id: 'cortex', icon: Layers, label: 'Structural Cortex', status: 'dark' },
  { id: 'radar', icon: Activity, label: 'Sentence Radar', status: 'dark' },
  { id: 'laboratory', icon: FlaskConical, label: 'Chapter Lab', status: 'dark' },
  { id: 'dread', icon: Eye, label: 'Dread Architecture', status: 'dark' },
  { id: 'continuity', icon: GitBranch, label: 'Continuity System', status: 'dark' },
  { id: 'archive', icon: History, label: 'Archive', status: 'none' },
];

export const LeftRail = () => {
  const { activeWorkspace, setActiveWorkspace, project } = useWraithStore();

  return (
    <aside className="w-16 h-full bg-[#080809] border-r border-zinc-900 flex flex-col items-center py-6 z-50">
      <div className="mb-12">
        <div className="w-8 h-8 border-2 border-crimson flex items-center justify-center font-bold text-crimson text-xl tracking-tighter hover:bg-crimson hover:text-bone transition-colors cursor-pointer">
          W
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {WORKSPACES.map((ws) => {
          const isActive = activeWorkspace === ws.id;
          const isOrigin = ws.id === 'origin';
          const isDisabled = !project.isOriginComplete && !isOrigin;

          return (
            <div key={ws.id} className="relative group">
              <button
                onClick={() => !isDisabled && setActiveWorkspace(ws.id)}
                disabled={isDisabled}
                className={`
                  p-3 rounded-sm transition-all duration-300 relative
                  ${isActive ? 'bg-zinc-900 border border-zinc-700' : 'hover:bg-zinc-900/50'}
                  ${isDisabled ? 'opacity-20 cursor-not-allowed grayscale' : 'cursor-pointer'}
                `}
              >
                <ws.icon 
                  size={20} 
                  className={`
                    ${isActive ? 'text-crimson' : 'text-zinc-600 group-hover:text-zinc-400'}
                    ${isDisabled ? '' : 'transition-colors'}
                  `} 
                />
                
                {/* Status Pulse */}
                {!isDisabled && ws.status && ws.status !== 'none' && (
                  <span className={`absolute top-2 right-2 flex h-1.5 w-1.5`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
                      ${ws.status === 'crimson' ? 'bg-crimson' : ws.status === 'amber' ? 'bg-amber-600' : 'bg-zinc-800'}`} 
                    />
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 
                      ${ws.status === 'crimson' ? 'bg-crimson' : ws.status === 'amber' ? 'bg-amber-600' : 'bg-zinc-800'}`} 
                    />
                  </span>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {ws.label}
                {isDisabled && <span className="ml-2 text-zinc-700 block text-[8px]">[Locked: Origin Incomplete]</span>}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {!project.isOriginComplete && (
           <div className="p-2 text-crimson animate-pulse cursor-help group relative">
             <AlertCircle size={20} />
             <div className="absolute left-14 bottom-0 px-3 py-2 bg-zinc-950 border border-crimson/50 text-bone text-[9px] uppercase tracking-tighter pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Mandatory Origin Required
             </div>
           </div>
        )}
        <button className="p-3 text-zinc-700 hover:text-zinc-400 transition-colors">
          <History size={20} />
        </button>
      </div>
    </aside>
  );
};
