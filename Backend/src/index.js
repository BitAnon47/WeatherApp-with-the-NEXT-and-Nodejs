const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Open-Meteo API configuration
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Routes
app.get('/api/cities/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json([]);
    }

    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json'
      }
    });

    const suggestions = response.data.results?.map(city => ({
      name: city.name,
      country: city.country,
      state: city.admin1 || city.admin2 || '', // Use admin1 (state/province) or admin2 if available
      latitude: city.latitude,
      longitude: city.longitude
    })) || [];

    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching city suggestions:', error.message);
    res.status(500).json({ error: 'Failed to fetch city suggestions' });
  }
});

app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // First, get coordinates for the city using Open-Meteo's geocoding API
    const geocodingResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });

    if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
      throw new Error('City not found');
    }

    const cityData = geocodingResponse.data.results[0];
    const { latitude, longitude } = cityData;

    // Then, get weather data for the coordinates
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        timezone: 'auto'
      }
    });

    const weatherCodeMap = {
      0: 'clear',
      1: 'clear',
      2: 'clouds',
      3: 'clouds',
      45: 'fog',
      48: 'fog',
      51: 'rain',
      53: 'rain',
      55: 'rain',
      61: 'rain',
      63: 'rain',
      65: 'rain',
      71: 'snow',
      73: 'snow',
      75: 'snow',
      77: 'snow',
      80: 'rain',
      81: 'rain',
      82: 'rain',
      85: 'snow',
      86: 'snow',
      95: 'thunderstorm',
      96: 'thunderstorm',
      99: 'thunderstorm'
    };

    const weatherData = {
      city: cityData.name,
      state: cityData.admin1 || cityData.admin2 || '',
      country: cityData.country,
      temperature: weatherResponse.data.current.temperature_2m,
      condition: weatherCodeMap[weatherResponse.data.current.weather_code] || 'clear',
      description: getWeatherDescription(weatherResponse.data.current.weather_code),
      humidity: weatherResponse.data.current.relative_humidity_2m,
      windSpeed: weatherResponse.data.current.wind_speed_10m
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return descriptions[code] || 'Unknown weather condition';
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 