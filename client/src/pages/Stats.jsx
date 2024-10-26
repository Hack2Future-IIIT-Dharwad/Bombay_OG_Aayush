import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS_files/Stats.css';

export default function Component() {
  const [datasetType, setDatasetType] = useState("Clustering");
  const [modelData, setModelData] = useState({
    model: "",
    metrics: {},
    model_type: "",
  });

  // Fetch model data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/modeldata');
        console.log(response.data);            
        setDatasetType(response.data.model_type || "Clustering");
        setModelData({
          ...response.data,
          metrics: response.data.metrics || {}, // Ensure metrics is an object
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const models = Object.entries(modelData.metrics); // Convert metrics object to an array of [key, value] pairs

  return (
    <div className="stats-body min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          Your dataset is a {datasetType}
        </h1>
        <p className="mb-8 text-gray-400 text-center">
          Compare model performance metrics like RMSE and R^2 Score to determine the best model for deployment.
        </p>
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Model Type</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">RMSE</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">R^2 Score</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Best Model</th>
              </tr>
            </thead>
            <tbody>
              {models.map(([modelType, metrics], index) => (
                <tr
                  key={index}
                  className={`${
                    modelData.model === modelType ? "bg-cyan-900 bg-opacity-25" : "bg-gray-900"
                  } hover:bg-gray-800 transition-colors duration-200`}
                >
                  <td className="p-4 border-t border-gray-700">{modelType}</td>
                  <td className="p-4 border-t border-gray-700">{metrics.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700">{metrics.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700 text-center text-cyan-400">
                    {modelData.model === modelType ? "✓" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
