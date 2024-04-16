import React, { useEffect, useState, useRef } from 'react';
import './ExploreCourses.css';

function ExploreCourses() {
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('All');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [feedback, setFeedback] = useState(''); // State to hold feedback input
    const videoElementsRef = useRef({});

    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(data => {
                setCourses([{ _id: 'All', title: 'All Courses' }, ...data]);
            })
            .catch(error => console.error('Error fetching courses:', error));

        fetch('http://localhost:5000/api/videos')
            .then(response => response.json())
            .then(data => {
                setVideos(data);
            })
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const submitFeedback = () => {
        const feedbackData = {
            videoId: selectedVideo._id,
            text: feedback
        };

        fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Feedback submitted!');
            setFeedback(''); // Clear the textarea after submission
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
        });
    };

    const renderSelectedVideo = () => (
        <div className="selected-video-container">
            <video
                src={`http://localhost:5000/${selectedVideo.videoFile.replace('\\', '/')}`}
                controls
                autoPlay
                style={{ width: '100%', maxHeight: '80vh' }}
            />
            <h3>{selectedVideo.title}</h3>
            <p>{selectedVideo.description}</p>
            <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter your feedback here..."
                style={{ width: '100%', height: '100px' }}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
            <button onClick={() => setSelectedVideo(null)}>Close Video</button>
        </div>
    );

    return (
        <div className="explore-courses-layout">
            <aside className="sidebar">
                <h3>Courses</h3>
                <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.title}</option>
                    ))}
                </select>
                <button className="back-button" onClick={() => window.location.href = '/StudentDashboard'}>Back to Dashboard</button>
            </aside>
            <div className="videos-container">
                {selectedVideo ? renderSelectedVideo() : (
                    videos.filter(video => selectedCourse === 'All' || video.courseId === selectedCourse).map(video => (
                        <div key={video._id} className="video-preview" onClick={() => handleVideoSelect(video)}>
                            <video
                                ref={el => videoElementsRef.current[video._id] = el}
                                src={`http://localhost:5000/${video.videoFile.replace('\\', '/')}`}
                                muted
                                loop
                                style={{ width: '100%', height: '100%' }}
                            />
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExploreCourses;
