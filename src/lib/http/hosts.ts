type ServiceNames = 'weather' | 'geocoding';

const getServiceAddress = (serviceName: ServiceNames): string => {
  const config: Record<ServiceNames, string> = {
    weather: 'https://api.open-meteo.com',
    geocoding: 'https://geocoding-api.open-meteo.com',
  };

  return config[serviceName];
};

export const hosts: Record<ServiceNames, string> = {
  weather: getServiceAddress('weather'),
  geocoding: getServiceAddress('geocoding'),
};
