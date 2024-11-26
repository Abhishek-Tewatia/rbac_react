import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function UserManagement() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('Customer');
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get the current user

  useEffect(() => {
    console.log("Current User:", currentUser);  // Debugging to check the current user
    if (!currentUser) {
      setErrorMessage('Please log in to manage users.');
      return;
    }

    if (currentUser.role !== 'Admin' && currentUser.role !== 'Manager') {
      setErrorMessage('You don’t have permission to manage users.');
    }
  }, [currentUser]);

  if (errorMessage) {
    return <p style={styles.permissionMessage}>{errorMessage}</p>;
  }

  const addUser = () => {
    if (!newUsername) {
      alert('Please enter a username');
      return;
    }

    const newUser = {
      id: uuidv4(),
      username: newUsername,
      role: newRole,
      password: '1234',
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUsername(''); // Clear input after adding user
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setNewUsername(user.username);
    setNewRole(user.role);
  };

  const saveEditedUser = () => {
    if (!newUsername) {
      alert('Please enter a username');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === editingUserId) {
        return { ...user, username: newUsername, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUserId(null); // Reset editing state
    setNewUsername(''); // Clear input after saving
  };

  return (
    <div style={styles.container}>
      <div style={styles.userManagementBox}>
        <h2 style={styles.heading}>User Management</h2>

        <div style={styles.formGroup}>
          <p>Enter User Details to add a new user.</p>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={styles.inputField}
          />
        </div>

        <div style={styles.formGroup}>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={styles.selectField} disabled={currentUser.role !== 'Admin'}>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {editingUserId ? (
          <button onClick={saveEditedUser} style={styles.addUserButton}>Save Changes</button>
        ) : (
          <button onClick={addUser} style={styles.addUserButton}>Add User</button>
        )}

        <ul style={styles.userList}>
          {users.map(user => (
            <li key={user.id} style={styles.userItem}>
              <span>{user.username} ({user.role})</span>
              
              {currentUser.role === 'Admin' && (
                <>
                  <button onClick={() => startEditing(user)} style={styles.deleteButton}>Edit</button>
                  <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>Delete</button>
                </>
              )}

              {currentUser.role === 'Manager' && (
                <>
                  <button onClick={() => startEditing(user)} style={styles.deleteButton}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fa',
  },
  userManagementBox: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '20px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#555',
    outline: 'none',
  },
  selectField: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#555',
    outline: 'none',
  },
  addUserButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
    marginTop: '20px',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '1rem',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  permissionMessage: {
    color: '#d9534f',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};

export default UserManagement;
