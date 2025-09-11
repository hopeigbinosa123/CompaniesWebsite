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

# PayPal Setup Instructions

## Prerequisites

Before you can use PayPal payments in your application, you need to set up a PayPal Developer account and get your API credentials.

## Step 1: Create PayPal Developer Account

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/developer/applications/)
2. Sign in with your PayPal account or create a new one
3. Navigate to "My Apps & Credentials"

## Step 2: Create a New App

1. Click "Create App"
2. Give your app a name (e.g., "OSIJ Course Payments")
3. Select "Merchant" as the app type
4. Click "Create App"

## Step 3: Get Your Client ID

1. After creating the app, you'll see your **Client ID** and **Client Secret**
2. Copy the **Client ID** - this is what you need for the frontend

## Step 4: Set Up Environment Variable

Create a `.env.local` file in your `osij-frontend` directory with the following content:

```bash
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

Replace `your_paypal_client_id_here` with the actual Client ID you copied from PayPal.

## Step 5: Restart Your Development Server

After creating the `.env.local` file, you need to restart your React development server:

```bash
cd osij-frontend
npm start
```

## Step 6: Test the Integration

1. Navigate to a course and click "Enroll Now"
2. You should be redirected to the payment page
3. The PayPal button should now load properly
4. You can test with PayPal's sandbox environment

## Important Notes

- **Sandbox Mode**: By default, PayPal uses sandbox mode for testing. You don't need real money to test.
- **Environment Variables**: Make sure your `.env.local` file is in the root of your frontend directory.
- **Security**: Never commit your `.env.local` file to version control. It's already in `.gitignore`.
- **Backend Configuration**: You also need to configure PayPal credentials in your Django backend settings.

## Backend Configuration

In your Django backend (`osij_backend`), make sure you have the following environment variables set:

```bash
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_SECRET=your_paypal_secret_here
PAYPAL_RETURN_URL=http://localhost:3000/dashboard/payment/success
PAYPAL_CANCEL_URL=http://localhost:3000/dashboard/payment/cancel
```

## Troubleshooting

If you still see the "PayPal client ID is not configured" error:

1. Double-check that you created the `.env.local` file in the correct directory (`osij-frontend/`)
2. Make sure the variable name is exactly `REACT_APP_PAYPAL_CLIENT_ID`
3. Restart your development server after making changes
4. Check the browser console for any additional errors

## PayPal SDK Documentation

For more information about the PayPal React SDK, visit:
- [PayPal React SDK Documentation](https://developer.paypal.com/docs/business/checkout/react-integration/)
- [PayPal Developer Portal](https://developer.paypal.com/)
```