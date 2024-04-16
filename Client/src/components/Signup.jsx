import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../Css/signup.css';
import axios from 'axios'; // Import Axios

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Phone number validation function
function validatePhoneNumber(phoneNumber) {
  const re = /^\d{10}$/; // Simple validation for US phone numbers
  return re.test(String(phoneNumber));
}
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
  
    // Email validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    // Optional: Validate phone number (basic format check)
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setError('Invalid phone number format.');
      return;
    }
  
    // Additional client-side validation can be added here
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      console.log(response.data); // For debugging
      alert('Signup successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError('Signup failed. Please try again later.');
      console.error('Error signing up:', error);
    }
  };
  
  return (
    <>
     <section className='hero'>
  <div className='container'>
    <div className='row'>
      <h1>Welcome to NextSkill Sign IN Page</h1>
      <p>Far far away, behind the word mountains...</p>
      <div className="button-container">
      <button className='primary-btn white-btn'>
  Get Started &nbsp;<i className='fa fa-long-arrow-alt-right'></i>
</button>

        <button className='primary-btn'>
          Resume Course &nbsp;<i className='fa fa-long-arrow-alt-right'></i>
        </button>
      </div>
    </div>
  </div>
</section>
      <section>
        <div className="signup-container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="custom-card">
                <div className="card-body">
                  <h1 className="card-title text-center">Sign Up</h1>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select id="role" className="form-control" value={formData.role} onChange={handleChange} name="role">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="educator">Educator</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
