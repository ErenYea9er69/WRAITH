import { useWraithStore } from '../../store/useWraithStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Layers, Play, Settings, Terminal, Activity, Zap } from 'lucide-react';
import { useState } from 'react';

export const ChapterLaboratory = () => {
  const { project } = useWraithStore();
  const [activeLayer, setActiveLayer] = useState<'psych' | 'struct' | 'thematic'>('psych');
  const hasWound = project.wound.trim().length > 0;

  const chapters = [
    { id: 'CH_01', type: 'Establishment', intensity: 30, maskLoad: 12 },
    { id: 'CH_02', type: 'Pressure Point', intensity: 65, maskLoad: 45 },
    { id: 'CH_03', type: 'Rupture', intensity: 90, maskLoad: 85 },
    { id: 'CH_04', type: 'Latency', intensity: 20, maskLoad: 60 },
    { id: 'CH_05', type: 'Climax', intensity: 100, maskLoad: 95 },
  ];

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full">
      {/* Workspace Header */}
      <header className="mb-8 flex justify-between items-start border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Beaker size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase italic">Chapter Laboratory</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Five // Simulated Draft Environment // {hasWound ? 'System Initialized' : 'Origin Pending'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-crimson text-bone font-bold text-[10px] uppercase tracking-widest hover:bg-crimson/80 transition-all border border-crimson/20 disabled:opacity-20" disabled={!hasWound}>
              <Play size={12} fill="currentColor" /> Run Simulation
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all">
              <Settings size={12} /> Config
           </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Grid Section */}
        <section className={`lg:col-span-3 flex flex-col gap-6 transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
           <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900/50 p-2 rounded-sm overflow-hidden">
              <div className="flex">
                 {(['psych', 'struct', 'thematic'] as const).map(layer => (
                   <button 
                     key={layer}
                     onClick={() => hasWound && setActiveLayer(layer)}
                     className={`px-6 py-2 text-[9px] uppercase font-bold tracking-widest transition-all ${activeLayer === layer ? 'bg-zinc-900 text-bone' : 'text-zinc-600 hover:text-zinc-400'}`}
                   >
                     {layer}_Layer
                   </button>
                 ))}
              </div>
              <div className="px-4 text-[8px] text-zinc-800 font-bold uppercase tracking-tighter italic">
                 {hasWound ? 'Multiphase Analysis Active' : 'Analysis Standby'}
              </div>
           </div>

           <div className="flex-1 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                 {hasWound ? chapters.map((ch, i) => (
                   <motion.div 
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.3, delay: i * 0.05 }}
                     key={ch.id} 
                     className="bg-zinc-900/10 border border-zinc-900 p-4 flex flex-col min-h-[200px] hover:border-crimson/40 group transition-all cursor-crosshair"
                   >
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-[10px] text-bone font-mono">{ch.id}</span>
                         <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-tighter">{ch.type}</span>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                         {/* Dynamic Layer Visualization */}
                         {activeLayer === 'psych' && (
                           <div className="space-y-1">
                              <span className="text-[8px] text-zinc-600 uppercase font-bold">Mask_Load</span>
                              <div className="h-1 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${ch.maskLoad}%` }}
                                   className="h-full bg-crimson"
                                 />
                              </div>
                           </div>
                         )}

                         {activeLayer === 'struct' && (
                            <div className="space-y-1">
                               <span className="text-[8px] text-zinc-600 uppercase font-bold">Rev_Intensity</span>
                               <div className="flex gap-0.5 h-6">
                                  {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`flex-1 ${i < (ch.intensity/20) ? 'bg-zinc-400/20 border border-zinc-700/50' : 'bg-zinc-950 border border-zinc-900'}`} />
                                  ))}
                               </div>
                            </div>
                         )}
                         
                         <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ul className="text-[8px] text-zinc-500 uppercase font-mono space-y-1">
                               <li className="flex items-center gap-1"><Zap size={8} fill="currentColor" className="text-crimson" /> PROBE ACTIVE</li>
                               <li className="flex items-center gap-1 opacity-50"><Activity size={8} className="text-zinc-600" /> STABLE</li>
                            </ul>
                         </div>
                      </div>
                      
                      <div className="text-[8px] text-zinc-800 uppercase font-bold mt-auto tracking-widest text-center border-t border-zinc-900 pt-2">
                         CHAPTER END_GATE
                      </div>
                   </motion.div>
                 )) : (
                   <div className="col-span-full border border-zinc-900 border-dashed rounded flex flex-col items-center justify-center p-12 opacity-20">
                      <div className="text-[10px] text-zinc-800 font-mono uppercase tracking-[0.5em] mb-4">Laboratory Standby</div>
                      <p className="text-[9px] text-zinc-800 uppercase text-center max-w-xs leading-relaxed">
                        Simulated draft segments will manifest once the psychological architecture is initialized in the Origin Chamber.
                      </p>
                   </div>
                 )}
                 <div className="border border-zinc-900 border-dashed rounded flex items-center justify-center p-8 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group">
                    <span className="text-[10px] text-zinc-700 uppercase font-bold group-hover:text-bone transition-colors">+ NEW CHAPTER SEGMENT</span>
                 </div>
              </AnimatePresence>
           </div>
        </section>

        {/* Diagnostic Terminal */}
        <aside className="space-y-6">
           <div className="bg-[#0a0a0b] border border-zinc-900 rounded p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6 text-zinc-500">
                 <Terminal size={14} />
                 <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Simulation Terminal</span>
              </div>
              <div className="flex-1 p-4 bg-zinc-950/50 border border-zinc-900 font-mono text-[9px] text-zinc-600 leading-relaxed overflow-y-auto">
                 <p className="text-zinc-800">[ SYSTEM_INITIALIZING ]</p>
                 <p className="text-zinc-800">[ LOADING_DRAFT_OBJECTS ]</p>
                 <p className="mb-4 text-zinc-800">[ ANALYZING_REVELATION_DENSITY ]</p>
                 <div className="space-y-2">
                    {hasWound ? (
                      <>
                        <p className="text-bone animate-pulse">#_DIAGNOSTIC: CH_03 INTENSITY PEAK CAUSING PSYCH_SLIPPAGE (85%).</p>
                        <p className="text-crimson">#_ALERT: RECOMMEND_LATENCY_BUFFER_INCREASE_CH_04.</p>
                        <p>#_LOG: STORY_SPINE_SYNCHRONIZED_SUCCESSFULLY.</p>
                        <p>#_LOG: PERIPHERAL_FEED_ESTABLISHED.</p>
                      </>
                    ) : (
                      <p className="text-zinc-800 italic">#_LOG: IDLE_STATE_ACTIVE. AWAITING_NARRATIVE_OBJECTS.</p>
                    )}
                 </div>
              </div>
              <div className={`mt-4 p-4 border border-zinc-900/50 bg-zinc-900/10 transition-opacity ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
                 <div className="flex items-center gap-2 mb-2">
                    <Layers size={12} className="text-zinc-600" />
                    <span className="text-[9px] text-zinc-600 uppercase font-bold">Active Layer</span>
                 </div>
                 <div className="text-[10px] text-bone uppercase tracking-widest font-mono">
                    {activeLayer}_PHASE_MONITOR
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};
