# OSIJ Fullstack Platform

This repository contains the source code for the OSIJ platform, a modular Django and React application that provides a wide range of services, including educational courses, software solutions, graphic design, and cosmetology services.

## Project Overview

The OSIJ platform is a full-stack application with a Django backend and a React frontend. The backend is built with a modular architecture, with separate apps for each of the main services offered by the platform. The frontend is a single-page application built with React and Tailwind CSS, with a clean and modern user interface.

The backend also includes an automatic email notification system built into the `authentication` app, sending supportive messages when users register or purchase courses.

## Features

* **Education Platform:** A comprehensive platform for online courses, with features for course creation, enrollment, lesson management, and certification.
* **Software Services:** A system for managing software service requests, with features for submitting enquiries, tracking progress, and communicating with the support team.
* **Graphic Design Services:** A platform for ordering graphic design services, with features for browsing designer portfolios, placing orders, and tracking order status.
* **Cosmetology Services:** A platform for booking cosmetology appointments, with features for browsing beauty services, viewing stylist profiles, and booking appointments.
* **User Authentication:** A complete user authentication system with support for user registration, login, and session management.
* **Automatic Notifications:** Sends welcome emails on user registration and enrollment confirmations after course purchases, creating a warm onboarding experience.
* **REST API:** A well-documented REST API for interacting with the backend services.

## Notification System

The OSIJ platform includes an automatic email notification system built into the `authentication` app. It uses Django signals and modular utilities to send supportive messages when:

* A user registers on the platform
* A user purchases a course

These emails are designed to create a warm, affirming experience for new users. Future enhancements will include admin-triggered custom messages and delivery logs.

## Technology Stack

### Backend

* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Python](https://www.python.org/)

### Frontend

* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Axios](https://axios-http.com/)
* [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

```
project_root/
├── osij_backend/
│   ├── osij_backend/        # Django settings
│   ├── authentication/      # User authentication and automatic notifications
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

* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 14+](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd CompaniesWebsite/osij_backend
    ```
3. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
4. Activate the virtual environment:
    * On Windows:
        ```bash
        venv\Scripts\activate
        ```
    * On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
5. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
6. Run the migrations:
    ```bash
    python manage.py migrate
    ```
7. Run the development server:
    ```bash
    python manage.py runserver
    ```
The backend server will be running at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../osij_frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm start
    ```
The frontend development server will be running at `http://localhost:3000`.

## API Documentation

The backend provides a REST API for interacting with the application services. The API endpoints are organized by app.

### Education API

* `/education/courses/`
* `/education/courses/<id>/`
* `/education/enrollments/`
* `/education/enrollments/<id>/`
* `/education/certificates/`
* `/education/certificates/<id>/`
* `/education/lessons/`
* `/education/lessons/<id>/`
* `/education/lesson-progress/`
* `/education/lesson-progress/<id>/`
* `/education/live-sessions/`
* `/education/live-sessions/<id>/`

### Software Services API

* `/software_services/services/`
* `/software_services/services/<id>/`
* `/software_services/requests/`
* `/software_services/requests/<id>/`
* `/software_services/updates/`
* `/software_services/updates/<id>/`
* `/software_services/enquiries/`
* `/software_services/enquiries/<id>/`
* `/software_services/responses/`
* `/software_services/responses/<id>/`

### Graphic Design API

* `/graphic_design/designers/`
* `/graphic_design/designers/<id>/`
* `/graphic_design/orders/`
* `/graphic_design/orders/<id>/`

### Cosmetology API

* `/cosmetology/services/`
* `/cosmetology/services/<id>/`
* `/cosmetology/stylists/`
* `/cosmetology/stylists/<id>/`
* `/cosmetology/appointments/`
* `/cosmetology/appointments/<id>/`

## Frontend Documentation

The frontend is a single-page application built with React. The code is organized into the following directories:

* `src/api`: Contains the API client for communicating with the backend.
* `src/components`: Contains reusable UI components.
* `src/context`: Contains React context providers for managing the application state.
* `src/pages`: Contains the main pages of the application.

## Contributing

Contributions are welcome! Please follow these guidelines when contributing to the project:

* **Branching:** Create a new branch for each new feature or bug fix.
* **Commits:** Write clear and concise commit messages.
* **Pull Requests:** Open a pull request to merge your changes into the `main` branch.
* **Code Style:** Follow the existing code style and conventions.

## Future Instructions

Here are some suggestions for future development:

* **Implement user profiles:** Add a user profile page where users can view their enrolled courses, service requests, and other information.
* **Add payment integration:** Integrate a payment gateway to allow users to pay for courses and services. And also add `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET` keys.
* **Improve the UI/UX:** Improve the user interface and user experience of the application.
* **Write more tests:** Write more unit and integration tests to improve the code quality and prevent regressions.
* **Deploy the application:** Deploy the application to a cloud platform like AWS, Google Cloud, or Heroku.
* **Expand notification system:** Add custom admin messages, delivery logs, and HTML email templates for a more personalized experience.
```