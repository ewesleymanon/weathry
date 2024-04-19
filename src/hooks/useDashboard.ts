import { useState, useEffect, useMemo } from 'react';
import apiClient from '../api/config';
import { Forecast } from '../components/WeatherForecast';
import { geoLocationApiKey } from '../api/config';

export type UseDashboard = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  weatherData: any;
  forecastData: Forecast[];
  temperatureDataMemo: { label: string; temp: number }[];
  locationName: string | null;
  error: string | null;
  handleSearch: () => void;
};

const useDashboard = (): UseDashboard => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<Forecast[]>([]);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const temperatureDataMemo = useMemo(() => {
    if (temperatureData) {
      const labels = ['Morning', 'Afternoon', 'Evening', 'Night'];
      return temperatureData.map((data, index) => ({
        label: labels[index],
        temp: data.main.temp
      }));
    } else {
      return [
        { label: 'Morning', temp: 0 },
        { label: 'Afternoon', temp: 0 },
        { label: 'Evening', temp: 0 },
        { label: 'Night', temp: 0 }
      ];
    }
  }, [temperatureData]);
  
  
  const handleSearch = () => {
    if (query.trim() !== '') {
      setLocationName(query)
      fetchWeatherData();
    }
  };

  const fetchWeatherForecastData = async (latitude: number, longitude: number) => {
    try {
      const tempQuery = (latitude && longitude) ? `lat=${latitude}&lon=${longitude}` : `q=${query}`;
      const { list }: any = await apiClient.get(`/forecast?${tempQuery}&cnt=10&units=metric`);
      setForecastData(list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchTemperatureDataForTimePeriods = async (latitude: number, longitude: number) => {
    try {
      const tempQuery = (latitude && longitude) ? `lat=${latitude}&lon=${longitude}` : `q=${query}`;

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const morningTimestamp = currentTimestamp + 7 * 3600; // 7 hours from current time
      const afternoonTimestamp = currentTimestamp + 12 * 3600; // 12 hours from current time
      const eveningTimestamp = currentTimestamp + 18 * 3600; // 18 hours from current time
      const nightTimestamp = currentTimestamp + 23 * 3600; // 23 hours from current time

      const [morningResponse, afternoonResponse, eveningResponse, nightResponse] = await Promise.all([
        apiClient.get(`/weather?${tempQuery}&dt=${morningTimestamp}&units=metric`),
        apiClient.get(`/weather?${tempQuery}&dt=${afternoonTimestamp}&units=metric`),
        apiClient.get(`/weather?${tempQuery}&dt=${eveningTimestamp}&units=metric`),
        apiClient.get(`/weather?${tempQuery}&dt=${nightTimestamp}&units=metric`),
      ]);

      setTemperatureData([morningResponse, afternoonResponse, eveningResponse, nightResponse]);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/weather?q=${query}&units=metric`);
      setWeatherData(response);
      setError(null);

      fetchWeatherForecastData(0,0);
      fetchTemperatureDataForTimePeriods(0,0);
    } catch (error) {
      setError('Location not found');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchWeatherByCurrentLocation = async () => {
      try {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data using the coordinates
          const weatherResponse = await apiClient.get(`/weather?lat=${latitude}&lon=${longitude}&units=metric`);
          setWeatherData(weatherResponse);
          setError(null);
          fetchWeatherForecastData(latitude, longitude);
          fetchTemperatureDataForTimePeriods(latitude, longitude);


          // Reverse geocoding using OpenCage Geocoding API
          const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geoLocationApiKey}`);
          const geocodeData = await geocodeResponse.json();
          const cityName = geocodeData.results[0]?.components.city || geocodeData.results[0]?.components.town;
          setLocationName(cityName);
        });
      } catch (error) {
        setError('Error fetching weather data');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherByCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    query,
    setQuery,
    loading,
    weatherData,
    forecastData,
    temperatureDataMemo,
    locationName,
    error,
    handleSearch,
  };
};

export default useDashboard;
