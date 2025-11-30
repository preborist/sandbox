/* eslint-disable jsx-a11y/accessible-emoji */
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useState } from 'react';

import WindCompass from './WindCompass';
import { useWeather } from './useWeather';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Weather = () => {
  const { weather, loading, handleSearch: handleSearchLogic, handleGeoLocation, clearWeather } = useWeather();
  const [cityInput, setCityInput] = useState('');

  const handleClear = () => {
    setCityInput('');
    clearWeather();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    handleSearchLogic(cityInput);
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">Weather App</h2>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            placeholder="Enter city..."
            className="w-full rounded border border-gray-300 p-2 pr-10 focus:border-blue-500 focus:outline-none"
          />
          {cityInput.trim() && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !cityInput.trim()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Search
        </button>
      </form>
      <div className="flex items-center py-4">
        <hr className="flex grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-500">or</span>
        <hr className="flex grow border-t border-gray-300" />
      </div>

      <button
        onClick={() => {
          handleClear();
          handleGeoLocation();
        }}
        disabled={loading}
        className="mb-6 w-full rounded bg-gray-200 py-2 text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
      >
        📍 Use my location
      </button>

      {loading && <p className="py-4 text-center text-gray-500">Loading...</p>}
      {!weather && !loading && <p className="py-4 text-center text-gray-400">Enter a city or use your location.</p>}

      {weather && !loading && (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-blue-50 p-4">
          <div>
            <h3 className="mb-2 text-xl font-semibold">{weather.city || 'Unknown city'}</h3>
            {/* Temperature */}
            <p className="text-4xl font-bold text-blue-600">
              {weather.temperature}
              {weather.units.temperature}
            </p>
          </div>
          {/* Time and date */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-gray-800">{dayjs.utc(weather.time).tz(timezone).format('LT')}</p>
            <p className="mb-2 text-sm text-gray-500">{dayjs.utc(weather.time).tz(timezone).format('ll')}</p>
            <p className="mt-2 text-center text-xs text-gray-600">
              <span className="font-semibold">Time is shown for your local timezone:</span> <br />
              <span className="font-mono text-gray-800">{timezone}</span>
            </p>
          </div>
          {/* Wind information */}
          <div>
            <WindCompass windspeed={weather.windspeed} winddirection={weather.winddirection} units={weather.units.windspeed} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
