import React, { useState } from 'react';
import { login } from '../utils/auth'; // Assuming this is your custom login function
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/dashboard'); // Navigate to the dashboard after successful login
      window.location.reload(); // Reload the page after navigating to avoid blank page
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Login</h2>
        
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

        <button onClick={handleLogin} style={styles.loginButton}>Login</button>

        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.registerRedirect}>
          <p>Don't have an account?</p>
          <button onClick={handleRegisterRedirect} style={styles.registerButton}>Register</button>
        </div>
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
  loginBox: {
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
  loginButton: {
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
  errorText: {
    color: '#d9534f',
    fontSize: '1rem',
    marginTop: '10px',
  },
  registerRedirect: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#555',
  },
  registerButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
};

export default Login;
