import React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountTree from '@mui/icons-material/AccountTree';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import '../CSS_files/Options.css';
import { Link } from 'react-router-dom';

export default function Options() {
  const items = [
    { name: "Data Viz", icon: <BarChartIcon fontSize="large" className="icon" />, path: "/graph" },
    { name: "Model Viz", icon: <AccountTree fontSize="large" className="icon" />, path: "/stats" },
    { name: "Query Viz", icon: <QueryStatsIcon fontSize="large" className="icon" />, path: "/query" },
  ];

  return (
    <div className="options-body min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="relative text-gray-100 text-center w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-10 text-teal-500">
          What do you want today?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link to={item.path} key={item.name} className="w-full">
              <div
                className="flex flex-col items-center justify-center w-full h-56 cursor-pointer bg-gray-800 rounded-lg border border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-[#18282a]"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                  <span className="option-icon text-teal-500 text-5xl">{item.icon}</span>
                  <span className="text-2xl font-semibold text-gray-200">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
