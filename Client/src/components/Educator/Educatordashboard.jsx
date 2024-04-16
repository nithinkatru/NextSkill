import React, { useState } from 'react';
import "./Educator.css";
import Heading from '../common/heading/Heading';
import AddVideoForm from './AddVideoForm';
import CoursesPage from './CoursesPage';
import AnalyticsPage from './AnalyticsPage';
import CourseForm from './CourseForm';
import QuizManager from './QuizManager'; // Assuming this is your form for adding/editing courses
import NoticeBoard from'../Superadmin/NoticeBoard';
import EducatorReleaseGrades from './EducatorReleaseGrades';
import EducatorNoticeBoard from './EducatorNoticeBoard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlusCircle, faVideo, faBookOpen, faChartLine, faTasks, faEdit, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
    const [videoInfo, setVideoInfo] = useState({ title: '', url: '', description: '', videoFile: null });
    const [courseInfo, setCourseInfo] = useState({ _id: null, title: '', description: '', url: '' });
    const [showSection, setShowSection] = useState('');

    const handleCourseChange = (name, value) => {
        setCourseInfo(prevCourse => ({
            ...prevCourse,
            [name]: value,
        }));
    };  

    const renderSidebar = () => {
        return (
            <div className="sidebar">
            <button className="sidebar-btn" onClick={() => setShowSection('addCourse')}>
                <FontAwesomeIcon icon={faPlusCircle} /> Add Course
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('addVideo')}>
                <FontAwesomeIcon icon={faVideo} /> Add Video
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('viewCourses')}>
                <FontAwesomeIcon icon={faBookOpen} /> View Courses
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('viewAnalytics')}>
                <FontAwesomeIcon icon={faChartLine} /> View Analytics
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('manageAssignments')}>
                <FontAwesomeIcon icon={faTasks} /> Manage Assignments
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('QuizManager')}>
                <FontAwesomeIcon icon={faEdit} /> Manage Quizzes
            </button> 
            <button className="sidebar-btn" onClick={() => setShowSection('EducatorReleaseGrades')}>
                <FontAwesomeIcon icon={faGraduationCap} /> EducatorReleaseGrades
            </button>
            <button className="sidebar-btn" onClick={() => setShowSection('EducatorNoticeBoard')}>
                <FontAwesomeIcon icon={faGraduationCap} /> EducatorNoticeBoard
            </button>
        </div>
        );
    };

    const handleCourseSave = async (event) => {
        event.preventDefault();
        console.log('Saving course:', courseInfo);
        const url = courseInfo._id ? `http://localhost:5000/api/courses/${courseInfo._id}` : 'http://localhost:5000/api/courses';
        const method = courseInfo._id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseInfo),
            });

            const data = await response.json();
            console.log('Course saved:', data);
            setCourseInfo({ _id: null, title: '', description: '', url: '' }); // Reset form
            setShowSection(''); // Optionally clear or change the section after saving
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    return (
        <>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <Heading subtitle='WELCOME TO NEXTSKILL' title='Best Online Education Expertise' />
                        <p>Far far away, behind the word mountains...</p>
                    </div>

                    <button className='primary-btn'>
                START  NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button className='primary-btn'>
                VIEW COURSES <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              
                    

                </div>
                
            </section>
            <div className="admin-dashboard">
                {renderSidebar()}
                <div className="main-content">
                    <h2>Educator Dashboard</h2>
                    <div  style={{ width: '70em' }}>
                  
                </div>
                    {/* Render forms or pages based on the selected section */}
                    {showSection === 'addVideo' && <AddVideoForm videoInfo={videoInfo} />}
                    {showSection === 'addCourse' && (
                        <CourseForm 
                            course={courseInfo} 
                            onSave={handleCourseSave} 
                            onChange={handleCourseChange} 
                            saving={false}
                        />
                    )}
                    {showSection === 'viewCourses' && <CoursesPage />}
                    {showSection === 'viewAnalytics' && <AnalyticsPage />}
                    {showSection === 'QuizManager' && <QuizManager />}
                    {showSection === 'EducatorReleaseGrades' && <EducatorReleaseGrades />}
                    {showSection === 'EducatorNoticeBoard' && <EducatorNoticeBoard />}
                   
                    
                </div>
            </div>

        </>
    );
}

export default AdminDashboard;
