# CSEC ASTU Club Management System

This is a Club Management System developed using Django REST Framework (DRF) and React. The system is designed specifically for the CSEC ASTU Club, allowing club members to register, administrators to control member approvals, event announcements, email notifications, community interactions, division management, and division joining requests.

## Features

- User Registration: Club members can register and create accounts with their details.
- Admin Control: Administrators have the ability to approve or reject member registrations.
- Event Announcements: Users can create event announcements to notify club members.
- Email Notifications: Email notifications are sent to users for specific events or actions.
- Community Page: Users can share posts and interact with other community members.
- Division Management: Administrators can create and manage different divisions within the club.
- Division Joining Requests: Users can send requests to join specific divisions.

## Project Structure

The project follows a specific directory structure:

- **frontend/**: Contains all the frontend-related files and code.
- **backend/**: Contains all the backend-related files and code.

### Frontend

The frontend is built using React, and the directory structure is as follows:

- **src/**
  - **components/**: Contains reusable components used throughout the application.
  - **pages/**: Contains different pages of the application, such as Home, Community, Divisions, etc.
  - **utils/**: Contains utility functions and helpers.
  - **App.js**: The main entry point of the React application.
  - **index.js**: Renders the React application into the HTML root element.

### Backend

The backend is developed using Django REST Framework (DRF), and the directory structure is as follows:

- **member_management/**
  - **settings.py**: Contains the Django project settings, including database configurations, installed apps, etc.
  - **urls.py**: Defines the project-wide URL configurations.
- **accounts/**: Contains the code related to user registration, authentication, and profile management.
- **events/**: Manages event creation, retrieval, and notifications.
- **community/**: Handles the community page functionality, including post creation and interactions.
- **divisions/**: Manages the divisions within the club, including division creation and joining requests.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies for the frontend: `cd frontend` and `npm install`
3. Start the frontend server: `npm run devt`
4. Install the dependencies for the backend: `cd backend` and `pip install -r requirements.txt`
5. Configure the database settings in `backend/project/settings.py`
6. Run the backend server: `python manage.py runserver`

