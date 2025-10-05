import { Shield, Satellite, AlertTriangle, Target } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartSimulation: () => void;
}

export function LandingPage({ onStartSimulation }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden overflow-x-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl">SkySafe</h1>
          </div>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Advanced Asteroid Impact Simulation & Planetary Defense Tool
          </p>
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="max-w-4xl mx-auto mb-8 px-4">
            <p className="text-sm md:text-lg text-slate-300 mb-6">
              Over 30,000 near-Earth asteroids have been discovered, with new ones detected every week. 
              SkySafe provides scientists, decision-makers, and the public with powerful tools to understand, 
              simulate, and prepare for potential asteroid impacts.
            </p>
            <Button 
              onClick={onStartSimulation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 md:px-8 md:py-6 text-lg md:text-xl rounded-lg w-full sm:w-auto"
            >
              Start Simulation
            </Button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4"
        >
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 md:p-6">
            <Satellite className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mb-3 md:mb-4" />
            <h3 className="mb-2 text-base md:text-lg">Real Asteroid Data</h3>
            <p className="text-slate-400 text-sm md:text-base">
              Access live NASA data on near-Earth asteroids, including size, velocity, orbit, and impact probability.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 md:p-6">
            <Target className="w-8 h-8 md:w-10 md:h-10 text-red-400 mb-3 md:mb-4" />
            <h3 className="mb-2 text-base md:text-lg">Impact Simulation</h3>
            <p className="text-slate-400 text-sm md:text-base">
              Simulate asteroid impacts anywhere on Earth with real-time predictions of crater size, blast radius, and casualties.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 md:p-6 sm:col-span-2 md:col-span-1">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-green-400 mb-3 md:mb-4" />
            <h3 className="mb-2 text-base md:text-lg">Mitigation Strategies</h3>
            <p className="text-slate-400 text-sm md:text-base">
              Evaluate defense options including nuclear deflection, kinetic impactors, and gravity tractors.
            </p>
          </div>
        </motion.div>

        {/* Risk awareness */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 rounded-lg px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <p className="text-amber-200">
              Last major impact: 2013 Chelyabinsk meteor (20m diameter, 500 kilotons)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}