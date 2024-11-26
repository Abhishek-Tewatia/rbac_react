import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  const handleRegister = () => {
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      setErrorMessage('Username already exists. Please choose another.');
      return;
    }

    const newUser = {
      id: uuidv4(),
      username,
      password, // In a real application, don't store passwords in plain text
      role: 'Customer',
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login'); // Correct navigation call
  };

  return (
    <div style={styles.container}>
      <div style={styles.registrationBox}>
        <h2 style={styles.heading}>Register</h2>
        
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.inputField}
          />
        </div>

        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.inputField}
          />
        </div>

        <button onClick={handleRegister} style={styles.registerButton}>Register</button>
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
  registrationBox: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '300px',
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
  registerButton: {
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
  errorMessage: {
    color: '#d9534f',
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '15px',
  },
};

export default Registration;
