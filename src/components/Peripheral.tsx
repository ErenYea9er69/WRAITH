import { useWraithStore } from '../store/useWraithStore';

export const Peripheral = () => {
  const { activeWorkspace, project, analyzeProject } = useWraithStore();
  const hasWound = project.wound.trim().length > 0;

  return (
    <aside className="peripheral h-full p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Peripheral Data</h3>
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hasWound ? 'bg-crimson shadow-[0_0_8px_rgba(153,0,0,0.6)]' : 'bg-zinc-800'}`} />
      </div>

      {activeWorkspace === 'origin' && (
        <div className="space-y-4">
          <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
            <h4 className="text-[10px] text-zinc-400 mb-2 uppercase">System Status</h4>
            <p className="text-xs text-bone leading-relaxed">
              {hasWound 
                ? "Origin Chamber initialized. Calibrating psychological foundations..." 
                : "Origin Chamber is mandatory. Awaiting architecture initialization..."}
            </p>
          </div>
        </div>
      )}

      {activeWorkspace !== 'origin' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] text-zinc-500 uppercase tracking-tighter">Reader Belief Model</h4>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full bg-crimson transition-all duration-1000 ${hasWound ? 'w-1/3' : 'w-0'}`} />
            </div>
            <div className="flex justify-between text-[9px] text-zinc-400 uppercase">
              <span>Truth</span>
              <span>Suspicion</span>
            </div>
          </div>

        </div>
      )}
      
      {hasWound && (
        <button 
          onClick={() => analyzeProject()}
          className="w-full py-3 bg-zinc-900 border border-zinc-800 hover:border-crimson text-bone text-[10px] uppercase tracking-widest font-bold transition-all group flex items-center justify-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          ANALYZE STORY LOGIC
        </button>
      )}
      
      <div className="mt-auto pt-4 border-t border-zinc-900 text-[9px] text-zinc-600 font-mono">
        WRAITH // SYSTEM 0.1 // {new Date().toLocaleDateString()}
      </div>
    </aside>
  );
};
