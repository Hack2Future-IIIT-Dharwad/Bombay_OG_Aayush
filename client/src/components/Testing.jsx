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
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Monthly Sales Data</h2>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc' }} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#22d3ee" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}