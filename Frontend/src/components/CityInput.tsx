'use client'

import { useState, useEffect, useRef } from 'react'

interface CitySuggestion {
  name: string
  country: string
  state: string
}

interface CityInputProps {
  onAddCity: (city: string) => void
  disabled?: boolean
}

export default function CityInput({ onAddCity, disabled = false }: CityInputProps) {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!city.trim()) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/cities/search?query=${encodeURIComponent(city)}`)
        if (!response.ok) throw new Error('Failed to fetch suggestions')
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [city])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim() && !disabled) {
      onAddCity(city.trim())
      setCity('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (cityName: string) => {
    setCity(cityName)
    setShowSuggestions(false)
    onAddCity(cityName)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={disabled}
          />
          {isLoading && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Add City
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${index}`}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-sm text-gray-500">
                {suggestion.state && `${suggestion.state}, `}{suggestion.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 