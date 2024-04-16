import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NoticeBoard.css';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';


function EducatorNoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState('');

    // Define fetchNotices outside of useEffect to use it elsewhere
    const fetchNotices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notices');
            if (response.ok) {
                const allNotices = await response.json();
                const filteredNotices = allNotices.filter(notice =>
                    notice.targetAudience === 'educator' || notice.targetAudience === 'all'
                );
                setNotices(filteredNotices);
            } else {
                console.error('Failed to fetch notices');
            }
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []); // Run this effect on component mount only

    const handlePostNotice = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/notices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: newNotice,
                    targetAudience: 'student' // Assuming this is how you differentiate target audience
                })
            });
            if (response.ok) {
                setNewNotice(''); // Reset form
                await fetchNotices(); // Refresh the notices list
                console.log('Notice posted successfully');
            } else {
                console.error('Failed to post notice');
            }
        } catch (error) {
            console.error('Error posting notice:', error);
        }
    };

    return (
        <div className="notice-board">
            <h2><FontAwesomeIcon icon={faBell} /> Notices for Educators</h2>
            <form onSubmit={handlePostNotice}>
                <textarea
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                    placeholder="Write a notice for students..."
                    required
                />
                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /> Post Notice</button>
            </form>
            {notices.length > 0 ? (
                <ul>
                    {notices.map((notice, index) => (
                        <li key={index}>
                            <FontAwesomeIcon icon={faPlus} /> {notice.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notices to display for educators.</p>
            )}
        </div>
    );
}

export default EducatorNoticeBoard;
