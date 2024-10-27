import { useState } from 'react'
import { ChevronUp, Database } from 'lucide-react'

export default function LandingPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-teal-500" />
              <span className="text-xl font-bold">DarkFlow</span>
            </div>
            {/* Sign In link removed */}
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <span className="bg-teal-500 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">New</span>
              <span className="ml-2 text-sm">Introducing QueryViz AI-powered insights</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              What would you like to know about your data?
            </h1>
          </div>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask QueryViz about your dataset..."
              className="w-full p-4 pr-12 text-white bg-gray-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-500 rounded-full">
              <ChevronUp className="h-6 w-6 text-black" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Analyze sales trends', 'Visualize user demographics', 'Identify outliers in the dataset'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
