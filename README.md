# OSIJ Fullstack Platform

This repository contains the source code for the OSIJ platform, a modular Django and React application that provides a wide range of services, including educational courses, software solutions, graphic design, and cosmetology services.

## Project Overview

The OSIJ platform is a full-stack application with a Django backend and a React frontend. The backend is built with a modular architecture, with separate apps for each of the main services offered by the platform. The frontend is a single-page application built with React and Tailwind CSS, with a clean and modern user interface.

## Features

*   **Education Platform:** A comprehensive platform for online courses, with features for course creation, enrollment, lesson management, and certification.
*   **Software Services:** A system for managing software service requests, with features for submitting enquiries, tracking progress, and communicating with the support team.
*   **Graphic Design Services:** A platform for ordering graphic design services, with features for browsing designer portfolios, placing orders, and tracking order status.
*   **Cosmetology Services:** A platform for booking cosmetology appointments, with features for browsing beauty services, viewing stylist profiles, and booking appointments.
*   **User Authentication:** A complete user authentication system with support for user registration, login, and session management.
*   **REST API:** A well-documented REST API for interacting with the backend services.

## Technology Stack

### Backend

*   [Django](https://www.djangoproject.com/)
*   [Django REST Framework](https://www.django-rest-framework.org/)
*   [Python](https://www.python.org/)

### Frontend

*   [React](https://reactjs.org/)
*   [React Router](https://reactrouter.com/)
*   [Axios](https://axios-http.com/)
*   [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

```
project_root/
├── osij_backend/
│   ├── osij_backend/        # Django settings
│   ├── education/           # Education platform app
│   ├── software_services/   # Software services app
│   ├── graphic_design/      # Graphic design services app
│   ├── cosmetology/         # Cosmetology services app
│   ├── manage.py
│   └── requirements.txt
├── osij_frontend/           # React frontend
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
└── README.md
```

## Getting Started

### Prerequisites

*   [Python 3.10+](https://www.python.org/downloads/)
*   [Node.js 14+](https://nodejs.org/en/download/)
*   [Git](https://git-scm.com/downloads)

### Backend Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
    ```
2.  Navigate to the backend directory:
    ```bash
    cd CompaniesWebsite/osij_backend
    ```
3.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
4.  Activate the virtual environment:
    *   On Windows:
        ```bash
        venv\Scripts\activate
        ```
    *   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
5.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
6.  Run the migrations:
    ```bash
    python manage.py migrate
    ```
7.  Run the development server:
    ```bash
    python manage.py runserver
    ```
The backend server will be running at `http://localhost:8000`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../osij_frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm start
    ```
The frontend development server will be running at `http://localhost:3000`.

## API Documentation

The backend provides a REST API for interacting with the application services. The API endpoints are organized by app.

### Education API

*   `/education/courses/`: List all courses, or create a new course.
*   `/education/courses/<id>/`: Retrieve, update, or delete a course.
*   `/education/enrollments/`: List all enrollments, or create a new enrollment.
*   `/education/enrollments/<id>/`: Retrieve, update, or delete an enrollment.
*   `/education/certificates/`: List all certificates, or create a new certificate.
*   `/education/certificates/<id>/`: Retrieve, update, or delete a certificate.
*   `/education/lessons/`: List all lessons, or create a new lesson.
*   `/education/lessons/<id>/`: Retrieve, update, or delete a lesson.
*   `/education/lesson-progress/`: List all lesson progress, or create a new lesson progress.
*   `/education/lesson-progress/<id>/`: Retrieve, update, or delete a lesson progress.
*   `/education/live-sessions/`: List all live sessions, or create a new live session.
*   `/education/live-sessions/<id>/`: Retrieve, update, or delete a live session.

### Software Services API

*   `/software_services/services/`: List all software services, or create a new software service.
*   `/software_services/services/<id>/`: Retrieve, update, or delete a software service.
*   `/software_services/requests/`: List all service requests, or create a new service request.
*   `/software_services/requests/<id>/`: Retrieve, update, or delete a service request.
*   `/software_services/updates/`: List all project updates, or create a new project update.
*   `/software_services/updates/<id>/`: Retrieve, update, or delete a project update.
*   `/software_services/enquiries/`: List all software enquiries, or create a new software enquiry.
*   `/software_services/enquiries/<id>/`: Retrieve, update, or delete a software enquiry.
*   `/software_services/responses/`: List all support responses, or create a new support response.
*   `/software_services/responses/<id>/`: Retrieve, update, or delete a support response.

### Graphic Design API

*   `/graphic_design/designers/`: List all designers, or create a new designer.
*   `/graphic_design/designers/<id>/`: Retrieve, update, or delete a designer.
*   `/graphic_design/orders/`: List all orders, or create a new order.
*   `/graphic_design/orders/<id>/`: Retrieve, update, or delete an order.

### Cosmetology API

*   `/cosmetology/services/`: List all beauty services, or create a new beauty service.
*   `/cosmetology/services/<id>/`: Retrieve, update, or delete a beauty service.
*   `/cosmetology/stylists/`: List all stylists, or create a new stylist.
*   `/cosmetology/stylists/<id>/`: Retrieve, update, or delete a stylist.
*   `/cosmetology/appointments/`: List all appointments, or create a new appointment.
*   `/cosmetology/appointments/<id>/`: Retrieve, update, or delete an appointment.

## Frontend Documentation

The frontend is a single-page application built with React. The code is organized into the following directories:

*   `src/api`: Contains the API client for communicating with the backend.
*   `src/components`: Contains reusable UI components.
*   `src/context`: Contains React context providers for managing the application state.
*   `src/pages`: Contains the main pages of the application.

## Contributing

Contributions are welcome! Please follow these guidelines when contributing to the project:

*   **Branching:** Create a new branch for each new feature or bug fix.
*   **Commits:** Write clear and concise commit messages.
*   **Pull Requests:** Open a pull request to merge your changes into the `main` branch.
*   **Code Style:** Follow the existing code style and conventions.

## Future Instructions

Here are some suggestions for future development:

*   **Implement user profiles:** Add a user profile page where users can view their enrolled courses, service requests, and other information.
*   **Add payment integration:** Integrate a payment gateway to allow users to pay for courses and services. And also add PAYPAL_CLIENT_ID and PAYPAL_SECRET key.
*   **Improve the UI/UX:** Improve the user interface and user experience of the application.
*   **Write more tests:** Write more unit and integration tests to improve the code quality and prevent regressions.
*   **Deploy the application:** Deploy the application to a cloud platform like AWS, Google Cloud, or Heroku.

