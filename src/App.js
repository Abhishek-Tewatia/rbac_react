import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Registration from './components/Registration';
import { isLoggedIn, getCurrentUser } from './utils/auth';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and set currentUser
    const fetchUser = () => {
      if (isLoggedIn()) {
        setCurrentUser(getCurrentUser()); // Set the currentUser
      }
      setIsLoading(false); // Set loading to false once state has been updated
    };

    fetchUser();
  }, []);

  // Debug log to verify if currentUser is being set
  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading screen until state is set
  }

  return (
    <Router>
      <Routes>
        {/* Routes for logged-out users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {!currentUser ? (
          <Route path="/" element={<Login />} />
        ) : (
          // Routes for logged-in users
          <>
            <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
            {currentUser.role === 'Admin' || currentUser.role === 'Manager' ? (
              <Route path="/users" element={<UserManagement />} />
            ) : null}
            <Route path="/" element={<Dashboard user={currentUser} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
