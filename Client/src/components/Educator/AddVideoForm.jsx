import React, { useState, useEffect } from 'react';
import "./Videoform.css";

function AddVideoForm() {
    const [videoInfo, setVideoInfo] = useState({
      title: '',
      url: '',
      description: '',
      videoFile: null,
      courseId: ''
    });
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

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setVideoInfo({
        ...videoInfo,
        [name]: files ? files[0] : value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', videoInfo.title);
      formData.append('url', videoInfo.url);
      formData.append('description', videoInfo.description);
      formData.append('courseId', videoInfo.courseId);
      if (videoInfo.videoFile) {
        formData.append('videoFile', videoInfo.videoFile);
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/videos', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('Video uploaded successfully');
          setVideoInfo({ title: '', url: '', description: '', videoFile: null, courseId: '' });
          alert('Video uploaded successfully');
        } else {
          console.error('Upload failed');
          alert('Upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form');
      }
    };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Video Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={videoInfo.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url">Video URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={videoInfo.url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={videoInfo.description}
          onChange={handleChange}
          required
          rows="4"
        ></textarea>
      </div>
      <div>
        <label htmlFor="videoFile">Video File:</label>
        <input
          type="file"
          id="videoFile"
          name="videoFile"
          accept="video/*"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="course">Select Course:</label>
        <select id="course" name="courseId" value={videoInfo.courseId} onChange={handleChange}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Video</button>
    </form>
  );
}

export default AddVideoForm;
