# Weather Dashboard

A modern, responsive weather application built with Next.js and Node.js that provides real-time weather information for cities worldwide.

![Weather Dashboard Screenshot](screenshots/weather-dashboard.png)

## Features

- 🌍 Real-time weather data using Open-Meteo API
- 🔍 Smart city search with autocomplete suggestions
- 🌡️ Detailed weather information including:
  - Temperature
  - Weather conditions
  - Humidity levels
  - Wind speed
- 🎨 Dynamic weather-based themes and icons
- 📱 Fully responsive design
- 🌐 Location-based weather data with city, state, and country information

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express
- Axios
- CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Start the Backend Server
```bash
npm run dev
```
The backend server will start on http://localhost:5000

4. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

5. Start the Frontend Development Server
```bash
npm run dev
```
The frontend will be available at http://localhost:3000

## Features in Action

- **City Search**: Type any city name to get instant suggestions
- **Weather Cards**: Each city's weather is displayed in a beautiful card with:
  - City name with state/country information
  - Current temperature
  - Weather condition with appropriate icon
  - Humidity percentage
  - Wind speed
- **Dynamic Styling**: Weather cards change appearance based on conditions:
  - Sunny: Yellow/Orange gradient
  - Rainy: Blue gradient
  - Cloudy: Gray gradient
  - Snow: Light blue gradient

## API Integration

The application uses the Open-Meteo API for:
- Geocoding (city search and coordinates)
- Real-time weather data
- No API key required!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details 