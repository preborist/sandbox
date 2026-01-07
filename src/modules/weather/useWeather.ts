import { useState } from 'react';

import toast from '@src/lib/toast';
import { getRTKQueryErrorMessage } from '@src/lib/utils/func';
import { useLazyGetByCityNameQuery } from '@src/store/apis/geocodingApi';
import { useLazyGetByCoordinatesQuery } from '@src/store/apis/weatherApi';
import * as Types from '@src/types';

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  time: string;
  city: string;
  units: Types.GetByCoordinatesResponse['current_weather_units'];
}

interface UseWeatherResult {
  weather: WeatherData | null;
  loading: boolean;
  fetchWeatherByCoords: (latitude: number, longitude: number, city: string) => Promise<void>;
  handleSearch: (city: string) => Promise<void>;
  handleGeoLocation: () => void;
  clearWeather: () => void;
}

export const useWeather = (): UseWeatherResult => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // RTK Query Lazy Hooks
  const [triggerWeather, weatherResult] = useLazyGetByCoordinatesQuery();
  const [triggerGeocoding, geocodingResult] = useLazyGetByCityNameQuery();

  const loading = weatherResult.isLoading || geocodingResult.isLoading;

  const clearWeather = () => setWeather(null);

  // 1. Fetch weather by coordinates
  const fetchWeatherByCoords = async (latitude: number, longitude: number, city: string = 'Current location'): Promise<void> => {
    clearWeather(); // Clear to show loading
    try {
      const {
        current_weather: { temperature, windspeed, winddirection, time },
        current_weather_units,
      } = await triggerWeather({ latitude, longitude, current_weather: true }).unwrap();

      setWeather({ temperature, windspeed, winddirection, time, units: current_weather_units, city });
    } catch (error) {
      console.error(error);
      toast.error(getRTKQueryErrorMessage(error) || 'Error fetching weather data');
    }
  };

  // 2. Search city and fetch weather (Geocoding)
  const handleSearch = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    try {
      const { results } = await triggerGeocoding(city).unwrap();

      if (!results || results.length === 0) {
        clearWeather();
        toast.error('City not found');
        return;
      }

      const { latitude, longitude, name } = results[0];
      await fetchWeatherByCoords(latitude, longitude, name);
    } catch (error) {
      console.error(error);
      toast.error(getRTKQueryErrorMessage(error) || 'Error searching city');
    }
  };

  // 3. Browser geolocation
  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    clearWeather(); // Clear to show loading

    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, 'Current location');
      },
      () => toast.error('Geolocation access denied'),
      // Add options for faster and more accurate results
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  };

  return { weather, loading, fetchWeatherByCoords, handleSearch, handleGeoLocation, clearWeather };
};
