import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEducatorCRUD.css'; // Ensure you have this CSS for styling

const AdminEducatorCRUD = () => {
    const [users, setUsers] = useState([]);
    const [viewMode, setViewMode] = useState('view');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditClick = async (user) => {
        // Use a modal or form for real applications
        const updatedFirstName = prompt("Edit First Name", user.firstName);
        const updatedLastName = prompt("Edit Last Name", user.lastName);
        if (updatedFirstName && updatedLastName) {
            try {
                const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, {
                    ...user,
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                });
                fetchUsers(); // Refresh list
                console.log('User updated:', response.data);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleDeleteUser = async (id) => {
        const url = `http://localhost:5000/api/users/${id}`;
        console.log('Attempting to delete at URL:', url); // Debugging log
        try {
          await axios.delete(url);
          fetchUsers(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
      

    const filteredUsers = filter === 'all' ? users : users.filter(user => user.role === filter);

    return (
        <div>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('educator')}>Educators</button>
                <button onClick={() => setFilter('student')}>Students</button>
            </div>
            {viewMode === 'view' && (
                <div>
                    <h2>Users List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(user)}>Edit</button>
                                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminEducatorCRUD;
