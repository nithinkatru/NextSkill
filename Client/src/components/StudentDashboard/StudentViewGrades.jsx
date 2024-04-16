import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from "jspdf";
import './StudentViewGrades.css';

Chart.register(...registerables); // Register all components

function StudentViewGrades() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [average, setAverage] = useState(null); // Initialize to null to signify no data

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await axios.get('http://localhost:5000/api/submissions');
                const validSubmissions = response.data.filter(sub => sub.percentage !== undefined); // Filter out invalid entries
                setSubmissions(validSubmissions);
                if (validSubmissions.length > 0) {
                    const total = validSubmissions.reduce((acc, curr) => acc + curr.percentage, 0);
                    const avg = total / validSubmissions.length;
                    setAverage(avg);
                }
                setLoading(false);
            } catch (error) {
                setError('Error fetching submissions: ' + error.message);
                console.error('Error fetching submissions:', error);
                setLoading(false);
            }
        }

        fetchSubmissions();
    }, []);

    function generateCertificate(name) {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Certificate of Completion', 105, 40, null, null, 'center');
        doc.setFontSize(16);
        doc.text('This certifies that', 105, 60, null, null, 'center');
        doc.setFontSize(20);
        doc.text(name, 105, 80, null, null, 'center');
        doc.setFontSize(16);
        doc.text('has successfully completed the course with exemplary performance.', 105, 100, null, null, 'center');
        doc.text(`Final Grade: ${average.toFixed(2)}%`, 105, 120, null, null, 'center');
        doc.text('NextSkill', 105, 140, null, null, 'center');
        doc.save(`NextSkill_Certificate.pdf`);
    }

    return (
        <div className="grades-container">
            <h2><FontAwesomeIcon icon={faCheckCircle} /> Your Grades</h2>
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
            {error && <p className="error"><FontAwesomeIcon icon={faTimesCircle} /> {error}</p>}
            <div className="content-container">
                <div className="chart-container">
                    {submissions.length > 0 ? (
                        <Bar 
                            data={{
                                labels: submissions.map(sub => sub.quizId.title),
                                datasets: [{
                                    label: 'Grade Percentage',
                                    data: submissions.map(sub => sub.percentage),
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)'
                                }]
                            }}
                            options={{
                                scales: { y: { beginAtZero: true }},
                                plugins: { legend: { display: true }}
                            }}
                        />
                    ) : <p>No grade data available.</p>}
                </div>
                <div className="list-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Quiz Title</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr key={submission._id}>
                                    <td>{submission.quizId.title}</td>
                                    <td>{submission.percentage ? `${submission.percentage.toFixed(2)}%` : 'Not graded yet'}</td>
                                </tr>
                            ))}
                            {submissions.length === 0 && !loading && <tr><td colSpan="2">No submissions found.</td></tr>}
                        </tbody>
                    </table>
                    <button onClick={() => generateCertificate("Nithin Katru")}>
                        <FontAwesomeIcon icon={faDownload} /> Download Certificate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentViewGrades;
