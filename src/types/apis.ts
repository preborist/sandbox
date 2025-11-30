/*
weatherApi
*/
export interface GetByCoordinatesRequest {
  latitude: number;
  longitude: number;
  current_weather: boolean;
}
export interface GetByCoordinatesResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
}

/*
geocodingApi
*/

export interface GetByCityNameResponse {
  results: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    timezone: string;
    country_id: number;
    country: string;
    admin1: string;
  }>;
  generationtime_ms: number;
}
