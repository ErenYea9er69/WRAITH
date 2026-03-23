import { useWraithStore } from '../store/useWraithStore';
import type { WorkspaceId } from '../store/useWraithStore';
import { 
  Radio, 
  Activity, 
  User, 
  Layers, 
  Key, 
  Tent, 
  FlaskConical, 
  Eye, 
  History 
} from 'lucide-react';

const WORKSPACES: { id: WorkspaceId; icon: any; label: string }[] = [
  { id: 'origin', icon: Radio, label: 'Origin' },
  { id: 'signal', icon: Activity, label: 'Signal Room' },
  { id: 'psyche', icon: User, label: 'Psyche Engine' },
  { id: 'structural', icon: Layers, label: 'Structural Cortex' },
  { id: 'revelation', icon: Key, label: 'Revelation Web' },
  { id: 'thematic', icon: Tent, label: 'Thematic System' },
  { id: 'laboratory', icon: FlaskConical, label: 'Chapter Lab' },
  { id: 'dread', icon: Eye, label: 'Dread Architecture' },
  { id: 'continuity', icon: History, label: 'Continuity' },
];

export const LeftRail = () => {
  const { activeWorkspace, setActiveWorkspace, project } = useWraithStore();

  return (
    <aside className="left-rail">
      <div className="mb-8 flex flex-col items-center">
        <div className="text-crimson font-bold text-xl mb-4">W</div>
        <div className="h-px w-8 bg-zinc-800" />
      </div>
      
      {WORKSPACES.map((ws) => {
        const isActive = activeWorkspace === ws.id;
        const isDisabled = !project.isOriginComplete && ws.id !== 'origin';
        
        return (
          <button
            key={ws.id}
            onClick={() => !isDisabled && setActiveWorkspace(ws.id)}
            className={`
              relative p-3 rounded-lg transition-all duration-200 group
              ${isActive ? 'bg-zinc-900 text-bone' : 'text-zinc-600 hover:text-zinc-400'}
              ${isDisabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={ws.label}
          >
            <ws.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            
            {/* Status Pulse */}
            {!isDisabled && (
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full pulse-crimson border border-charcoal" />
            )}

            {/* Tooltip */}
            <div className="absolute left-16 px-2 py-1 bg-zinc-900 text-[10px] uppercase tracking-wider text-bone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-zinc-800">
              {ws.label}
            </div>
          </button>
        );
      })}
    </aside>
  );
};
