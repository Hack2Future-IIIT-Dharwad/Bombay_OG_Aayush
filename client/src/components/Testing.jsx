import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
    Bar
} from 'recharts';

const Heatmap = () => {
    const [data, setData] = useState([]);

    // Fetch dynamic data from your JSON endpoint
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_data_json');
                console.log('Fetched data:', response.data); // Log the raw data

                // Check if response.data is an array
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Expected data to be an array, but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
            }
        }

        fetchData();
    }, []);

    // Function to determine color based on value
    const getColor = (value) => {
        if (value < 20) return '#ff0000'; // Red for low values
        if (value < 50) return '#ffcc00'; // Yellow for medium values
        return '#00ff00'; // Green for high values
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Dynamic Heatmap</h2>
            <ResponsiveContainer>
                <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8"> {/* Use a default color */}
                        {data.map((entry, index) => (
                            <Cell
                                key={`bar-${index}`} // Correct template literal syntax
                                fill={getColor(entry.value)} // Color based on value
                            />
                        ))}
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Heatmap;
