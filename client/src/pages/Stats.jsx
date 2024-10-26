import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS_files/Stats.css';

export default function Stats() {
  const [datasetType, setDatasetType] = useState("Clustering");
  const [modelData, setModelData] = useState({
    model: "",
    metrics: {},
    model_type: "",
  });

  // Fetch model data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!modelData.model) { // Ensure this runs only once
        try {
          const response = await axios.get('http://localhost:5000/modeldata');
          console.log('Fetched data:', response.data);
          setDatasetType(response.data.model_type || "Clustering");
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

  const models = Object.entries(modelData.metrics); // Convert metrics object to an array of [key, value] pairs

  return (
    <div className="stats-body min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          Unlock the Potential of Your Dataset: It's Perfect for {datasetType}!
        </h1>
        <p className="mb-8 text-gray-400 text-center">
          Dive into the Numbers: Let’s Find Your Winning Model!
        </p>
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                  Explore Model Types that Fit Your Needs!
                </th>
                {datasetType === "Classification" && (
                  <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                    Accuracy: Your Model’s Winning Edge!
                  </th>
                )}
                {datasetType === "Regression" && (
                  <>
                    <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                      RMSE: Keep It Tight!
                    </th>
                    <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                      R² Score: The Closer, the Better!
                    </th>
                  </>
                )}
                {datasetType === "Clustering" && (
                  <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                    Silhouette Score: The Shape of Success!
                  </th>
                )}
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">
                  Champion Model: Your Ultimate Choice!
                </th>
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
                  {datasetType === "Classification" && (
                    <td className="p-4 border-t border-gray-700">{metrics?.toFixed(2)}</td>
                  )}
                  {datasetType === "Regression" && (
                    <>
                      <td className="p-4 border-t border-gray-700">{metrics[0]?.toFixed(2)}</td>
                      <td className="p-4 border-t border-gray-700">{metrics[1]?.toFixed(2)}</td>
                    </>
                  )}
                  {datasetType === "Clustering" && (
                    <td className="p-4 border-t border-gray-700">{metrics?.toFixed(2)}</td>
                  )}
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
