import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS_files/Stats.css';

export default function Stats() {
  const [datasetType, setDatasetType] = useState("");
  const [modelData, setModelData] = useState({
    model: "",
    metrics: {},
    model_type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!modelData.model) {
        try {
          const response = await axios.get('http://localhost:5000/modeldata');
          console.log('Fetched data:', response.data);
          setDatasetType(response.data.model_type || "Regression");
          setModelData({
            ...response.data,
            metrics: response.data.metrics || {},
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  // Mapping dataset types to column headers
  const columnHeaders = {
    Classification: ["Accuracy", "Precision", "F1 Score", "API Key"],
    Regression: ["MSE", "RMSE", "R Squared", "API Key"],
    Clustering: ["Silhouette Avg", "Davies-Bouldin", "Calinski-Harabasz", "API Key"],
  };

  // Get column headers based on datasetType
  const headers = columnHeaders[datasetType] || [];

  // Convert metrics object to array of [modelType, metrics] pairs
  const models = Object.entries(modelData.metrics);

  return (
    <div className="stats-body min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-teal-500">
          Unlock the Potential of Your Dataset:
        </h1>
        <p className="text-lg font-bold mb-6 text-center text-teal-500">
          It's Perfect for {datasetType}!
        </p>
        <p className="mb-8 text-gray-400 text-center">
          Dive into the Numbers: Let’s Find Your Winning Model!
        </p>
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                  Model Type
                </th>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map(([modelType, metrics], index) => (
                <tr
                  key={index}
                  className={`${
                    modelData.model === modelType ? "bg-cyan-100 bg-opacity-25" : "bg-gray-900"
                  } hover:bg-gray-800 transition-colors duration-200`}
                >
                  <td className="p-4 border-t border-gray-700">{modelType}</td>
                  {headers.slice(0, -1).map((header, idx) => (
                    <td key={idx} className="p-4 border-t border-gray-700">
                      {metrics[header] !== undefined ? metrics[header].toFixed(2) : "N/A"}
                    </td>
                  ))}
                  <td className="p-4 border-t border-gray-700"> {/* API Key Column */}
                    {/* This cell intentionally left empty as per your requirement */}
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
