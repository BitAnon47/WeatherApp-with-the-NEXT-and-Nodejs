'use client'

import { useState } from 'react'
import WeatherCard from './WeatherCard'
import CityInput from './CityInput'

interface WeatherData {
  city: string
  state: string
  country: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
}

export default function WeatherDashboard() {
  const [cities, setCities] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addCity = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`http://localhost:5000/api/weather/${city}`)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      
      const data = await response.json()
      setCities([...cities, data])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching weather data:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeCity = (cityToRemove: string) => {
    setCities(cities.filter(city => city.city !== cityToRemove))
  }

  return (
    <div className="space-y-6">
      <CityInput onAddCity={addCity} disabled={loading} />
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((cityData) => (
          <WeatherCard
            key={cityData.city}
            city={cityData.city}
            state={cityData.state}
            country={cityData.country}
            temperature={cityData.temperature}
            condition={cityData.condition}
            description={cityData.description}
            humidity={cityData.humidity}
            windSpeed={cityData.windSpeed}
            onRemove={() => removeCity(cityData.city)}
          />
        ))}
      </div>
    </div>
  )
} 