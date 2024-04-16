import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/enrollment-analytics');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch enrollment analytics. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="analytics-page">
      <h2>Course Enrollment Analytics</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default AnalyticsPage;
