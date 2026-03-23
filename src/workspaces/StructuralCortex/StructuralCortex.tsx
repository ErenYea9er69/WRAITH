import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { Layers, Share2, Info, Activity } from 'lucide-react';

export const StructuralCortex = () => {
  const { project } = useWraithStore();
  const hasWound = project.wound.trim().length > 0;

  const revelationPoints = [
    { x: 0, y: 95 }, { x: 100, y: 90 }, { x: 200, y: 85 }, 
    { x: 300, y: 30 }, { x: 400, y: 70 }, { x: 500, y: 60 },
    { x: 600, y: 20 }, { x: 700, y: 15 }, { x: 800, y: 5 }
  ];

  const polylinePoints = revelationPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full workspace-content-padding">
      {/* Genesis Protocol Header */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Layers size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase">Structural Cortex</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Two // Genesis Protocol // Narrative Object // {hasWound ? project.wound.slice(0, 30) : 'System Standby'}...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Temporal Architecture</span>
            <div className="text-xs text-bone font-mono">{hasWound ? 'NON-LINEAR // ANAMORPHIC' : 'IDLE'}</div>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Revelation Density</span>
            <div className={`text-xs font-mono ${hasWound ? 'text-bone' : 'text-zinc-800'}`}>{hasWound ? 'CRITICAL // 8.4 bits/chapter' : '0.0 bits/chapter'}</div>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Structural Health</span>
            <div className={`text-xs font-bold font-mono uppercase ${hasWound ? 'text-crimson' : 'text-zinc-800'}`}>
              {hasWound ? 'Fragile // Loop Detected' : 'Diagnostic Standby'}
            </div>
          </div>
        </div>
      </header>

      {/* Revelation Curve SVG */}
      <section className={`bg-zinc-900/10 border border-zinc-900 rounded p-8 mb-8 transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            The Revelation Curve <span className="text-zinc-700 ml-2 font-normal italic">[Information Rollout Plan]</span>
          </div>
          {hasWound && (
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                  <div className="w-2 h-0.5 bg-crimson" /> Discovery
                </div>
                <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                  <div className="w-2 h-0.5 bg-zinc-800" /> Latency
                </div>
            </div>
          )}
        </div>

        <div className="h-64 relative flex items-center justify-center">
          {hasWound ? (
            <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="none">
               {/* Diagonal Grid */}
               {[...Array(10)].map((_, i) => (
                  <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="100" stroke="#161618" strokeWidth="0.5" />
               ))}
               
               {/* The Curve */}
               <motion.polyline
                  points={polylinePoints}
                  fill="none"
                  stroke="#990000"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />

                {/* Discovery Slabs */}
                {revelationPoints.filter((_, i) => i % 3 === 0).map((p, i) => (
                  <g key={i}>
                    <rect x={p.x - 1} y="0" width="2" height="100" fill="rgba(153, 0, 0, 0.05)" />
                    <text x={p.x + 5} y="15" fill="#52525b" fontSize="8" className="uppercase font-mono tracking-tighter">
                      Rupture Point {i+1}
                    </text>
                  </g>
                ))}
            </svg>
          ) : (
            <div className="text-[10px] text-zinc-800 font-mono tracking-[0.5em] uppercase">
              Awaiting Timeline Mapping
            </div>
          )}
        </div>
      </section>

      {/* Twist Integrity Monitor */}
      <section className={`mb-12 bg-zinc-900/10 border border-zinc-900 p-8 rounded-sm transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={16} className="text-crimson" />
          <h2 className="text-[12px] text-bone uppercase tracking-widest font-bold">Twist Integrity Monitor // Retroactive Reframing</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-tight">Active Revelation Simulation</div>
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-sm">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">Target Reveal: The Mentor is the Origin</span>
                    <span className="px-2 py-0.5 bg-crimson/10 border border-crimson/20 text-[8px] text-crimson font-bold uppercase">Simulating...</span>
                 </div>
                 <div className="space-y-3">
                    {[
                      { fact: 'Mentor was in Tokyo during the first murder.', status: 'Conflict', severity: 'High' },
                      { fact: 'Protagonist found the mentor\'s lighter at the scene.', status: 'Verified', severity: 'Safe' },
                      { fact: 'Mentor is known to be a "Genetic Anomaly" (Ref. Mouse).', status: 'Pending', severity: 'Mid' },
                    ].map((f, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-[#0a0a0b] border border-zinc-900">
                         <span className="text-[10px] text-zinc-500 font-mono tracking-tight">{f.fact}</span>
                         <span className={`text-[8px] font-bold uppercase ${f.status === 'Conflict' ? 'text-crimson' : 'text-zinc-700'}`}>{f.status}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col gap-4">
              <div className="p-6 border border-zinc-900 bg-zinc-900/20 flex flex-col justify-between h-full">
                 <div className="space-y-4">
                   <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Logic Continuity Score</div>
                   <div className="text-4xl font-bold text-bone font-mono">31<span className="text-sm ml-1 text-zinc-700">%</span></div>
                   <p className="text-[9px] text-zinc-500 uppercase leading-relaxed tracking-wider">
                     Twist contains <span className="text-crimson font-bold">CRITICAL DECOUPLING</span>. 
                     The current projection breaks 3 core promises in the Continuity Architecture.
                   </p>
                 </div>
                 <button className="w-full py-2 bg-crimson shadow-[0_0_15px_rgba(153,0,0,0.3)] text-bone text-[9px] uppercase font-bold tracking-widest hover:bg-crimson/80 mt-6" disabled={!hasWound}>
                    Repair Logic Loop
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Chapter Revelation Mapping */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
         <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Share2 size={14} className="text-zinc-500" />
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Structural Propositions</h3>
            </div>
            <div className="space-y-2">
              {hasWound ? [
                "Protagonist's Complicity revealed via institutional data.",
                "The 'False Premise' of the Wound is inverted.",
                "Character B's true position is signaled in peripheral description."
              ].map((p, i) => (
                <div key={i} className="p-3 bg-zinc-900/20 border border-zinc-900 text-[10px] text-zinc-400 font-mono italic flex gap-4">
                   <span className="text-crimson font-bold">PROP_{i+1}</span>
                   {p}
                </div>
              )) : (
                <div className="p-8 border border-zinc-900 bg-zinc-950/50 rounded flex items-center justify-center">
                   <span className="text-[9px] text-zinc-800 font-mono uppercase">Propositions Offline</span>
                </div>
              )}
            </div>
         </section>

         <section className={`bg-zinc-900/30 border border-zinc-800 p-6 flex flex-col justify-center gap-4 ${!hasWound && 'opacity-20 cursor-not-allowed'}`}>
            <div className="flex gap-2">
               <Info size={16} className="text-zinc-600 shrink-0" />
               <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wide">
                 {hasWound ? (
                   <>
                     Revelation density is currently <span className="text-crimson font-bold">UNBALANCED</span>. 
                     Chapters 4 through 6 carry 70% of the narrative significance.
                     Consider redistributing the 'Somatic Suppression' signature to Chapter 3.
                   </>
                 ) : (
                   "Revelation density diagnostics will activate upon architecture initialization."
                 )}
               </p>
            </div>
            <button className="w-full py-3 bg-zinc-800 border border-zinc-700 text-bone text-[10px] uppercase font-bold tracking-widest hover:bg-zinc-700 transition-all disabled:opacity-20" disabled={!hasWound}>
               REBALANCE TIMELINE
            </button>
         </section>
      </div>
    </div>
  );
};
