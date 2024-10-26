import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Testing = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_data_json'); // Replace with your endpoint
        const jsonData = response.data;
        console.log(jsonData);
        // Assuming jsonData is structured with two arrays: Height and Weight
        const heightData = jsonData['Height(Inches)'].slice(0, 20); // Take the first 20 values
        const weightData = jsonData['Weight(Pounds)'].slice(0, 20); // Take the first 20 values

        // Prepare the chart data
        const data = {
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

        // Set the chart data state
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Height vs. Weight Linear Graph (First 20 Values)</h1>
      <Line data={chartData} />
    </div>
  );
};

export default Testing;
