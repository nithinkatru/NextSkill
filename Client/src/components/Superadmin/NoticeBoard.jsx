// NoticeBoard.js

import React, { useState, useEffect } from 'react';

function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notices');
                if (response.ok) {
                    const data = await response.json();
                    setNotices(data);
                } else {
                    console.error('Failed to fetch notices');
                }
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className="notice-board">
            <h2>Notices</h2>
            <ul>
                {notices.map(notice => (
                    <li key={notice._id}>{notice.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default NoticeBoard;
