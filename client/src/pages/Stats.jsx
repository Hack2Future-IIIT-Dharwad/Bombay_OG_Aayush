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
  }, [modelData.model]);

  // Mapping dataset types to column headers and their corresponding metric keys
  const columnMappings = {
    Classification: {
      headers: ["Accuracy", "Precision", "F1 Score", "API Key"],
      keys: ["accuracy", "precision", "f1Score"],
    },
    Regression: {
      headers: ["MSE", "RMSE", "R Squared", "API Key"],
      keys: ["mse", "rmse", "rSquared"],
    },
    Clustering: {
      headers: ["Silhouette Avg", "Davies-Bouldin", "Calinski-Harabasz", "API Key"],
      keys: ["silhouette", "daviesBouldin", "calinskiHarabasz"],
    },
  };

  // Get column headers and corresponding keys based on datasetType
  const { headers, keys } = columnMappings[datasetType] || { headers: [], keys: [] };

  // Convert metrics object to array of [modelType, metrics] pairs
  const models = Object.entries(modelData.metrics).map(([modelType, metrics]) => {
    let formattedMetrics;

    // Determine the metrics structure based on model type
    switch (datasetType) {
      case "Classification":
        formattedMetrics = {
          accuracy: metrics[0],
          precision: metrics[1],
          f1Score: metrics[2],
        };
        break;
      case "Regression":
        formattedMetrics = {
          mse: metrics[0],
          rmse: metrics[1],
          rSquared: metrics[2],
        };
        break;
      case "Clustering":
        formattedMetrics = {
          silhouette: metrics[0],
          daviesBouldin: metrics[1],
          calinskiHarabasz: metrics[2],
        };
        break;
      default:
        formattedMetrics = {};
    }
    
    console.log('Formatted metrics:', formattedMetrics); // Debugging line

    return [modelType, formattedMetrics];
  });

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
                  {keys.map((key, idx) => {
                    const value = metrics[key]; // Access the value using the correct key

                    console.log(`Model: ${modelType}, Key: ${key}, Value: ${value}`); // Debugging line

                    return (
                      <td key={idx} className="p-4 border-t border-gray-700">
                        {value !== undefined
                          ? value.toFixed(2)
                          : "N/A"}
                      </td>
                    );
                  })}
                  <td className="p-4 border-t border-gray-700"> {/* API Key Column */ }
                    {modelData.model === modelType && (
                        <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
                          Get your API key
                        </button>
                      )}
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
