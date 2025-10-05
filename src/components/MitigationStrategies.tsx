import { useState } from 'react';
import { Rocket, Zap, Magnet, Users, DollarSign, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface MitigationStrategiesProps {
  simulationData: any;
  onNavigate: (view: string) => void;
}

const mitigationOptions = [
  {
    id: 'nuclear',
    name: 'Nuclear Deflection',
    icon: Zap,
    description: 'Use a nuclear explosion near the asteroid to vaporize material and create thrust.',
    successRate: 85,
    timeRequired: '6-12 months',
    cost: '$5-10 billion',
    advantages: [
      'High energy output',
      'Effective for large asteroids',
      'Well-understood technology',
      'Can work with short warning time',
    ],
    disadvantages: [
      'Risk of fragmentation',
      'Political/regulatory challenges',
      'Radiation concerns',
      'Requires international cooperation',
    ],
    requirements: [
      { name: 'Warning time', value: 6, unit: 'months' },
      { name: 'Asteroid size range', value: '100m - 10km', unit: '' },
      { name: 'Technology readiness', value: 7, unit: '/10' },
    ],
  },
  {
    id: 'kinetic',
    name: 'Kinetic Impactor',
    icon: Rocket,
    description: 'Crash a spacecraft into the asteroid at high velocity to change its trajectory.',
    successRate: 75,
    timeRequired: '1-3 years',
    cost: '$300-500 million',
    advantages: [
      'Proven technology (NASA DART)',
      'No radioactive materials',
      'Relatively low cost',
      'Minimal fragmentation risk',
    ],
    disadvantages: [
      'Requires long warning time',
      'Less effective for larger asteroids',
      'Single-mission approach',
      'Trajectory calculations must be precise',
    ],
    requirements: [
      { name: 'Warning time', value: 12, unit: 'months' },
      { name: 'Asteroid size range', value: '50m - 500m', unit: '' },
      { name: 'Technology readiness', value: 9, unit: '/10' },
    ],
  },
  {
    id: 'gravity',
    name: 'Gravity Tractor',
    icon: Magnet,
    description: 'Station a spacecraft near the asteroid to use gravitational pull to slowly alter its orbit.',
    successRate: 70,
    timeRequired: '5-10 years',
    cost: '$2-3 billion',
    advantages: [
      'No impact or explosion needed',
      'Highly controlled deflection',
      'No fragmentation risk',
      'Can be combined with other methods',
    ],
    disadvantages: [
      'Requires very long warning time',
      'Slow deflection process',
      'High mission duration',
      'Only effective for smaller asteroids',
    ],
    requirements: [
      { name: 'Warning time', value: 60, unit: 'months' },
      { name: 'Asteroid size range', value: '20m - 200m', unit: '' },
      { name: 'Technology readiness', value: 6, unit: '/10' },
    ],
  },
  {
    id: 'evacuation',
    name: 'Mass Evacuation',
    icon: Users,
    description: 'Evacuate populations from predicted impact zones and establish emergency protocols.',
    successRate: 60,
    timeRequired: '3-12 months',
    cost: '$10-50 billion',
    advantages: [
      'Saves lives directly',
      'Works when deflection fails',
      'Can be combined with any deflection',
      'Improves emergency preparedness',
    ],
    disadvantages: [
      'Massive logistical challenge',
      'High economic disruption',
      'Cannot prevent impact damage',
      'May cause panic',
    ],
    requirements: [
      { name: 'Warning time', value: 3, unit: 'months' },
      { name: 'Population affected', value: '100k+', unit: '' },
      { name: 'Infrastructure readiness', value: 5, unit: '/10' },
    ],
  },
];

export function MitigationStrategies({ simulationData, onNavigate }: MitigationStrategiesProps) {
  const [selectedStrategy, setSelectedStrategy] = useState(mitigationOptions[0]);
  const [implementationPhase, setImplementationPhase] = useState(0);

  const handleImplementStrategy = () => {
    setImplementationPhase(1);
    
    // Simulate implementation phases
    setTimeout(() => setImplementationPhase(2), 1500);
    setTimeout(() => setImplementationPhase(3), 3000);
    setTimeout(() => setImplementationPhase(4), 4500);
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <Button variant="outline" onClick={() => onNavigate('simulator')} className="mb-2">
            ← Back to Simulator
          </Button>
          <h1 className="text-xl md:text-3xl">Mitigation Strategies</h1>
          <p className="text-slate-400 text-sm md:text-base">Evaluate defense options to prevent impact</p>
        </div>
        <Button onClick={() => onNavigate('decision')} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          Decision Support →
        </Button>
      </div>

      {/* Impact Summary */}
      {simulationData && (
        <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
          <h3 className="mb-4">Impact Scenario Summary</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Location</p>
              <p>{simulationData.location.name}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Energy</p>
              <p>{simulationData.energyMegatons} MT</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Blast Radius</p>
              <p>{simulationData.blastRadii.severe} km</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Est. Casualties</p>
              <p className="text-red-400">{simulationData.casualties.total.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Strategy Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h3>Available Strategies</h3>
          {mitigationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                onClick={() => setSelectedStrategy(option)}
                className={`cursor-pointer transition-all ${
                  selectedStrategy.id === option.id
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-blue-400" />
                      <h4>{option.name}</h4>
                    </div>
                    <Badge className={getSuccessRateColor(option.successRate)}>
                      {option.successRate}%
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{option.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Strategy Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const Icon = selectedStrategy.icon;
                    return <Icon className="w-8 h-8 text-blue-400" />;
                  })()}
                  <h2>{selectedStrategy.name}</h2>
                </div>
                <p className="text-slate-400">{selectedStrategy.description}</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <p className="text-sm text-slate-400">Success Rate</p>
                </div>
                <p className={`text-2xl ${getSuccessRateColor(selectedStrategy.successRate)}`}>
                  {selectedStrategy.successRate}%
                </p>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-slate-400">Time Required</p>
                </div>
                <p className="text-xl">{selectedStrategy.timeRequired}</p>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <p className="text-sm text-slate-400">Estimated Cost</p>
                </div>
                <p className="text-xl">{selectedStrategy.cost}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h4 className="mb-3">Requirements</h4>
              <div className="space-y-3">
                {selectedStrategy.requirements.map((req, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{req.name}</span>
                      <span className="text-blue-400">{req.value} {req.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages & Disadvantages */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="mb-3 text-green-400">Advantages</h4>
                <ul className="space-y-2">
                  {selectedStrategy.advantages.map((adv, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="mb-3 text-red-400">Disadvantages</h4>
                <ul className="space-y-2">
                  {selectedStrategy.disadvantages.map((dis, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Implementation Button */}
            <Button 
              onClick={handleImplementStrategy}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={implementationPhase > 0}
            >
              {implementationPhase === 0 ? 'Simulate Implementation' : 'Implementing...'}
            </Button>
          </Card>

          {/* Implementation Progress */}
          {implementationPhase > 0 && (
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="mb-4">Implementation Progress</h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${implementationPhase >= 1 ? 'bg-blue-900/30 border border-blue-700' : 'bg-slate-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span>Phase 1: Mission Planning</span>
                    {implementationPhase >= 1 && <Badge className="bg-blue-600">Complete</Badge>}
                  </div>
                  {implementationPhase >= 1 && (
                    <Progress value={100} className="h-2" />
                  )}
                </div>

                <div className={`p-4 rounded-lg ${implementationPhase >= 2 ? 'bg-blue-900/30 border border-blue-700' : 'bg-slate-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span>Phase 2: Launch & Transit</span>
                    {implementationPhase >= 2 && <Badge className="bg-blue-600">Complete</Badge>}
                  </div>
                  {implementationPhase >= 2 && (
                    <Progress value={100} className="h-2" />
                  )}
                </div>

                <div className={`p-4 rounded-lg ${implementationPhase >= 3 ? 'bg-blue-900/30 border border-blue-700' : 'bg-slate-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span>Phase 3: Execution</span>
                    {implementationPhase >= 3 && <Badge className="bg-blue-600">Complete</Badge>}
                  </div>
                  {implementationPhase >= 3 && (
                    <Progress value={100} className="h-2" />
                  )}
                </div>

                <div className={`p-4 rounded-lg ${implementationPhase >= 4 ? 'bg-green-900/30 border border-green-700' : 'bg-slate-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span>Phase 4: Verification</span>
                    {implementationPhase >= 4 && <Badge className="bg-green-600">Success</Badge>}
                  </div>
                  {implementationPhase >= 4 && (
                    <>
                      <Progress value={100} className="h-2" />
                      <p className="text-sm text-green-400 mt-3">
                        ✓ Trajectory successfully altered. Impact probability reduced to 0.001%
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}