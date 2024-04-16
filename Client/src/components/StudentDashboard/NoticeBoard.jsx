import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faInfoCircle,
  faExclamationTriangle,
  faCalendarAlt,
  faBullhorn,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons';
import './NoticeBoard.css';

function NoticeBoard({ audience = 'student' }) {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notices');
                if (response.ok) {
                    const allNotices = await response.json();
                    const filteredNotices = allNotices.filter(notice => 
                        notice.targetAudience === audience || notice.targetAudience === 'all'
                    );
                    setNotices(filteredNotices);
                } else {
                    console.error('Failed to fetch notices');
                }
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, [audience]);

    const getIcon = (type) => {
        switch (type) {
            case 'urgent':
                return faExclamationTriangle;
            case 'info':
                return faInfoCircle;
            case 'event':
                return faCalendarAlt;
            case 'announcement':
                return faBullhorn;
            case 'message':
                return faEnvelopeOpenText;
            default:
                return faBell;
        }
    };

    return (
        <div className="notice-board">
            <h2><FontAwesomeIcon icon={faBell} /> Notices for Students</h2>
            {notices.length > 0 ? (
                <ul>
                    {notices.map((notice, index) => (
                        <li key={index}>
                            <FontAwesomeIcon icon={getIcon(notice.type)} />
                            {' '}{notice.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notices to display for students.</p>
            )}
        </div>
    );
}

export default NoticeBoard;
