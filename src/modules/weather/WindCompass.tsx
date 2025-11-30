import { MoveUp } from 'lucide-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface WindCompassProps {
  windspeed: number;
  winddirection: number;
  units: string;
}

const NUM_MARKERS = 108;
const markers = Array.from({ length: NUM_MARKERS });

const WindCompass: React.FC<WindCompassProps> = ({ windspeed, winddirection, units }) => {
  return (
    <div className="relative flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-white shadow-xl">
      {/* 1. Scale (108 markers) */}
      {markers.map((_, index) => {
        const rotation = index * (360 / NUM_MARKERS);

        // Determine if the marker is a primary one (every 40 degrees) for a slightly thicker line
        const isPrimary = index % (360 / 40) === 0;

        return (
          <div key={index} className="absolute h-full w-full" style={{ transform: `rotate(${rotation}deg)` }}>
            <div
              className={twMerge(
                'absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-white opacity-40',
                isPrimary ? 'h-2 w-0.5' : 'h-1 w-px',
              )}
            />
          </div>
        );
      })}

      {/* 2. Letters of the cardinal directions (Compass) */}
      {/* N (North - 0°) */}
      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-red-500">N</span>
      {/* E (East - 90°) */}
      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-sm font-semibold text-slate-300">E</span>
      {/* S (South - 180°) */}
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-300">S</span>
      {/* W (West - 270°) */}
      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-sm font-semibold text-slate-300">W</span>

      {/* 3. Digital values (Center) */}
      <div className="absolute z-10 flex flex-col items-center">
        <span className="text-xl font-extrabold">{windspeed.toFixed(1)}</span>
        <span className="text-sm font-light opacity-80">{units}</span>
      </div>

      {/* 4. Arrow (Wind direction) */}
      <div
        className="absolute z-20 origin-center transition-transform duration-500"
        style={{ transform: `rotate(${winddirection - 180}deg)` }}
      >
        <MoveUp size={24} className="-mt-15 text-white drop-shadow-lg" />
      </div>
    </div>
  );
};

export default WindCompass;
