import { useWraithStore } from '../../store/useWraithStore';
import type { Chapter } from '../../store/useWraithStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Layers, Terminal, Activity, Zap, Edit3, Eye, Sparkles, ChevronLeft, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { api } from '../../services/api';

export const ChapterLaboratory = () => {
  const { project, activeChapterId, setActiveChapter, updateChapter, addChapter } = useWraithStore();
  const [viewMode, setViewMode] = useState<'analysis' | 'compose'>('analysis');
  const [activeLayer, setActiveLayer] = useState<'psych' | 'struct' | 'thematic'>('psych');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const hasWound = project.wound.trim().length > 0;
  const chapters = project.chapters || [];
  const activeChapter = useMemo(() => 
    chapters.find(c => c.id === activeChapterId), 
    [chapters, activeChapterId]
  );

  const handleGenerate = async () => {
    if (!hasWound) return;
    setIsGenerating(true);
    try {
      // In a real scenario, this would call LongCat with the project context
      // For this implementation, we simulate the AI response based on the project data
      const response = await api.generateChapter(project.id, {
        wound: project.wound,
        pressures: project.pressures,
        compass: project.compass
      });
      
      const generatedProse = response?.content || `The weight of the ${project.pressures[0] || 'silence'} pressed against them. It wasn't the sound that hurt, but the implication of what came after. ${project.wound}... it was a signature written in blood on the interior of their skull.`;
      
      if (activeChapter) {
        await updateChapter(activeChapter.id, { content: generatedProse });
      } else {
        await addChapter({
          title: `Segment ${chapters.length + 1}`,
          content: generatedProse,
          type: 'Draft Segment',
          metrics: { intensity: 45, maskLoad: 30 }
        });
      }
    } catch (err) {
      console.error('Generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewChapter = async () => {
    await addChapter({
      title: `New Segment`,
      content: '',
      type: 'Neutral',
      metrics: { intensity: 10, maskLoad: 5 }
    });
    setViewMode('compose');
  };

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full workspace-content-padding">
      {/* Workspace Header */}
      <header className="mb-8 flex justify-between items-start border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Beaker size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase italic">Chapter Laboratory</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Five // {viewMode === 'analysis' ? 'Diagnostic Overview' : 'Neural Composition'} // {hasWound ? 'Initialized' : 'Standby'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
           {viewMode === 'compose' && (
             <button 
               onClick={() => setViewMode('analysis')}
               className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all"
             >
                <ChevronLeft size={12} /> Back to Lab
             </button>
           )}
           <button 
             onClick={handleGenerate}
             disabled={!hasWound || isGenerating}
             className="flex items-center gap-2 px-4 py-2 bg-crimson text-bone font-bold text-[10px] uppercase tracking-widest hover:bg-crimson/80 transition-all border border-crimson/20 disabled:opacity-20"
           >
              {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} fill="currentColor" />}
              {activeLayer === 'psych' ? 'Simulate Interiority' : 'Generate Manifestation'}
           </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
        {/* Main Section */}
        <section className={`lg:col-span-3 flex flex-col gap-6 transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
           
           {viewMode === 'analysis' ? (
             <>
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
               </div>

               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-2">
                  <AnimatePresence mode="popLayout">
                     {chapters.map((ch, i) => (
                       <motion.div 
                         layout
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         key={ch.id} 
                         onClick={() => { setActiveChapter(ch.id); setViewMode('compose'); }}
                         className={`bg-zinc-900/10 border p-6 flex flex-col min-h-[180px] transition-all cursor-pointer group ${activeChapterId === ch.id ? 'border-crimson bg-zinc-900/20' : 'border-zinc-900 hover:border-zinc-700'}`}
                       >
                          <div className="flex justify-between items-center mb-6">
                             <span className="text-[10px] text-bone font-mono">{ch.id}</span>
                             <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-tighter italic">{ch.type}</span>
                          </div>
                          
                          <h3 className="text-bone font-bold text-sm mb-4 uppercase tracking-tight">{ch.title}</h3>
                          
                          <div className="flex-1">
                             <p className="text-[10px] text-zinc-600 line-clamp-3 italic mb-4">
                               {ch.content || 'Awaiting simulation output...'}
                             </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
                             <div className="flex gap-1">
                                {[...Array(3)].map((_, idx) => (
                                  <div key={idx} className={`w-1 h-1 rounded-full ${idx < ((ch.metrics?.intensity || 0) / 3) ? 'bg-crimson' : 'bg-zinc-800'}`} />
                                ))}
                             </div>
                             <Edit3 size={10} className="text-zinc-700 group-hover:text-bone transition-colors" />
                          </div>
                       </motion.div>
                     ))}

                     <motion.div 
                        layout
                        onClick={handleNewChapter}
                        className="border border-zinc-900 border-dashed rounded flex flex-col items-center justify-center p-8 opacity-40 hover:opacity-100 transition-all cursor-pointer group hover:bg-zinc-900/5 min-h-[180px]"
                     >
                        <Zap size={16} className="text-zinc-700 mb-2 group-hover:text-crimson transition-colors" />
                        <span className="text-[9px] text-zinc-700 uppercase font-bold tracking-widest group-hover:text-bone transition-colors">+ INJECT NEW SEGMENT</span>
                     </motion.div>
                  </AnimatePresence>
               </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-900 bg-zinc-900/20">
                   <div className="flex items-center gap-4">
                      <input 
                        value={activeChapter?.title || ''}
                        onChange={(e) => activeChapter && updateChapter(activeChapter.id, { title: e.target.value })}
                        className="bg-transparent text-bone font-bold uppercase tracking-widest text-[11px] focus:outline-none border-b border-transparent focus:border-crimson transition-all"
                        placeholder="SEGMENT_IDENTIFIER"
                      />
                      <span className="text-zinc-800 text-[9px] px-2 py-0.5 border border-zinc-900 rounded-full font-mono uppercase">
                        {activeChapter?.id} // Neural_Write_Active
                      </span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-[8px] text-zinc-600 font-bold uppercase">Cloud_Sync</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex-1 relative group p-12">
                   <textarea 
                     value={activeChapter?.content || ''}
                     onChange={(e) => activeChapter && updateChapter(activeChapter.id, { content: e.target.value })}
                     className="w-full h-full bg-transparent text-bone/90 font-serif text-lg leading-relaxed resize-none focus:outline-none placeholder:text-zinc-900 transition-all selection:bg-crimson/30"
                     placeholder="Begin the manifestation of the void here..."
                     spellCheck={false}
                   />
                   
                   {/* Minimalist Editor Overlay */}
                   <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-bone rounded-full transition-all" title="Focus Mode">
                         <Eye size={12} />
                      </button>
                      <button className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-bone rounded-full transition-all" title="Layer Overlay">
                         <Layers size={12} />
                      </button>
                   </div>
                </div>

                <div className="px-8 py-3 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center">
                   <div className="flex gap-8">
                      <div className="flex flex-col">
                         <span className="text-[7px] text-zinc-700 uppercase font-black tracking-widest">Word_Count</span>
                         <span className="text-[10px] text-zinc-500 font-mono">{(activeChapter?.content || '').split(/\s+/).filter(x => x).length}</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[7px] text-zinc-700 uppercase font-black tracking-widest">Psych_Resonance</span>
                         <span className="text-[10px] text-zinc-500 font-mono">{(activeChapter?.content || '').length % 100}%</span>
                      </div>
                   </div>
                   <button 
                     onClick={handleGenerate}
                     disabled={isGenerating}
                     className="flex items-center gap-2 text-crimson text-[9px] uppercase font-bold tracking-[0.2em] hover:text-white transition-all disabled:opacity-20"
                   >
                     {isGenerating ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />} CONTINUATION_AI_ASSIST
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* Diagnostic Terminal */}
        <aside className="space-y-6 flex flex-col h-full max-h-[calc(100vh-250px)]">
           <div className="bg-[#0a0a0b] border border-zinc-900 rounded p-6 flex-1 flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-6 text-zinc-500 shrink-0">
                 <Terminal size={14} />
                 <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Cortex Log</span>
              </div>
              <div className="flex-1 p-4 bg-zinc-950/50 border border-zinc-900 font-mono text-[9px] text-zinc-600 leading-relaxed overflow-y-auto">
                 <p className="text-zinc-800">[ NEURAL_ESTABLISHED ]</p>
                 <p className="text-zinc-800 italic">#_LOG: MONITORING_SEMAPHORES...</p>
                 <div className="space-y-4 mt-4">
                    {hasWound && activeChapter ? (
                      <>
                        <div className="border-l border-crimson pl-3 py-1 bg-crimson/5">
                           <p className="text-bone uppercase text-[8px] font-bold mb-1">Psych_Slippage Detected</p>
                           <p className="leading-tight">Chapter content length implies high mask load. Character transition may be abrupt.</p>
                        </div>
                        <div className="border-l border-zinc-800 pl-3 py-1">
                           <p className="text-zinc-500 uppercase text-[8px] font-bold mb-1">Structural Feedback</p>
                           <p className="leading-tight text-zinc-500 font-mono italic text-[8px] opacity-70">"The sentence structure in paragraph 2 mirrors the behavioral dread defined in Workspace One."</p>
                        </div>
                        <p className="text-[8px] text-zinc-700">#_TRACE: Memory buffer cleared. Syncing with Draft Spine.</p>
                        <p className="text-bone animate-pulse">#_DIAGNOSTIC: REVELATION_PEAK (72%).</p>
                      </>
                    ) : (
                      <p className="text-zinc-800 italic">#_LOG: IDLE_STATE_ACTIVE. AWAITING_NARRATIVE_OBJECTS.</p>
                    )}
                 </div>
              </div>
              <div className={`mt-4 p-4 border border-zinc-900/50 bg-zinc-900/10 transition-opacity shrink-0 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
                 <div className="flex items-center gap-2 mb-2">
                    <Activity size={12} className="text-zinc-600" />
                    <span className="text-[9px] text-zinc-600 uppercase font-bold">Telemetry</span>
                 </div>
                 <div className="text-[10px] text-bone uppercase tracking-widest font-mono">
                    {viewMode === 'compose' ? 'Write_Active' : 'Overview_Mode'}
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};
