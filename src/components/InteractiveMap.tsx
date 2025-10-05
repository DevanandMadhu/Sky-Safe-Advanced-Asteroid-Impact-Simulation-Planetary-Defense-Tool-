import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface InteractiveMapProps {
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
  impactLocation: { lat: number; lng: number; name: string };
  blastRadii?: {
    severe: string;
    moderate: string;
    light: string;
  };
}

// Major cities and locations database
const locationDatabase = [
  { name: 'New York City', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'Miami', lat: 25.7617, lng: -80.1918 },
  // Ocean and remote locations
  { name: 'Pacific Ocean (Center)', lat: 0, lng: -160 },
  { name: 'Atlantic Ocean (Center)', lat: 0, lng: -30 },
  { name: 'Indian Ocean (Center)', lat: -20, lng: 80 },
  { name: 'Sahara Desert', lat: 23.4162, lng: 25.6628 },
  { name: 'Amazon Rainforest', lat: -3.4653, lng: -62.2159 },
  { name: 'Antarctica', lat: -82.8628, lng: 135.0000 },
  { name: 'Arctic Ocean', lat: 90, lng: 0 },
];

export function InteractiveMap({ onLocationSelect, impactLocation, blastRadii }: InteractiveMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<typeof locationDatabase>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = locationDatabase.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw world map (simplified)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Draw ocean
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw simplified continents
    ctx.fillStyle = '#334155';
    
    // Function to convert lat/lng to canvas coordinates
    const toCanvasCoords = (lat: number, lng: number) => {
      const x = ((lng + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      return { x, y };
    };

    // Draw continents (simplified shapes)
    // North America
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.3);
    ctx.lineTo(width * 0.3, height * 0.25);
    ctx.lineTo(width * 0.32, height * 0.55);
    ctx.lineTo(width * 0.2, height * 0.6);
    ctx.lineTo(width * 0.12, height * 0.45);
    ctx.closePath();
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.28);
    ctx.lineTo(width * 0.55, height * 0.25);
    ctx.lineTo(width * 0.56, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.42);
    ctx.closePath();
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.42);
    ctx.lineTo(width * 0.58, height * 0.4);
    ctx.lineTo(width * 0.62, height * 0.7);
    ctx.lineTo(width * 0.52, height * 0.72);
    ctx.closePath();
    ctx.fill();

    // Asia
    ctx.beginPath();
    ctx.moveTo(width * 0.57, height * 0.25);
    ctx.lineTo(width * 0.85, height * 0.2);
    ctx.lineTo(width * 0.9, height * 0.4);
    ctx.lineTo(width * 0.8, height * 0.55);
    ctx.lineTo(width * 0.6, height * 0.5);
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.moveTo(width * 0.78, height * 0.68);
    ctx.lineTo(width * 0.88, height * 0.65);
    ctx.lineTo(width * 0.87, height * 0.78);
    ctx.lineTo(width * 0.77, height * 0.79);
    ctx.closePath();
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.moveTo(width * 0.28, height * 0.58);
    ctx.lineTo(width * 0.35, height * 0.55);
    ctx.lineTo(width * 0.38, height * 0.8);
    ctx.lineTo(width * 0.3, height * 0.85);
    ctx.closePath();
    ctx.fill();

    // Draw grid lines
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.5;
    
    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 30) {
      const y = ((90 - lat) / 180) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Longitude lines
    for (let lng = -180; lng <= 180; lng += 30) {
      const x = ((lng + 180) / 360) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw blast radii if available
    if (blastRadii) {
      const impactCoords = toCanvasCoords(impactLocation.lat, impactLocation.lng);
      
      // Convert km to pixels (approximate)
      const kmToPixels = (km: number) => {
        const kmPerDegree = 111.32;
        const degrees = km / kmPerDegree;
        return (degrees / 180) * height;
      };

      // Light damage (yellow)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
      ctx.beginPath();
      ctx.arc(impactCoords.x, impactCoords.y, kmToPixels(parseFloat(blastRadii.light)), 0, Math.PI * 2);
      ctx.fill();

      // Moderate damage (orange)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      ctx.arc(impactCoords.x, impactCoords.y, kmToPixels(parseFloat(blastRadii.moderate)), 0, Math.PI * 2);
      ctx.fill();

      // Severe damage (red)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(impactCoords.x, impactCoords.y, kmToPixels(parseFloat(blastRadii.severe)), 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw impact location marker
    const coords = toCanvasCoords(impactLocation.lat, impactLocation.lng);
    
    // Pulsing circle
    ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw crosshair
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(coords.x - 15, coords.y);
    ctx.lineTo(coords.x - 8, coords.y);
    ctx.moveTo(coords.x + 8, coords.y);
    ctx.lineTo(coords.x + 15, coords.y);
    ctx.moveTo(coords.x, coords.y - 15);
    ctx.lineTo(coords.x, coords.y - 8);
    ctx.moveTo(coords.x, coords.y + 8);
    ctx.lineTo(coords.x, coords.y + 15);
    ctx.stroke();

  }, [impactLocation, blastRadii]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lng = (x / canvas.width) * 360 - 180;
    const lat = 90 - (y / canvas.height) * 180;

    onLocationSelect({
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      name: 'Custom Location',
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search for a city or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700"
        />
        
        {filteredLocations.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg max-h-60 overflow-y-auto">
            {filteredLocations.map((location) => (
              <button
                key={`${location.lat}-${location.lng}`}
                onClick={() => {
                  onLocationSelect(location);
                  setSearchQuery('');
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors"
              >
                <p>{location.name}</p>
                <p className="text-xs text-slate-400">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          onClick={handleCanvasClick}
          className="w-full h-auto rounded-lg cursor-crosshair border border-slate-700 max-h-[300px] sm:max-h-[400px]"
        />
        <p className="text-xs text-slate-400 mt-2">
          Click/tap anywhere on the map to select impact location
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLocationSelect({ name: 'New York City', lat: 40.7128, lng: -74.0060 })}
        >
          New York
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLocationSelect({ name: 'Tokyo', lat: 35.6762, lng: 139.6503 })}
        >
          Tokyo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLocationSelect({ name: 'London', lat: 51.5074, lng: -0.1278 })}
          className="col-span-2 sm:col-span-1"
        >
          London
        </Button>
      </div>
    </div>
  );
}