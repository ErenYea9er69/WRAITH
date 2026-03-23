import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';

export const SignalRoom = () => {
  const { project } = useWraithStore();

  // Mock data for Belief Gap
  const beliefPoints = [
    { x: 0, y: 80 }, { x: 100, y: 70 }, { x: 200, y: 90 }, 
    { x: 300, y: 40 }, { x: 400, y: 60 }, { x: 500, y: 20 },
    { x: 600, y: 85 }, { x: 700, y: 95 }, { x: 800, y: 10 }
  ];

  const polylinePoints = beliefPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full">
      <header className="mb-12 flex justify-between items-end border-b border-zinc-900 pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-bone uppercase">Signal Room</h1>
          <p className="text-zinc-500 text-xs italic mt-1 font-mono tracking-wide max-w-xl truncate">
            Narrative Object // {project.wound || "System Uninitialized"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[9px] text-zinc-600 uppercase tracking-widest">
            Structural Coherence: <span className="text-bone ml-1">94.2%</span>
          </div>
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
            Reader Belief State: <span className="text-crimson font-bold ml-2 animate-pulse">DETECTING DRIFT</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-12 flex-1 min-h-0">
        
        {/* Belief Gap Line Chart Area */}
        <section className="bg-zinc-900/10 border border-zinc-900 rounded-sm p-8 h-72 flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Belief Gap Visualization <span className="text-zinc-700 ml-2 font-normal italic">[Truth vs. Suspicion]</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                <div className="w-2 h-2 bg-crimson" /> Truth
              </div>
              <div className="flex items-center gap-2 text-[8px] uppercase text-zinc-600">
                <div className="w-2 h-0.5 bg-zinc-700" /> Ceiling
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <svg viewBox="0 0 800 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[25, 50, 75].map(h => (
                <line key={h} x1="0" y1={h} x2="800" y2={h} stroke="#161618" strokeWidth="0.5" />
              ))}
              
              {/* The Line */}
              <motion.polyline
                points={polylinePoints}
                fill="none"
                stroke="#990000"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Interaction Points */}
              {beliefPoints.map((p, i) => (
                <circle 
                  key={i} 
                  cx={p.x} cy={p.y} r="2" 
                  fill={i === beliefPoints.length - 1 ? "#ff0000" : "#990000"}
                  className="cursor-pointer hover:r-4 transition-all"
                >
                  <title>Chapter {i+1}: Belief Delta {100-p.y}%</title>
                </circle>
              ))}
            </svg>
          </div>
        </section>

        {/* Story Spine */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Story Spine <span className="text-zinc-700 ml-2 font-normal italic">[Pressure Intensity Heatmap]</span>
            </div>
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest">
              Chapters 01 - 08
            </div>
          </div>
          <div className="flex h-32 w-full bg-zinc-900/40 border border-zinc-800 rounded divide-x divide-zinc-900 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex-1 flex flex-col p-3 group cursor-pointer hover:bg-zinc-800 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[9px] text-zinc-600 group-hover:text-bone font-mono">CH {i}</div>
                  <div className={`w-1 h-1 rounded-full ${Math.random() > 0.7 ? 'bg-crimson shadow-[0_0_4px_#990000]' : 'bg-zinc-800'}`} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                   {/* Info Pressure */}
                   <div className="h-1 bg-crimson" style={{ width: `${Math.random()*90 + 10}%`, opacity: 0.8 }} />
                   {/* Relation Pressure */}
                   <div className="h-1 bg-zinc-700" style={{ width: `${Math.random()*70 + 30}%` }} />
                   {/* Moral Pressure */}
                   <div className="h-1 bg-zinc-800 border border-zinc-700/50" style={{ width: `${Math.random()*80 + 20}%` }} />
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-zinc-500 uppercase tracking-tighter text-center">
                   Analyze
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Character Constellation Area */}
        <div className="grid grid-cols-2 gap-8">
          <section className="bg-zinc-900/10 border border-zinc-900 rounded-sm p-6 h-64 flex flex-col relative overflow-hidden">
             <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">
              Character Constellation foundation
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <svg className="w-full h-full">
                <circle cx="50%" cy="50%" r="4" fill="#990000" className="animate-pulse" />
                <circle cx="30%" cy="40%" r="3" fill="#e8e6e3" />
                <circle cx="70%" cy="30%" r="3" fill="#e8e6e3" />
                <circle cx="40%" cy="70%" r="3" fill="#e8e6e3" />
                <line x1="50%" y1="50%" x2="30%" y2="40%" stroke="#161618" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#161618" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="40%" y2="70%" stroke="#161618" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-2 right-2 text-[8px] text-zinc-700 uppercase">Interactive Node Map</div>
            </div>
          </section>

          <section className="bg-zinc-900/10 border border-zinc-900 rounded-sm p-6 h-64 flex flex-col">
             <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">
              Active Resistance Feed
            </div>
            <div className="space-y-3 overflow-y-auto">
              <div className="p-3 bg-zinc-900/50 border-l-2 border-crimson text-[10px] leading-relaxed">
                <span className="text-crimson font-bold block mb-1 font-mono uppercase">Structural Provocation // 01</span>
                "The protagonist's sudden shift in Chapter 4 lacks the necessary psychological preparation. The Mask Load is too high for this interaction."
              </div>
              <div className="p-3 bg-zinc-900/20 border-l-2 border-zinc-800 text-[10px] text-zinc-500 leading-relaxed font-mono">
                [LOGGED] Belief Gap ceiling exceeded in Chapter 7. Reader manipulation risk: HIGH.
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
