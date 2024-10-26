import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Scatter } from 'react-chartjs-2'; // Import Scatter
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import '../CSS_files/Graph.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Graph = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [scatterData, setScatterData] = useState({ datasets: [] });
  const [correlationData, setCorrelationData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_data_json'); // Replace with your endpoint
        const jsonData = response.data;
        console.log(jsonData);
        
        // Assuming jsonData is structured with two arrays: Height and Weight
        const heightData = jsonData['Height(Inches)'].slice(0, 10); // Take the first 10 values for line chart
        const weightData = jsonData['Weight(Pounds)'].slice(0, 10); // Take the first 10 values for line chart

        // Prepare the line chart data
        const lineData = {
          labels: heightData, // Use heights as labels
          datasets: [
            {
              label: 'Weight (Pounds)',
              data: weightData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              fill: true,
            },
          ],
        };

        // Prepare the scatter chart data
        const scatterPoints = heightData.map((height, index) => ({
          x: height,
          y: weightData[index],
        }));

        const scatterChartData = {
          datasets: [
            {
              label: 'Weight vs Height',
              data: scatterPoints,
              backgroundColor: 'rgba(255, 99, 132, 1)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
              showLine: false,
            },
          ],
        };

        // Prepare correlation chart data for all entries
        const allHeightData = jsonData['Height(Inches)'];
        const allWeightData = jsonData['Weight(Pounds)'];

        const correlationPoints = allHeightData.map((height, index) => ({
          x: height,
          y: allWeightData[index],
        }));

        const correlationChartData = {
          datasets: [
            {
              label: 'Correlation of Weight and Height',
              data: correlationPoints,
              backgroundColor: 'rgba(54, 162, 235, 1)',
              borderColor: 'rgba(54, 162, 235, 0.2)',
              showLine: false,
            },
          ],
        };

        // Set the chart data states
        setChartData(lineData);
        setScatterData(scatterChartData);
        setCorrelationData(correlationChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="graphs-container">
      <h1 className="page-title">Data Visualizations</h1>
      <p className="support-text-graph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, amet. Repellat temporibus sunt rerum deserunt adipisci facilis doloremque numquam quae.</p>
      <div className="graph-wrapper">
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Render the Line chart here */}
            <Line data={chartData} />
          </div>
          <p className="graph-label">Label for Graph 1</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Render the Scatter chart here */}
            <Scatter data={scatterData} />
          </div>
          <p className="graph-label">Label for Graph 2</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Render the Correlation chart here */}
            <Scatter data={correlationData} />
          </div>
          <p className="graph-label">Correlation of Weight and Height</p>
        </div>

        {/* ... Remaining Graph Cards ... */}
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 4 */}
            <p>Graph 4</p>
          </div>
          <p className="graph-label">Label for Graph 4</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 5 */}
            <p>Graph 5</p>
          </div>
          <p className="graph-label">Label for Graph 5</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 6 */}
            <p>Graph 6</p>
          </div>
          <p className="graph-label">Label for Graph 6</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
