# OSIJ Fullstack Platform (`gemini.md`)

This document provides a comprehensive overview of the OSIJ platform, a modular Django and React application. It includes details on the project's architecture, features, setup instructions, and more.

## 1. Project Overview

The OSIJ platform is a full-stack application featuring a Django backend and a React frontend. It is designed with a modular architecture, where each primary service is a separate Django app. This promotes separation of concerns and scalability. The frontend is a modern single-page application (SPA) built with React and styled with Tailwind CSS.

A key feature of the backend is an automatic email notification system within the `authentication` app, which sends welcoming messages to users upon registration and confirmation emails after course purchases.

## 2. Features

*   **Education Platform:** A complete system for online courses, including course creation, enrollment, lesson management, and certification.
*   **Software Services:** A module for managing software service requests, from initial inquiry to project completion.
*   **Graphic Design Services:** A platform for ordering graphic design work, including portfolio browsing and order tracking.
*   **Cosmetology Services:** A system for booking beauty and spa appointments with stylist profiles.
*   **User Authentication:** A robust user authentication system supporting registration, login, and session management.
*   **Payment Processing:** Integration with PayPal for handling payments for services and courses.
*   **Automatic Notifications:** An email notification system to enhance user experience during onboarding and purchases.
*   **REST API:** A comprehensive REST API for seamless communication between the frontend and backend.

## 3. Technologies Used

### Backend (Django)

*   **Framework:** Django, Django REST Framework
*   **Database:** (Not specified, likely SQLite for development)
*   **Authentication:** djangorestframework-simplejwt (JWT for token-based authentication)
*   **Payments:** django-paypal, paypalrestsdk
*   **Environment Management:** python-dotenv, django-environ
*   **Others:** Pillow (for image handling), django-cors-headers (for Cross-Origin Resource Sharing)

### Frontend (React)

*   **Framework:** React
*   **Routing:** React Router
*   **HTTP Client:** Axios
*   **Styling:** Tailwind CSS
*   **Payments:** @paypal/react-paypal-js
*   **Development Tools:** Webpack, Babel, ESLint

## 4. Project Structure

```
C:\Users\hopei\Downloads\Internship\CompaniesWebsite\
├── osij_backend/
│   ├── osij_backend/        # Django project settings
│   ├── Authentication/      # User authentication and notifications
│   ├── cosmetology/         # Cosmetology services app
│   ├── education/           # Education platform app
│   ├── graphic_design/      # Graphic design services app
│   ├── software_services/   # Software services app
│   ├── payments/            # Payment processing app
│   ├── manage.py            # Django's command-line utility
│   └── requirements.txt     # Backend dependencies
├── osij-frontend/           # React frontend application
│   ├── public/              # Public assets
│   └── src/
│       ├── api/             # API communication layer
│       ├── components/      # Reusable React components
│       ├── context/         # Application-wide state management
│       ├── pages/           # Top-level page components
│       └── App.js           # Main application component
├── venv/                    # Python virtual environment
└── gemini.md                # This file
```

## 5. Setup and Installation

### Prerequisites

*   Python 3.10+
*   Node.js 14+
*   Git

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
    cd CompaniesWebsite
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd osij_backend
    ```
3.  **Create and activate a virtual environment:**
    *   On Windows:
        ```bash
        python -m venv venv
        venv\Scripts\activate
        ```
    *   On macOS/Linux:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run database migrations:**
    ```bash
    python manage.py migrate
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../osij-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 6. Running the Application

### Backend

With your virtual environment activated, run the development server from the `osij_backend` directory:

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`.

### Frontend

From the `osij-frontend` directory, start the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

## 7. API Endpoints

The backend exposes the following REST API endpoints, prefixed with `/api/`:

*   **Authentication (`/auth/`)**
    *   `POST /register/`: User registration.
    *   `POST /login/`: User login.
    *   `POST /logout/`: User logout.
    *   `GET, PUT /profile/`: User profile management.
    *   `GET /csrf/`: Get CSRF token.
*   **Education (`/education/`)**
    *   `GET /courses/`: List all courses.
    *   `GET /courses/<id>/`: Get course details.
    *   `GET /enrollments/`, `POST /enroll/`: Manage enrollments.
*   **Software Services (`/software-services/`)**
    *   `GET /services/`: List available software services.
    *   `POST /requests/`: Create a new service request.
    *   `GET /my-requests/`: List user's service requests.
*   **Graphic Design (`/graphic-design/`)**
    *   `GET /designers/`: List designers.
    *   `POST /orders/`: Create a new design order.
*   **Cosmetology (`/cosmetology/`)**
    *   `GET /services/`: List beauty services.
    *   `POST /bookings/`: Create a new appointment booking.
*   **Payments (`/payments/`)**
    *   `POST /create-order/`: Create a PayPal order.
    *   `POST /capture-order/<order_id>/`: Capture a PayPal order.

## 8. Database Models

*   **Authentication**: `User` (custom user model).
*   **Cosmetology**: `BeautyService`, `StylistProfile`, `AppointmentBooking`.
*   **Education**: `Course`, `Lesson`, `LiveSession`, `Enrollment`, `LessonProgress`, `Certificate`.
*   **Graphic Design**: `Designer`, `Order`.
*   **Software Services**: `SoftwareService`, `ServiceRequest`, `ProjectUpdate`, `SoftwareEnquiry`, `SupportResponse`.
*   **Payments**: `Payment`.

## 9. Contributing

Contributions are welcome. Please adhere to the following guidelines:

*   **Branching:** Create a new branch for each feature or bug fix.
*   **Commits:** Write clear and concise commit messages.
*   **Pull Requests:** Open a pull request to merge your changes into the `main` branch.
*   **Code Style:** Follow the existing code style and conventions.

## 10. License

This project is currently unlicensed.
