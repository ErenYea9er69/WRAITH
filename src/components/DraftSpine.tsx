import { useWraithStore } from '../store/useWraithStore';

export const DraftSpine = () => {
  const { project, activeChapterId, setActiveChapter, setActiveWorkspace, addChapter } = useWraithStore();

  if (!project.isOriginComplete) return null;

  return (
    <footer className="draft-spine h-12 flex items-center overflow-x-auto gap-1 border-t border-zinc-800 bg-[#080809]">
      <div className="px-4 border-r border-zinc-800 h-full flex items-center text-[10px] text-zinc-500 uppercase font-bold tracking-widest bg-zinc-900/40 shrink-0">
        Draft Spine
      </div>
      
      {(project.chapters || []).map((ch) => (
        <div 
          key={ch.id} 
          onClick={() => {
            setActiveChapter(ch.id);
            setActiveWorkspace('laboratory');
          }}
          className={`h-8 min-w-[48px] px-3 border relative group cursor-pointer transition-all flex items-center justify-center ${activeChapterId === ch.id ? 'bg-crimson/10 border-crimson' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'}`}
          title={ch.title}
        >
          {/* Intensity Band */}
          <div 
            className="absolute inset-x-0 bottom-0 bg-crimson opacity-40 group-hover:opacity-100 transition-opacity" 
            style={{ height: `${((ch.metrics?.intensity || 0) / 100) * 100}%`, maxHeight: '100%' }} 
          />
          <div className={`text-[9px] font-mono z-10 transition-colors ${activeChapterId === ch.id ? 'text-bone' : 'text-zinc-600 group-hover:text-zinc-300'}`}>
            {ch.id}
          </div>
        </div>
      ))}

      <div 
        onClick={() => {
          addChapter({ title: 'New Segment', content: '', type: 'Neutral', metrics: { intensity: 10, maskLoad: 5 } });
          setActiveWorkspace('laboratory');
        }}
        className="h-8 min-w-[32px] bg-zinc-900/20 border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 cursor-pointer hover:bg-zinc-800/30 transition-colors shrink-0"
      >
        +
      </div>
    </footer>
  );
};
