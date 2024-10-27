import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Scatter, Doughnut, Bubble, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  Title,
} from 'chart.js';
import '../CSS_files/Graph.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  Title
);


const Graph = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [scatterData, setScatterData] = useState({ datasets: [] });
  const [barData, setBarData] = useState({ datasets: [] });
  const [radarData, setRadarData] = useState({ datasets: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });
  const [bubbleChartData, setBubbleChartData] = useState({ datasets: [] });
  const [jsonData, setJsonData] = useState({});
  const [selectedX, setSelectedX] = useState('');
  const [selectedY, setSelectedY] = useState('');
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_data_json');
        const data = response.data;
        setJsonData(data);
        const columns = Object.keys(data);
        setColumnNames(columns);

        if (columns.length > 0) {
          setSelectedX(columns[0]);
          setSelectedY(columns[0]);
          updateCharts(data, columns[0], columns[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateCharts = (data, xColumn, yColumn) => {
    const xData = data[xColumn].map(Number);
    const yData = data[yColumn].map(Number);

    // Line Chart Data
    const lineData = {
      labels: xData.slice(0, 10),
      datasets: [
        {
          label: yColumn,
          data: yData.slice(0, 10),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: true,
        },
      ],
    };

    // Scatter Chart Data
    const scatterPoints = xData.map((value, index) => ({
      x: value,
      y: yData[index],
    }));

    const scatterChartData = {
      datasets: [
        {
          label: `${yColumn} vs ${xColumn}`,
          data: scatterPoints,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          showLine: false,
        },
      ],
    };

    // Pie Chart Data
    const pieChartData = {
      labels: xData.slice(0, 5),
      datasets: [
        {
          label: `${yColumn} Distribution`,
          data: yData.slice(0, 5),
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    };

    // Radar Chart Data
    const radarChartData = {
      labels: xData.slice(0, 6),
      datasets: [
        {
          label: yColumn,
          data: yData.slice(0, 6),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Bubble Chart Data
    const bubbleChartData = {
      datasets: [
        {
          label: 'Bubble Chart',
          data: xData.slice(0, 10).map((x, index) => ({
            x,
            y: yData[index],
            r: Math.random() * 10 + 5, // Random radius for bubbles
          })),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Set chart data states
    setChartData(lineData);
    setScatterData(scatterChartData);
    setPieChartData(pieChartData);
    setRadarData(radarChartData);
    setBubbleChartData(bubbleChartData);
  };

  const handleXChange = (event) => {
    const newValue = event.target.value;
    setSelectedX(newValue);
    updateCharts(jsonData, newValue, selectedY);
  };

  const handleYChange = (event) => {
    const newValue = event.target.value;
    setSelectedY(newValue);
    updateCharts(jsonData, selectedX, newValue);
  };

  return (
    <div className="graphs-container">
      <h1 className="page-title">Data Visualizations</h1>
      <p className="support-text-graph">Select the variables to plot:</p>

      <div className="dropdowns-container">
        <label htmlFor="x-dropdown">Select X-axis :</label>
        <select id="x-dropdown" value={selectedX} onChange={handleXChange}>
          {columnNames.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>

        <label htmlFor="y-dropdown">Select Y-axis :</label>
        <select id="y-dropdown" value={selectedY} onChange={handleYChange}>
          {columnNames.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>

      <div className="graph-wrapper">
        <div className="graph-card">
          <div className="graph-placeholder">
            <Line data={chartData} />
          </div>
          <p className="graph-label">Line Graph</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            <Scatter data={scatterData} />
          </div>
          <p className="graph-label">Scatter Plot</p>
          
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            <Doughnut data={pieChartData} />
          </div>
          <p className="graph-label">Pie Chart</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            <Radar data={radarData} />
          </div>
          <p className="graph-label">Radar Chart</p>
        </div>

        <div className="graph-card">
          <div className="graph-placeholder">
            <Bubble data={bubbleChartData} />
          </div>
          <p className="graph-label">Bubble Chart</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
