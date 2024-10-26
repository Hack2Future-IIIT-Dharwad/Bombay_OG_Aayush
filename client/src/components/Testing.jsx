import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesChart() {
    const [data, setData] = useState([]);

    // Fetch data from JSON endpoint using axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_data_json'); // Updated to use axios
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container" style={{ width: '100%', height: 400, padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
            <h2 className="chart-title" style={{ color: '#22d3ee', textAlign: 'center', marginBottom: '1rem' }}>Monthly Sales Data</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#e0e0e0" />
                    <YAxis stroke="#e0e0e0" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#22d3ee" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}