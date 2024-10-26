import React from 'react';

export default function Options() {
  const items = [
    { name: "Data Viz", icon: "📊" },
    { name: "Model Viz", icon: "📁" },
    { name: "Query Viz", icon: "🔍" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
      <div className="relative z-10 text-gray-100 text-center w-full max-w-4xl">
        <h1 className="text-6xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
          What do you want today?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center w-full h-56 md:h-64 cursor-pointer bg-gray-800 rounded-lg border border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                <span className="text-blue-400 text-6xl">{item.icon}</span>
                <span className="text-2xl font-semibold text-gray-200">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
