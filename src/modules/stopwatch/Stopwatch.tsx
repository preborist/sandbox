import { useState, useEffect, useRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface Lap {
  id: number;
  lapTime: number;
}

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [prevTime, setPrevTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Formatting time mm:ss:ms
  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    const currentLapTime = time - prevTime;

    const newLap: Lap = {
      id: laps.length + 1,
      lapTime: currentLapTime,
    };

    setLaps(prevLaps => [newLap, ...prevLaps]);
    setPrevTime(time);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setPrevTime(0);
  };

  const { bestTime, worstTime } = useMemo(() => {
    if (laps.length === 0) return { bestTime: null, worstTime: null };

    const lapTimes = laps.map(lap => lap.lapTime).filter(t => t > 0);

    if (lapTimes.length === 0) return { bestTime: null, worstTime: null };

    return {
      bestTime: Math.min(...lapTimes),
      worstTime: Math.max(...lapTimes),
    };
  }, [laps]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10); // +10 milliseconds
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div className="flex max-h-[80vh] flex-col items-center justify-center rounded-xl bg-slate-50 p-6 shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Stopwatch</h2>

      <div className="mb-8 font-mono text-6xl text-blue-600">{formatTime(time)}</div>

      <div className="flex justify-between gap-4 px-8">
        <button
          onClick={isRunning ? handleLap : handleReset}
          disabled={!isRunning && time === 0}
          className={twMerge(
            'rounded-full px-6 py-3 text-lg font-semibold transition disabled:opacity-50',
            !isRunning && time === 0
              ? 'bg-gray-200 text-gray-500'
              : isRunning
                ? 'bg-slate-300 text-slate-800 hover:bg-slate-400'
                : 'bg-red-500 text-white hover:bg-red-600',
          )}
        >
          {isRunning ? 'Lap' : 'Reset'}
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={twMerge(
            'rounded-full px-6 py-3 text-lg font-semibold text-white transition',
            isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700',
          )}
        >
          {isRunning ? 'Pause' : time > 0 ? 'Resume' : 'Start'}
        </button>
      </div>

      {laps.length > 0 && (
        <div className="mt-8 w-full overflow-y-auto border-t pt-4">
          <ul className="space-y-1">
            {laps.map(lap => {
              const isBest = lap.lapTime === bestTime && laps.length > 1;
              const isWorst = lap.lapTime === worstTime && laps.length > 1;

              return (
                <li
                  key={lap.id}
                  className={twMerge(
                    'flex justify-between gap-4 rounded p-2 font-mono text-lg transition',
                    isBest && 'bg-green-100 font-bold text-green-700',
                    isWorst && 'bg-red-100 font-bold text-red-700',
                  )}
                >
                  <span>Lap {lap.id}</span>
                  <span className="text-right">{formatTime(lap.lapTime)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
