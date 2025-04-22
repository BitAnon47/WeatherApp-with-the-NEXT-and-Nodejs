import WeatherDashboard from '@/components/WeatherDashboard'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Weather Dashboard</h1>
        <WeatherDashboard />
      </div>
    </main>
  )
} 