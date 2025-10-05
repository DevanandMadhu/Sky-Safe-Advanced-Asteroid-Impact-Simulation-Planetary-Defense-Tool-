import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AsteroidDashboard } from './components/AsteroidDashboard';
import { ImpactSimulator } from './components/ImpactSimulator';
import { MitigationStrategies } from './components/MitigationStrategies';
import { EducationalMode } from './components/EducationalMode';
import { DecisionSupport } from './components/DecisionSupport';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'simulator' | 'mitigation' | 'education' | 'decision'>('landing');
  const [selectedAsteroid, setSelectedAsteroid] = useState<any>(null);
  const [simulationData, setSimulationData] = useState<any>(null);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartSimulation={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return (
          <AsteroidDashboard
            onSelectAsteroid={(asteroid) => {
              setSelectedAsteroid(asteroid);
              setCurrentView('simulator');
            }}
            onNavigate={setCurrentView}
          />
        );
      case 'simulator':
        return (
          <ImpactSimulator
            selectedAsteroid={selectedAsteroid}
            onSimulationComplete={(data) => {
              setSimulationData(data);
              setCurrentView('mitigation');
            }}
            onNavigate={setCurrentView}
          />
        );
      case 'mitigation':
        return (
          <MitigationStrategies
            simulationData={simulationData}
            onNavigate={setCurrentView}
          />
        );
      case 'education':
        return <EducationalMode onNavigate={setCurrentView} />;
      case 'decision':
        return (
          <DecisionSupport
            simulationData={simulationData}
            onNavigate={setCurrentView}
          />
        );
      default:
        return <LandingPage onStartSimulation={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="size-full bg-background dark">
      {renderView()}
    </div>
  );
}