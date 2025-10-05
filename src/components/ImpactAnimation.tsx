import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface ImpactAnimationProps {
  simulationResults: any;
}

export function ImpactAnimation({ simulationResults }: ImpactAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.7;

    let frame = 0;
    const totalFrames = 150;
    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw atmosphere gradient
      const atmosphereGradient = ctx.createLinearGradient(0, 0, 0, height);
      atmosphereGradient.addColorStop(0, '#1e293b');
      atmosphereGradient.addColorStop(0.5, '#334155');
      atmosphereGradient.addColorStop(1, '#475569');
      ctx.fillStyle = atmosphereGradient;
      ctx.fillRect(0, 0, width, height * 0.7);

      // Draw ground
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, centerY, width, height - centerY);

      // Animation phases
      const phase1 = Math.min(frame / 50, 1); // Asteroid approaching
      const phase2 = Math.max(0, Math.min((frame - 50) / 30, 1)); // Impact
      const phase3 = Math.max(0, Math.min((frame - 80) / 70, 1)); // Blast wave

      // Phase 1: Asteroid approaching
      if (phase1 < 1) {
        const asteroidY = -100 + (centerY + 100) * phase1;
        const asteroidX = centerX - 200 + 200 * phase1;
        
        // Asteroid trail
        const trailLength = 30;
        for (let i = 0; i < trailLength; i++) {
          const trailPhase = i / trailLength;
          const trailY = asteroidY - (centerY + 100) * phase1 * trailPhase * 0.3;
          const trailX = asteroidX + 200 * phase1 * trailPhase * 0.3;
          
          ctx.fillStyle = `rgba(255, 100, 0, ${(1 - trailPhase) * 0.5})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 8 * (1 - trailPhase), 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Asteroid
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(asteroidX, asteroidY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Asteroid glow
        const asteroidGlow = ctx.createRadialGradient(asteroidX, asteroidY, 15, asteroidX, asteroidY, 35);
        asteroidGlow.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
        asteroidGlow.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = asteroidGlow;
        ctx.beginPath();
        ctx.arc(asteroidX, asteroidY, 35, 0, Math.PI * 2);
        ctx.fill();
      }

      // Phase 2: Impact flash
      if (phase2 > 0 && phase2 < 1) {
        const flashIntensity = Math.sin(phase2 * Math.PI);
        
        // Impact flash
        const impactGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300 * phase2);
        impactGradient.addColorStop(0, `rgba(255, 255, 255, ${flashIntensity})`);
        impactGradient.addColorStop(0.3, `rgba(255, 200, 0, ${flashIntensity * 0.8})`);
        impactGradient.addColorStop(0.6, `rgba(255, 100, 0, ${flashIntensity * 0.4})`);
        impactGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = impactGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Debris particles
        for (let i = 0; i < 50; i++) {
          const angle = (i / 50) * Math.PI * 2;
          const distance = 100 * phase2;
          const debrisX = centerX + Math.cos(angle) * distance;
          const debrisY = centerY + Math.sin(angle) * distance - 50 * phase2;
          
          ctx.fillStyle = `rgba(139, 69, 19, ${1 - phase2})`;
          ctx.beginPath();
          ctx.arc(debrisX, debrisY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Phase 3: Blast wave and crater
      if (phase3 > 0) {
        // Crater
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 80 * phase3, 30 * phase3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Blast wave rings
        for (let i = 0; i < 5; i++) {
          const ringPhase = Math.max(0, phase3 - i * 0.15);
          const ringRadius = 300 * ringPhase;
          const opacity = (1 - ringPhase) * 0.5;
          
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Mushroom cloud
        const cloudHeight = 200 * phase3;
        const cloudTop = centerY - cloudHeight;
        
        // Stem
        ctx.fillStyle = `rgba(100, 100, 100, ${phase3 * 0.7})`;
        ctx.fillRect(centerX - 20, centerY - cloudHeight, 40, cloudHeight);
        
        // Top of mushroom
        const mushroomGradient = ctx.createRadialGradient(
          centerX, cloudTop, 0,
          centerX, cloudTop, 100 * phase3
        );
        mushroomGradient.addColorStop(0, `rgba(150, 150, 150, ${phase3 * 0.9})`);
        mushroomGradient.addColorStop(0.5, `rgba(100, 100, 100, ${phase3 * 0.7})`);
        mushroomGradient.addColorStop(1, `rgba(70, 70, 70, ${phase3 * 0.3})`);
        ctx.fillStyle = mushroomGradient;
        ctx.beginPath();
        ctx.arc(centerX, cloudTop, 100 * phase3, 0, Math.PI * 2);
        ctx.fill();
        
        // Ground damage effects
        const damageRadius = 250 * phase3;
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI;
          const distance = damageRadius * (0.5 + Math.random() * 0.5);
          const x = centerX + Math.cos(angle) * distance;
          
          ctx.strokeStyle = `rgba(239, 68, 68, ${(1 - phase3) * 0.3})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, centerY);
          ctx.stroke();
        }
      }

      frame++;
      if (frame < totalFrames) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [simulationResults]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full bg-slate-950 rounded-lg"
      />
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Phase 1:</span>
          <span>Atmospheric Entry</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Phase 2:</span>
          <span>Impact & Flash</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Phase 3:</span>
          <span>Blast Wave & Mushroom Cloud</span>
        </div>
      </div>
    </motion.div>
  );
}