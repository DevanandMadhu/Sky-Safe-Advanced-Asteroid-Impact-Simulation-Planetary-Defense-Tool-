import { useState } from 'react';
import { MapPin, Zap, AlertTriangle, Waves, Wind } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { InteractiveMap } from './InteractiveMap';
import { ImpactAnimation } from './ImpactAnimation';
import { Badge } from './ui/badge';

interface ImpactSimulatorProps {
  selectedAsteroid: any;
  onSimulationComplete: (data: any) => void;
  onNavigate: (view: string) => void;
}

export function ImpactSimulator({ selectedAsteroid, onSimulationComplete, onNavigate }: ImpactSimulatorProps) {
  const [impactLocation, setImpactLocation] = useState({ lat: 40.7128, lng: -74.0060, name: 'New York City' });
  const [asteroidSize, setAsteroidSize] = useState(selectedAsteroid?.diameter || 500);
  const [velocity, setVelocity] = useState(selectedAsteroid?.velocity || 20);
  const [angle, setAngle] = useState(45);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const calculateImpact = () => {
    // Physics calculations for impact
    const mass = (4/3) * Math.PI * Math.pow(asteroidSize / 2, 3) * 2500; // kg (assuming 2500 kg/m³ density)
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2); // Joules
    const megatons = kineticEnergy / (4.184 * Math.pow(10, 15)); // Convert to megatons of TNT
    
    // Crater calculations
    const craterDiameter = 1.8 * Math.pow(kineticEnergy / Math.pow(10, 12), 0.29); // km
    
    // Blast radius calculations
    const severeBlastRadius = Math.pow(megatons, 0.33) * 2.2; // km
    const moderateBlastRadius = Math.pow(megatons, 0.33) * 5.5; // km
    const lightBlastRadius = Math.pow(megatons, 0.33) * 11; // km
    
    // Seismic effects (Richter scale approximation)
    const richterScale = 0.67 * Math.log10(megatons) + 5.87;
    
    // Population estimate (simplified - would use real population density data)
    const severePopulation = Math.floor(Math.PI * Math.pow(severeBlastRadius, 2) * 5000 * Math.random());
    const moderatePopulation = Math.floor(Math.PI * Math.pow(moderateBlastRadius, 2) * 3000 * Math.random());
    const lightPopulation = Math.floor(Math.PI * Math.pow(lightBlastRadius, 2) * 1000 * Math.random());
    
    const results = {
      location: impactLocation,
      asteroidSize,
      velocity,
      angle,
      mass: mass.toExponential(2),
      energyMegatons: megatons.toFixed(2),
      energyJoules: kineticEnergy.toExponential(2),
      craterDiameter: craterDiameter.toFixed(2),
      craterDepth: (craterDiameter * 0.3).toFixed(2),
      blastRadii: {
        severe: severeBlastRadius.toFixed(2),
        moderate: moderateBlastRadius.toFixed(2),
        light: lightBlastRadius.toFixed(2),
      },
      casualties: {
        severe: severePopulation,
        moderate: moderatePopulation,
        light: lightPopulation,
        total: severePopulation + moderatePopulation + lightPopulation,
      },
      seismic: {
        magnitude: richterScale.toFixed(1),
        description: richterScale > 8 ? 'Catastrophic' : richterScale > 7 ? 'Major' : richterScale > 6 ? 'Strong' : 'Moderate',
      },
      atmospheric: {
        dustVolume: (Math.pow(craterDiameter, 3) * 0.2).toFixed(2),
        climateImpact: megatons > 100000 ? 'Global Winter' : megatons > 10000 ? 'Regional Climate Change' : megatons > 1000 ? 'Local Effects' : 'Minimal',
      },
    };

    setSimulationResults(results);
    setShowAnimation(true);
    
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <Button variant="outline" onClick={() => onNavigate('dashboard')} className="mb-2">
            ← Back to Dashboard
          </Button>
          <h1 className="text-xl md:text-3xl">Impact Simulator</h1>
          {selectedAsteroid && (
            <p className="text-slate-400 text-sm md:text-base">Simulating: {selectedAsteroid.name}</p>
          )}
        </div>
        {simulationResults && (
          <Button 
            onClick={() => onSimulationComplete(simulationResults)} 
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            Continue to Mitigation
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left: Controls */}
        <div className="space-y-4 md:space-y-6">
          <Card className="bg-slate-900 border-slate-800 p-4 md:p-6">
            <h3 className="mb-4 text-base md:text-lg">Impact Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <Label>Asteroid Diameter: {asteroidSize}m</Label>
                <Slider
                  value={[asteroidSize]}
                  onValueChange={(values) => setAsteroidSize(values[0])}
                  min={10}
                  max={10000}
                  step={10}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Velocity: {velocity} km/s</Label>
                <Slider
                  value={[velocity]}
                  onValueChange={(values) => setVelocity(values[0])}
                  min={5}
                  max={70}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Entry Angle: {angle}°</Label>
                <Slider
                  value={[angle]}
                  onValueChange={(values) => setAngle(values[0])}
                  min={15}
                  max={90}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <h4>Impact Location</h4>
                </div>
                <p className="text-slate-400 mb-2">{impactLocation.name}</p>
                <p className="text-sm text-slate-500">
                  Lat: {impactLocation.lat.toFixed(4)}, Lng: {impactLocation.lng.toFixed(4)}
                </p>
              </div>

              <Button 
                onClick={calculateImpact}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Calculate Impact
              </Button>
            </div>
          </Card>

          {/* Results */}
          {simulationResults && (
            <Card className="bg-slate-900 border-slate-800 p-4 md:p-6">
              <h3 className="mb-4 text-base md:text-lg">Impact Results</h3>
              
              <div className="space-y-4">
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-4">
                  <h4 className="text-red-400 mb-2">Energy Released</h4>
                  <p className="text-2xl">{simulationResults.energyMegatons} Megatons</p>
                  <p className="text-sm text-slate-400 mt-1">
                    ({simulationResults.energyJoules} Joules)
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="mb-2">Crater Dimensions</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-400">Diameter</p>
                      <p>{simulationResults.craterDiameter} km</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Depth</p>
                      <p>{simulationResults.craterDepth} km</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="mb-3">Blast Radius</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Severe Damage</span>
                      <Badge className="bg-red-600">{simulationResults.blastRadii.severe} km</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate Damage</span>
                      <Badge className="bg-amber-600">{simulationResults.blastRadii.moderate} km</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Light Damage</span>
                      <Badge className="bg-yellow-600">{simulationResults.blastRadii.light} km</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/50 border border-amber-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h4 className="text-amber-400">Estimated Casualties</h4>
                  </div>
                  <p className="text-2xl">{simulationResults.casualties.total.toLocaleString()}</p>
                  <p className="text-sm text-slate-400 mt-2">
                    Severe: {simulationResults.casualties.severe.toLocaleString()} | 
                    Moderate: {simulationResults.casualties.moderate.toLocaleString()} | 
                    Light: {simulationResults.casualties.light.toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="w-5 h-5 text-blue-400" />
                    <h4>Seismic Effects</h4>
                  </div>
                  <p>Magnitude: {simulationResults.seismic.magnitude}</p>
                  <p className="text-sm text-slate-400">{simulationResults.seismic.description}</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-purple-400" />
                    <h4>Atmospheric Effects</h4>
                  </div>
                  <p className="text-sm mb-1">Dust Volume: {simulationResults.atmospheric.dustVolume} km³</p>
                  <p className="text-sm text-slate-400">{simulationResults.atmospheric.climateImpact}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right: Map and Animation */}
        <div className="space-y-4 md:space-y-6">
          <Card className="bg-slate-900 border-slate-800 p-4 md:p-6">
            <h3 className="mb-4 text-base md:text-lg">Select Impact Location</h3>
            <InteractiveMap 
              onLocationSelect={setImpactLocation}
              impactLocation={impactLocation}
              blastRadii={simulationResults?.blastRadii}
            />
          </Card>

          {showAnimation && (
            <Card className="bg-slate-900 border-slate-800 p-4 md:p-6">
              <h3 className="mb-4 text-base md:text-lg">Impact Animation</h3>
              <ImpactAnimation simulationResults={simulationResults} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}