'use client'

import { useState, useEffect } from 'react'
import '../CSS_files/Load.css'

export default function Load({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing visualization...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 95) {
          const newProgress = Math.min(prevProgress + Math.random() * 10, 95); // Ensure it does not exceed 95%
          if (newProgress < 25) {
            setStatusMessage("Loading data models...");
          } else if (newProgress < 50) {
            setStatusMessage("Processing data insights...");
          } else if (newProgress < 75) {
            setStatusMessage("Applying visual transformations...");
          } else if (newProgress < 95) {
            setStatusMessage("Finalizing visualization...");
          }
          return newProgress;
        } else {
          // Once progress reaches 95%, it will stay there until completion
          setStatusMessage("Waiting for visualization to complete...");
          return 95;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 95) {
      onComplete(); // Call onComplete when progress is at 95%
    }
  }, [progress, onComplete]);

  return (
    <div className="load-body min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl space-y-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Visualizing Your Data</h1>
        <p className="text-lg opacity-80">{statusMessage}</p>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6 shadow-lg">
          <div className="relative w-full h-4 bg-gray-700 rounded overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-300 ease-out animate-progress-glow" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-blue-300 mt-2">{Math.round(progress)}% Complete</p>
        </div>

        <div className="text-center animate-pulse mt-10">
          <p className="text-xl font-semibold">Please wait as we prepare your data insights...</p>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes progress-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(0, 170, 255, 0.4); }
          50% { box-shadow: 0 0 16px rgba(0, 170, 255, 0.8); }
        }
        .animate-progress-glow {
          animation: progress-glow 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
