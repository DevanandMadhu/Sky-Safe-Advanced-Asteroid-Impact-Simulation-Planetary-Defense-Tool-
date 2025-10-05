import { useState, useEffect } from 'react';
import { Search, AlertCircle, TrendingUp, MapPin, Menu } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AsteroidOrbitVisualizer } from './AsteroidOrbitVisualizer';
import { NASANewsPanel } from './NASANewsPanel';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { asteroidDatabase } from '../data/asteroidData';

interface AsteroidDashboardProps {
  onSelectAsteroid: (asteroid: any) => void;
  onNavigate: (view: string) => void;
}

export function AsteroidDashboard({ onSelectAsteroid, onNavigate }: AsteroidDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsteroid, setSelectedAsteroid] = useState(asteroidDatabase[0]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredAsteroids = searchQuery 
    ? asteroidDatabase.filter(asteroid =>
        asteroid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asteroid.id.includes(searchQuery)
      )
    : asteroidDatabase;

  const approachData = selectedAsteroid.approachHistory.map(item => ({
    date: item.date,
    distance: item.distance,
  }));

  const handleSelectAsteroid = (asteroid: any) => {
    setSelectedAsteroid(asteroid);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Auto-select first result when searching
  useEffect(() => {
    if (searchQuery && filteredAsteroids.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, filteredAsteroids.length]);

  const getRiskLevel = (probability: number) => {
    if (probability > 0.001) return { level: 'High', color: 'bg-red-500' };
    if (probability > 0.0001) return { level: 'Moderate', color: 'bg-amber-500' };
    return { level: 'Low', color: 'bg-green-500' };
  };

  const risk = getRiskLevel(selectedAsteroid.impactProbability);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      {/* Navigation */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-xl md:text-3xl">SkySafe Dashboard</h1>
          <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs md:text-sm">Live Data</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('education')}>
            Education
          </Button>
          <Button variant="outline" onClick={() => onNavigate('decision')}>
            Decision Support
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left sidebar - Asteroid list */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search asteroids..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700"
              />
            </div>

            {searchQuery && filteredAsteroids.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">No asteroids found matching "{searchQuery}"</p>
              </div>
            )}

            <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
              {filteredAsteroids.map((asteroid) => (
                <div
                  key={asteroid.id}
                  onClick={() => handleSelectAsteroid(asteroid)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedAsteroid.id === asteroid.id
                      ? 'bg-blue-600/30 border border-blue-500'
                      : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm">{asteroid.name}</h4>
                    <Badge 
                      className={`text-xs ${
                        getRiskLevel(asteroid.impactProbability).color
                      }`}
                    >
                      {getRiskLevel(asteroid.impactProbability).level}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">Diameter: {asteroid.diameter}m</p>
                    <p className="text-xs text-slate-400">Velocity: {asteroid.velocity} km/s</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* NASA News Panel */}
          <NASANewsPanel />
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Asteroid details */}
          <Card className="bg-slate-900 border-slate-800 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-3">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl mb-2">{selectedAsteroid.name}</h2>
                <p className="text-slate-400 text-sm md:text-base">{selectedAsteroid.description}</p>
              </div>
              <Button 
                onClick={() => onSelectAsteroid(selectedAsteroid)}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                Simulate Impact
              </Button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Diameter</p>
                <p className="text-xl">{selectedAsteroid.diameter}m</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Velocity</p>
                <p className="text-xl">{selectedAsteroid.velocity} km/s</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Mass</p>
                <p className="text-xl">{selectedAsteroid.mass}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Next Approach</p>
                <p className="text-xl">{selectedAsteroid.nextApproach}</p>
              </div>
            </div>

            {/* Risk assessment */}
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className={`w-5 h-5 ${
                  risk.level === 'High' ? 'text-red-400' :
                  risk.level === 'Moderate' ? 'text-amber-400' :
                  'text-green-400'
                }`} />
                <h3>Risk Assessment: {risk.level}</h3>
              </div>
              <p className="text-slate-400 mb-2">
                Impact Probability: {(selectedAsteroid.impactProbability * 100).toFixed(4)}%
              </p>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${risk.color}`}
                  style={{ width: `${Math.min(selectedAsteroid.impactProbability * 100000, 100)}%` }}
                />
              </div>
            </div>

            {/* Orbital data */}
            <div>
              <h3 className="mb-4">Orbital Characteristics</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-sm">Semi-major Axis</p>
                  <p>{selectedAsteroid.orbit.semiMajorAxis} AU</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-sm">Eccentricity</p>
                  <p>{selectedAsteroid.orbit.eccentricity}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-sm">Orbital Period</p>
                  <p>{selectedAsteroid.orbit.period} days</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Orbit visualization */}
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="mb-4">Orbital Path Visualization</h3>
            <AsteroidOrbitVisualizer asteroid={selectedAsteroid} />
          </Card>

          {/* Approach history chart */}
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="mb-4">Close Approach History</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={approachData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" label={{ value: 'Distance (Million km)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={2} name="Distance from Earth" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}