import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { logout } from '../utils/auth'; // Import logout from auth.js

function Dashboard({ user }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    logout(); // Logout function to remove the currentUser from localStorage
    navigate('/login'); // Redirect to login page after logout
    window.location.reload(); // Force reload to reset state after logout
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboardBox}>
        <h2 style={styles.heading}>Welcome, {user.username}</h2>

        {/* Show different buttons based on user role */}
        {user.role === 'Admin' && (
          <>
          <p style={styles.message}>Welcome to your Admin dashboard.</p>
          <p style={styles.message}>To manage Users Click on User Management.</p>
          <button onClick={() => navigate('/users')} style={styles.button}>
            Go to User Management
          </button>
          </>
        )}

        {user.role === 'Manager' && (
          <button onClick={() => navigate('/users')} style={styles.button}>
            Manage Users
          </button>
        )}

        {user.role === 'Customer' && (
        <>
          <p style={styles.message}>Welcome to your customer dashboard</p>
          <p style={styles.message}>You have restricted access</p>
        </>
        )}


        {/* Logout button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
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
  dashboardBox: {
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
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '15px',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    color: '#555',
    fontSize: '1rem',
    marginTop: '15px',
  },
};

export default Dashboard;
