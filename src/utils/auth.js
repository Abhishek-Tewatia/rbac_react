// src/utils/auth.js
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating user ids

// Login function
export const login = (username, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if 'admin' user exists, if not create and store it
  if (users.length === 0 || !users.some(u => u.username === 'admin')) {
    const adminUser = {
      id: uuidv4(),
      username: 'admin',
      password: 'adminpassword', // Set predefined password for admin
      role: 'Admin',
    };
    users.push(adminUser); // Add the admin user to the list
    localStorage.setItem('users', JSON.stringify(users)); // Save the updated users list
  }

  // Now check if the entered username and password match any user
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user)); // Store the current user in localStorage
    return true; // Login successful
  }
  
  return false; // Invalid username/password
};

// Logout function (removes currentUser from localStorage)
export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Check if a user is logged in
export const isLoggedIn = () => {
  return localStorage.getItem('currentUser') !== null;
};

// Get the current logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};
