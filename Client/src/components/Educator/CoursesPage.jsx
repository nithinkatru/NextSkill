// CoursesPage.jsx
import React, { useState, useEffect } from 'react';
import CourseForm from "./CourseForm";
import "./CoursesPage.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ _id: null, title: "", description: "", url: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaving(true);
  
    const url = course._id ? `http://localhost:5000/api/courses/${course._id}` : 'http://localhost:5000/api/courses';
    const method = course._id ? 'PUT' : 'POST';
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data); // Log server response
      if (course._id) {
        const updatedCourses = courses.map(c => (c._id === data._id ? data : c)); 
        setCourses(updatedCourses);
      } else {
        setCourses([...courses, data]);
      }
      setCourse({ _id: null, title: "", description: "", url: "" }); 
      setSaving(false);
    })
    .catch((error) => {
      console.error('Error saving course:', error);
      setSaving(false);
    });
  };
  
  useEffect(() => {
    console.log('Fetching courses...'); // Log when fetching courses
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => {
        console.log('Courses fetched:', data); // Log fetched courses
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEdit = (course) => {
    console.log('Editing course:', course); // Log the course being edited
    setCourse(course);
    setEditing(true);
  };

  const handleDelete = (courseId) => {
    console.log('Deleting course with ID:', courseId); // Log the ID of the course being deleted
    if (!courseId) {
      console.error('Course ID is undefined');
      return;
    }
    
    fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: 'DELETE',
    })
    .then(() => {
      const updatedCourses = courses.filter(course => course._id !== courseId); 
      setCourses(updatedCourses);
    })
    .catch(error => console.error('Error deleting course:', error));
  };
  
  return (
    <div className="courses-container">
      <div className="course-form-container">
        <h2>Add or Edit Course</h2>
        <CourseForm 
          course={course} 
          onSave={handleSave} 
          onChange={handleChange} 
          saving={saving} 
        />
      </div>
      <div className="courses-list-container">
        <h2>Courses</h2>
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Description</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="course-title">{course.title}</td>
                <td className="course-description">{course.description}</td>
                <td>{course.url}</td>
                <td className="course-action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(course)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(course._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CoursesPage;
