import { useWraithStore } from '../../store/useWraithStore';

export const SignalRoom = () => {
  const { project } = useWraithStore();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] p-8">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-bone uppercase">Signal Room</h1>
          <p className="text-zinc-500 text-xs italic mt-1 font-mono tracking-wide">
            Narrative Object Status: // {project.wound.slice(0, 40)}...
          </p>
        </div>
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest text-right">
          Reader Belief State: <span className="text-crimson font-bold ml-2 animate-pulse">UNMODIFIED</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-12 flex-1">
        
        {/* Belief Gap Line Chart Area */}
        <section className="bg-zinc-900/20 border border-zinc-900 border-dashed rounded-lg p-12 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-4 left-4 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            Belief Gap Visualization
          </div>
          <svg className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity">
            <path d="M0 150 Q 200 50, 400 150 T 800 150" fill="transparent" stroke="#990000" strokeWidth="2" />
          </svg>
          <div className="text-[10px] text-zinc-700 uppercase tracking-tighter">
            Waiting for chapter data...
          </div>
        </section>

        {/* Story Spine */}
        <section>
           <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">
            Story Spine
          </div>
          <div className="flex h-24 w-full bg-zinc-900/40 border border-zinc-800 rounded divide-x divide-zinc-800 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex-1 flex flex-col p-2 group cursor-pointer hover:bg-zinc-800 transition-colors">
                <div className="text-[10px] text-zinc-600 group-hover:text-bone mb-2">CH {i}</div>
                <div className="flex-1 flex flex-col gap-0.5">
                   <div className="flex-1 bg-crimson/40" style={{ width: `${Math.random()*100}%` }} />
                   <div className="flex-1 bg-zinc-700/40" style={{ width: `${Math.random()*100}%` }} />
                   <div className="flex-1 bg-zinc-500/40" style={{ width: `${Math.random()*100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Character Constellation Area */}
        <section className="bg-zinc-900/20 border border-zinc-900 border-dashed rounded-lg p-8 h-48 flex items-center justify-center">
           <div className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
            Character Constellation [Nodes Locked]
          </div>
        </section>

      </div>
    </div>
  );
};
