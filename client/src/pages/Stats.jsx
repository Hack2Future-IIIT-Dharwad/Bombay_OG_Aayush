import React from 'react';

export default function Component() {
  const models = [
    { type: "GradientBoosting", accuracy: 0.92, rmse: 0.15, precision: 0.89, recall: 0.94, f1Score: 0.91, bestModel: true },
    { type: "LogisticRegression", accuracy: 0.88, rmse: 0.22, precision: 0.86, recall: 0.90, f1Score: 0.88, bestModel: false },
    { type: "SVM", accuracy: 0.90, rmse: 0.18, precision: 0.88, recall: 0.92, f1Score: 0.90, bestModel: false },
    { type: "RandomForest", accuracy: 0.91, rmse: 0.16, precision: 0.90, recall: 0.93, f1Score: 0.91, bestModel: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">Model Performance Comparison</h1>
        <p className="mb-8 text-gray-400 text-center">
          Compare model performance metrics like accuracy, RMSE, and F1 Score to determine the best model for deployment.
        </p>
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Model Type</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Accuracy</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">RMSE</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Precision</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Recall</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">F1 Score</th>
                <th className="p-4 text-lg font-semibold text-gray-100 border-b border-gray-700">Best Model</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.type}
                  className={`${
                    model.bestModel ? "bg-cyan-900 bg-opacity-25" : "bg-gray-900"
                  } hover:bg-gray-800 transition-colors duration-200`}
                >
                  <td className="p-4 border-t border-gray-700">{model.type}</td>
                  <td className="p-4 border-t border-gray-700">{model.accuracy.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700">{model.rmse.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700">{model.precision.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700">{model.recall.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700">{model.f1Score.toFixed(2)}</td>
                  <td className="p-4 border-t border-gray-700 text-center text-cyan-400">
                    {model.bestModel ? "✓" : ""}
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
