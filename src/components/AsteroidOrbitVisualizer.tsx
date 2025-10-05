import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface AsteroidOrbitVisualizerProps {
  asteroid: any;
}

export function AsteroidOrbitVisualizer({ asteroid }: AsteroidOrbitVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrame: number;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Sun
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Draw Sun glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 35);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Draw Earth's orbit
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Earth
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX + 100, centerY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw asteroid's orbit
      const a = asteroid.orbit.semiMajorAxis * 100; // semi-major axis
      const e = asteroid.orbit.eccentricity; // eccentricity
      const b = a * Math.sqrt(1 - e * e); // semi-minor axis

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw asteroid
      const asteroidX = centerX + a * Math.cos(angle);
      const asteroidY = centerY + b * Math.sin(angle);

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw asteroid glow
      const asteroidGlow = ctx.createRadialGradient(asteroidX, asteroidY, 6, asteroidX, asteroidY, 15);
      asteroidGlow.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
      asteroidGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = asteroidGlow;
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Draw trajectory line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(asteroidX, asteroidY);
      
      for (let i = 0; i < 50; i++) {
        const futureAngle = angle + (i * 0.05);
        const futureX = centerX + a * Math.cos(futureAngle);
        const futureY = centerY + b * Math.sin(futureAngle);
        ctx.lineTo(futureX, futureY);
      }
      ctx.stroke();

      // Legend
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('Sun', centerX - 20, centerY - 25);
      ctx.fillText('Earth', centerX + 110, centerY - 10);
      ctx.fillText(asteroid.name, asteroidX + 10, asteroidY - 10);

      angle += 0.01;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [asteroid]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="bg-slate-950 rounded-lg"
      />
    </div>
  );
}