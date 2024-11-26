User Management System

A simple User Management System built with React that allows users to register, log in, manage user roles, and view their respective dashboards. The system supports Admin, Manager, and Customer roles, with the ability to perform actions based on the assigned role.

This project demonstrates basic user management functionality, including creating users, role-based access control, and user authentication.
Table of Contents

    Project Overview
    Features
    Technologies Used
    Setup Instructions
    App Structure
    Component Breakdown
    How to Use

Project Overview

The User Management System provides the following features:

    User Registration: New users can sign up by providing a username and password. By default, users are assigned the role of "Customer."
    User Login: Users can log in using their credentials. After successful login, users are redirected to their respective dashboard based on their role.
    Role-Based Dashboard:
        Customer: Customers can access their personalized dashboard.
        Manager: Managers can manage users by editing existing user details.
        Admin: Admins have full control over users, including adding, editing, and deleting users.
    User Management: Admins and Managers can manage users through the User Management page, where they can create, edit, and delete users based on their permissions.
    Persistent Authentication: User authentication is maintained using localStorage, ensuring the user's login session persists across page reloads.

Features
1. User Registration

    Users can register by entering a username and password.
    Registered users are saved to localStorage with a default role of "Customer".

2. User Login

    By default for Admin acess - username = "admin" & password = "adminpassword". Because a new registration will always be a customer.
    Users log in with their credentials. Incorrect credentials are handled with an error message.
    On successful login, the user is redirected to the Dashboard page.

3. Role-Based Access Control

    Customer: Accesses a basic dashboard with a welcome message.
    Manager: Can edit existing users but cannot delete them.
    Admin: Has full control over users—can create, edit, and delete users.

4. User Management Page

    Admin and Manager roles have access to a user management page where they can:
        Add new users
        Edit existing user details (username and role)
        Delete users (Admin only)

5. Persistent Authentication

    User sessions are stored in localStorage, so users remain logged in even if the page is refreshed.

6. Logout Functionality

    Users can log out, which clears the session from localStorage and redirects them to the login page.

Technologies Used

    React: A JavaScript library for building user interfaces.
    React Router: For routing between pages (login, registration, dashboard, user management).
    UUID: For generating unique user IDs.
    localStorage: For storing user data (such as credentials, roles, and sessions).
    CSS-in-JS: Inline styles used within components for easy styling.

Setup Instructions

Follow the steps below to set up and run the project locally after you receive the ZIP file.
1. Extract the ZIP File

    After receiving the ZIP file, extract its contents to a folder on your local machine.

2. Navigate to the Project Folder

    Open a terminal/command prompt and navigate to the folder where you extracted the project files.

    cd <extracted-folder-name>

3. Install Dependencies

    Run the following command to install all the required dependencies using npm (Node Package Manager):

    npm install

4. Start the Development Server

    To run the project locally on your machine, execute:

    npm start

    This will start a development server and open the app in your default browser at http://localhost:3000.

App Structure

The app follows a simple structure. Below is an overview of the directory structure:

src/
├── components/
│   ├── Dashboard.js          # Displays the user's dashboard based on their role
│   ├── Login.js              # Login page for user authentication
│   ├── Registration.js       # User registration page for creating new accounts
│   ├── UserManagement.js     # Page for managing users (for Admins and Managers)
├── utils/
│   └── auth.js               # Utility functions for login, logout, and session management
├── App.js                    # Main entry point of the app, managing routes and user authentication state
├── index.js                  # Renders the app and injects it into the DOM


Component Breakdown
1. App.js

    Manages the authentication state (currentUser) and routing for the application.
    Routes include:
        /login: Displays the login form.
        /register: Displays the registration form.
        /dashboard: Displays the user's personalized dashboard.
        /users: Displays the user management page for Admins and Managers.

2. Login.js

    Users can enter their username and password to log in.
    If successful, the user is redirected to their dashboard. If not, an error message is displayed.

3. Registration.js

    New users can register by providing a username and password.
    The newly created user is stored in localStorage with a default role of "Customer".

4. Dashboard.js

    Displays a personalized dashboard based on the user’s role (Admin, Manager, or Customer).
    Admins and Managers have additional buttons to manage users.

5. UserManagement.js

    Allows Admins and Managers to manage users.
        Admins can add, edit, and delete users.
        Managers can edit users, but they cannot delete them.
    It displays a list of all users and provides options to edit or delete users based on role.

6. auth.js

    Utility functions for managing user authentication:
        login(): Validates user credentials against localStorage.
        logout(): Logs out the user by clearing session data from localStorage.
        isLoggedIn(): Checks if the user is logged in by verifying the session in localStorage.

How to Use
Note* - Please use browser back button for navigation.
1. Register a New User:

    Go to the /register page.
    Enter a username and password.
    The user will be created and stored in localStorage with the role of "Customer".
    After registration, you will be redirected to the login page.

2. Login:

    Go to the /login page and enter your username and password.
    If the credentials match, you will be redirected to your role-specific dashboard.

3. Dashboard:

    After logging in, users are redirected to a dashboard.
    Customers will see a welcome message.
    Admins and Managers will see additional options to manage users.

4. User Management (For Admins and Managers):

    Admins and Managers can go to the /users page to manage users.
    Admins can create new users, edit existing users, and delete users.
    Managers can edit user details, but cannot delete users.

5. Logout:

    To log out, click the "Logout" button. This will clear the session from localStorage and redirect you to the login page.
