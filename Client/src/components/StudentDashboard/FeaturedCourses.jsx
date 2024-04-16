import React, { useState, useEffect } from 'react';
import './FeaturedCourses.css'; // Ensure this path is correct for your CSS

function FeaturedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="d-flex">
            <div className="main-content flex-grow-1 p-3">
                <h2>Featured Courses</h2>
                <div className="courses-container d-flex flex-wrap">
                    {courses.map(course => (
                        <div key={course._id} className="course-card m-2 p-3 border">
                            <img src={`https://picsum.photos/seed/${course._id}/300/200`} alt="Course" />
                            <div className="course-info">
                                <div className="course-title">{course.title}</div>
                                <div className="course-details">
                                    <p>{course.description}</p>
                                    <a href={course.url} target="_blank" rel="noopener noreferrer">Learn More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedCourses;
