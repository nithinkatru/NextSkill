import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EducatorReleaseGrades() {
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grade, setGrade] = useState('');

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/submissions-grades');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const studentData = response.data.filter(user => user.role === 'student');
      setStudents(studentData);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/assign-grade', {
            userId: selectedStudent,
            quizId: selectedSubmission,
            grade: grade,
        });
        alert('Grade assigned successfully');
        // Optionally fetch updated grades list here
    } catch (error) {
        alert('Failed to assign grade');
        console.error(error);
    }
};

  return (
    <div>
      <h1>Grade Submissions</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedSubmission(e.target.value)} value={selectedSubmission}>
          <option value="">Select a submission</option>
          {submissions.map((submission) => (
            <option key={submission._id} value={submission._id}>
              {submission.studentName} - {submission.quizId.title}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="submit">Update Grade</button>
      </form>
    </div>
  );
}

export default EducatorReleaseGrades;
