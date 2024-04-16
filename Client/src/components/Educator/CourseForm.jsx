// CourseForm.jsx
import React from 'react';
import "./Educator.css";

function CourseForm({ course, onSave, onChange, saving = false }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <form onSubmit={onSave}>
      <h2>{course._id ? 'Edit' : 'Add'} Course</h2> 
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={course.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Course Description"
        value={course.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="url"
        placeholder="Course URL"
        value={course.url}
        onChange={handleChange}
      />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save Course'}
      />
    </form>
  );
}

export default CourseForm;
