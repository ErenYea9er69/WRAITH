import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { Layers, Share2, Info } from 'lucide-react';

export const StructuralCortex = () => {
  const { project } = useWraithStore();

  const revelationPoints = [
    { x: 0, y: 95 }, { x: 100, y: 90 }, { x: 200, y: 85 }, 
    { x: 300, y: 30 }, { x: 400, y: 70 }, { x: 500, y: 60 },
    { x: 600, y: 20 }, { x: 700, y: 15 }, { x: 800, y: 5 }
  ];

  const polylinePoints = revelationPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full">
      {/* Genesis Protocol Header */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Layers size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase">Structural Cortex</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Two // Genesis Protocol // Narrative Object // {project.wound.slice(0, 30)}...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Temporal Architecture</span>
            <div className="text-xs text-bone font-mono">NON-LINEAR // ANAMORPHIC</div>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Revelation Density</span>
            <div className="text-xs text-bone font-mono">CRITICAL // 8.4 bits/chapter</div>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Structural Health</span>
            <div className="text-xs text-crimson font-bold font-mono uppercase">Fragile // Loop Detected</div>
          </div>
        </div>
      </header>

      {/* Revelation Curve SVG */}
      <section className="bg-zinc-900/10 border border-zinc-900 rounded p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            The Revelation Curve <span className="text-zinc-700 ml-2 font-normal italic">[Information Rollout Plan]</span>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                <div className="w-2 h-0.5 bg-crimson" /> Discovery
              </div>
              <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                <div className="w-2 h-0.5 bg-zinc-800" /> Latency
              </div>
          </div>
        </div>

        <div className="h-64 relative">
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
        </div>
      </section>

      {/* Chapter Revelation Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Share2 size={14} className="text-zinc-500" />
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Structural Propositions</h3>
            </div>
            <div className="space-y-2">
              {[
                "Protagonist's Complicity revealed via institutional data.",
                "The 'False Premise' of the Wound is inverted.",
                "Character B's true position is signaled in peripheral description."
              ].map((p, i) => (
                <div key={i} className="p-3 bg-zinc-900/20 border border-zinc-900 text-[10px] text-zinc-400 font-mono italic flex gap-4">
                   <span className="text-crimson font-bold">PROP_{i+1}</span>
                   {p}
                </div>
              ))}
            </div>
         </section>

         <section className="bg-zinc-900/30 border border-zinc-800 p-6 flex flex-col justify-center gap-4">
            <div className="flex gap-2">
               <Info size={16} className="text-zinc-600 shrink-0" />
               <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wide">
                 Revelation density is currently <span className="text-crimson font-bold">UNBALANCED</span>. 
                 Chapters 4 through 6 carry 70% of the narrative significance.
                 Consider redistributing the 'Somatic Suppression' signature to Chapter 3.
               </p>
            </div>
            <button className="w-full py-3 bg-zinc-800 border border-zinc-700 text-bone text-[10px] uppercase font-bold tracking-widest hover:bg-zinc-700 transition-all">
               REBALANCE TIMELINE
            </button>
         </section>
      </div>
    </div>
  );
};
