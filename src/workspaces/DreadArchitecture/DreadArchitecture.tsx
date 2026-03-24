import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { Eye, ShieldAlert, Activity, AlertTriangle } from 'lucide-react';

export const DreadArchitecture = () => {
  const { project } = useWraithStore();

  const beliefLayers = (project.dread as any)?.beliefStack || [
    { label: 'Protagonist Identity', reader: 'Stable', truth: 'Fractured', suspicion: 15 },
    { label: 'The Murders at the Sink', reader: 'Accidental', truth: 'Premeditated', suspicion: 65 },
    { label: 'The Wound Origin', reader: 'Hidden', truth: 'Projected', suspicion: 85 },
  ];


  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full font-mono">
      {/* Header */}
      <header className="mb-12 border border-crimson/20 bg-crimson/5 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/30 rounded-full">
            <Eye size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase italic">Dread Architecture</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Six // Reader Belief Management // {project.wound.slice(0, 20)}...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-4">
              <h3 className="text-[10px] text-crimson uppercase font-bold tracking-widest flex items-center gap-2">
                 <ShieldAlert size={14} /> Reader Belief Model Stack
              </h3>
              <div className="space-y-4">
                 {beliefLayers.map((layer: any, i: number) => (
                   <div key={i} className="p-4 bg-zinc-900/20 border border-zinc-900 group hover:border-crimson/40 transition-all">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] text-bone uppercase tracking-tighter">{layer.label}</span>
                         <span className="text-[8px] text-zinc-600 uppercase">Suspicion: {layer.suspicion}%</span>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-1">
                            <span className="text-[8px] text-zinc-700 uppercase block mb-1">Reader Belief</span>
                            <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">{layer.reader || layer.readerBelief}</span>
                         </div>
                         <div className="flex-1">
                            <span className="text-[8px] text-crimson/50 uppercase block mb-1">Internal Truth</span>
                            <span className="text-[11px] text-crimson font-bold uppercase tracking-widest">{layer.truth}</span>
                         </div>
                      </div>
                      <div className="mt-4 h-0.5 bg-zinc-950 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${layer.suspicion}%` }}
                           className="h-full bg-crimson shadow-[0_0_8px_rgba(153,0,0,0.8)]"
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="flex flex-col gap-6">
              <div className="bg-zinc-900/10 border border-zinc-900 p-6">
                 <h3 className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                    <Activity size={14} /> Dread Calibration
                 </h3>
                 <div className="flex items-end gap-1 h-32 mb-4">
                    {(project.signal?.beliefGap || [20, 45, 30, 85, 60]).map((p: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${p.y || p}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="flex-1 bg-zinc-900 border-x border-zinc-800 relative group"
                      >
                         <div className={`absolute bottom-0 left-0 right-0 bg-crimson/20 group-hover:bg-crimson/40 transition-all`} style={{ height: `${p.y || p}%` }} />
                      </motion.div>
                    ))}
                 </div>
                 <p className="text-[9px] text-zinc-500 uppercase leading-relaxed tracking-wider">
                    Dread peaks coincide with <span className="text-bone italic">belief-ruptures</span>. 
                    Calibration recommends a 15% reduction in suspense markers in CH_04 to avoid fatigue.
                 </p>
              </div>

              <div className="p-4 border border-amber-900/30 bg-amber-900/5 flex items-start gap-3">
                 <AlertTriangle size={16} className="text-amber-600 mt-1 shrink-0" />
                 <div>
                    <span className="text-[9px] text-amber-600 uppercase font-bold tracking-tighter block mb-1">Calibration Alert</span>
                    <p className="text-[9px] text-zinc-400 leading-normal font-mono uppercase">
                       Reader suspicion is exceeding the protagonist's mask load. The twist is at risk of premature collapse.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </header>
    </div>
  );
};
