import { LeftRail } from './components/LeftRail';
import { Peripheral } from './components/Peripheral';
import { DraftSpine } from './components/DraftSpine';
import { useWraithStore } from './store/useWraithStore';
import { OriginChamber } from './workspaces/OriginChamber/OriginChamber';
import { SignalRoom } from './workspaces/SignalRoom/SignalRoom';
import { PsycheEngine } from './workspaces/PsycheEngine/PsycheEngine';
import { StructuralCortex } from './workspaces/StructuralCortex/StructuralCortex';
import { SentenceRadar } from './workspaces/SentenceRadar/SentenceRadar';
import { ThematicNervousSystem } from './workspaces/ThematicNervousSystem/ThematicNervousSystem';
import { ChapterLaboratory } from './workspaces/ChapterLaboratory/ChapterLaboratory';

function App() {
  const { activeWorkspace, project } = useWraithStore();

  const renderWorkspace = () => {
    // Force Origin Chamber if not complete
    if (!project.isOriginComplete) {
      return <OriginChamber />;
    }

    switch (activeWorkspace) {
      case 'origin': return <OriginChamber />;
      case 'signal': return <SignalRoom />;
      case 'psyche': return <PsycheEngine />;
      case 'cortex': return <StructuralCortex />;
      case 'radar': return <SentenceRadar />;
      case 'thematics': return <ThematicNervousSystem />;
      case 'laboratory': return <ChapterLaboratory />;
      // Placeholders for others
      default: return (
        <div className="flex items-center justify-center h-full text-zinc-700 uppercase tracking-widest text-sm">
          Workspace: {activeWorkspace} [Pending Phase 2]
        </div>
      );
    }
  };

  return (
    <div className="workspace-container bg-charcoal text-bone">
      <LeftRail />
      
      <main className="main-workspace">
        {renderWorkspace()}
      </main>

      <Peripheral />
      
      <DraftSpine />
    </div>
  );
}

export default App;
