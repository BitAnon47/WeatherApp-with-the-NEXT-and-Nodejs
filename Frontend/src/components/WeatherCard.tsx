'use client'

import { FaTrash, FaTint, FaWind } from 'react-icons/fa'

interface WeatherCardProps {
  city: string
  state: string
  country: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  onRemove: () => void
}

export default function WeatherCard({ 
  city, 
  state,
  country,
  temperature, 
  condition, 
  description,
  humidity,
  windSpeed,
  onRemove 
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (condition) {
      case 'clear':
        return '☀️'
      case 'rain':
        return '🌧️'
      case 'clouds':
        return '☁️'
      case 'snow':
        return '❄️'
      case 'thunderstorm':
        return '⛈️'
      default:
        return '🌤️'
    }
  }

  return (
    <div className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${
      condition === 'clear' ? 'from-yellow-400 to-orange-500' :
      condition === 'rain' ? 'from-blue-400 to-blue-600' :
      condition === 'clouds' ? 'from-gray-400 to-gray-600' :
      condition === 'snow' ? 'from-blue-100 to-blue-300' :
      'from-purple-400 to-purple-600'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white">{city}</h2>
          <p className="text-white/80">
            {state && `${state}, `}{country}
          </p>
          <p className="text-white/80 capitalize">{description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-4xl">{getWeatherIcon()}</span>
            <span className="text-3xl font-bold text-white">{Math.round(temperature)}°C</span>
          </div>
          <div className="mt-4 flex gap-4 text-white">
            <div className="flex items-center gap-1">
              <FaTint />
              <span>{humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <FaWind />
              <span>{windSpeed} m/s</span>
            </div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
} 