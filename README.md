# OSIJ Fullstack Platform: A Comprehensive Guide

Welcome to the OSIJ Fullstack Platform! This document serves as a complete guide for lecturers, students, and developers to understand, set up, and run this project.

The OSIJ platform is a modular full-stack application built with a **Django** backend and a **React** frontend. It offers a diverse range of services, including an education platform, software service management, graphic design orders, and a cosmetology appointment system.

## 1. Project Overview

This project is designed to showcase a real-world, modular application structure. The backend consists of several independent Django apps, each responsible for a specific business domain. This promotes a clean architecture and separation of concerns. The frontend is a modern single-page application (SPA) using React, offering a dynamic and responsive user experience.

A key feature is the **automatic email notification system**, which sends welcome emails to new users and confirmation messages for various actions, creating a more engaging user experience.

### Key Features:

*   **Modular Service Architecture:** Separate Django apps for each service (Education, Software, etc.).
*   **REST API:** A comprehensive API built with Django REST Framework for seamless frontend-backend communication.
*   **JWT Authentication:** Secure, token-based authentication for users.
*   **React Frontend:** A dynamic and responsive user interface built with React and styled with Tailwind CSS.
*   **Payment Integration:** Pre-configured for course and service payments using PayPal.
*   **Automated Email Notifications:** Enhances user communication for events like registration and purchases.

## 2. Technology Stack

| Area      | Technology                                                              |
| :-------- | :---------------------------------------------------------------------- |
| **Backend** | Python, Django, Django REST Framework, Django Simple JWT                |
| **Frontend**  | React, React Router, Axios, Tailwind CSS                                |
| **Database**  | SQLite 3 (for development), MySQL (optional)                            |
| **Payments**  | PayPal REST SDK, @paypal/react-paypal-js                                |

---
## 3. Project Architecture

This diagram illustrates the high-level architecture of the OSIJ platform.

```mermaid
graph TD
    subgraph User
        A[Browser]
    end

    subgraph Frontend (React)
        B[React App on Vercel/Netlify]
    end

    subgraph Backend (Django)
        C[Django REST API on Heroku]
        D[Database (PostgreSQL/MySQL/SQLite)]
        E[PayPal API]
    end

    A -- HTTPS --> B
    B -- API Calls (HTTPS) --> C
    C -- Reads/Writes --> D
    C -- Interacts with --> E
```

---

## 4. Setup and Installation

Follow these instructions carefully to get the project running on your local machine.

### 4.1. Prerequisites

Ensure you have the following software installed:

*   [Python 3.10+](https://www.python.org/downloads/)
*   [Node.js 14+](https://nodejs.org/en/download/)
*   [Git](https://git-scm.com/downloads)

### 4.2. Backend Setup (`osij_backend`)

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
    cd CompaniesWebsite
    ```

2.  **Navigate to the Backend Directory:**
    ```bash
    cd osij_backend
    ```

3.  **Create and Activate a Python Virtual Environment:**
    *A virtual environment is crucial as it isolates project-specific dependencies.*
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
    Your terminal prompt should now be prefixed with `(venv)`.

4.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Create the Backend Environment File (`.env`):**
    *   In the `osij_backend` directory, create a new file named `.env`.
    *   This file will hold your secret keys and environment-specific settings.
    *   Copy and paste the following content into it, replacing the placeholder values:

    ```ini
    # Django Secret Key - Generate a new one for production
    SECRET_KEY='your-super-secret-key-here'

    # Debug Mode - Set to False in production
    DEBUG=True

    # Allowed Hosts (space-separated) - Use * for development if needed
    ALLOWED_HOSTS=localhost 127.0.0.1

    # PayPal API Credentials (from your PayPal Developer account)
    PAYPAL_CLIENT_ID='your-paypal-client-id'
    PAYPAL_SECRET='your-paypal-secret'

    # PayPal Redirect URLs
    PAYPAL_RETURN_URL=http://localhost:3000/dashboard/payment/success
    PAYPAL_CANCEL_URL=http://localhost:3000/dashboard/payment/cancel
    ```

6.  **Run Database Migrations (for default SQLite setup):**
    *This command creates the database schema based on your models.*
    ```bash
    python manage.py migrate
    ```

7.  **Create a Superuser (Administrator):**
    *This account will allow you to access the Django admin panel.*
    ```bash
    python manage.py createsuperuser
    ```
    Follow the prompts to set a username, email, and password.

### 4.3. Frontend Setup (`osij-frontend`)

1.  **Navigate to the Frontend Directory:**
    *(From the project root)*
    ```bash
    cd osij-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create the Frontend Environment File (`.env.local`):**
    *   In the `osij-frontend` directory, create a new file named `.env.local`.
    *   This file stores the PayPal Client ID needed by the React app.
    *   Add the following content, using the **same Client ID** as in the backend `.env` file:

    ```
    REACT_APP_PAYPAL_CLIENT_ID='your-paypal-client-id'
    ```

### 4.4. Optional: Using MySQL as the Database

By default, this project uses SQLite for simplicity. Follow these steps if you wish to run the project with a MySQL database.

**1. Prerequisites:**
*   You must have a MySQL server installed and running on your machine or network.
*   You must create an empty database for the project. For example, you can name it `osij_db`.

**2. Install the MySQL Client Driver:**
*   In your activated Python virtual environment, install the `mysqlclient` package:
    ```bash
    pip install mysqlclient
    ```

**3. Modify Django Settings:**
*   Open the settings file at `osij_backend/osij_backend/settings.py`.
*   Find the `DATABASES` section. It currently looks like this:
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
    ```
*   **Comment out the existing SQLite configuration and replace it** with your MySQL database details. Your new configuration should look like this:
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'osij_db',         # Your database name
            'USER': 'your_mysql_user', # Your MySQL username
            'PASSWORD': 'your_mysql_password', # Your MySQL password
            'HOST': 'localhost',       # Or your DB host IP/domain
            'PORT': '3306',            # Default MySQL port
            'OPTIONS': {
                'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            },
        }
    }
    ```
    **Important:** Replace the placeholder values for `NAME`, `USER`, `PASSWORD`, `HOST`, and `PORT` with your actual database credentials.

**4. Run Migrations on the New Database:**
*   After configuring the settings, run the `migrate` command to create all the project tables in your MySQL database.
    ```bash
    python manage.py migrate
    ```

Your project is now configured to use MySQL. When you run the backend, it will connect to the specified MySQL database instead of the `db.sqlite3` file.

---

## 5. Running the Application

To run the application, you need to start both the backend and frontend servers.

1.  **Start the Backend Server:**
    *   Open a terminal, navigate to `osij_backend`, and ensure your virtual environment is active.
    *   Run the server:
        ```bash
        python manage.py runserver
        ```
    *   The backend API will be running at `http://localhost:8000`. You can access the admin panel at `http://localhost:8000/admin/`.

2.  **Start the Frontend Server:**
    *   Open a **new** terminal and navigate to `osij-frontend`.
    *   Run the server:
        ```bash
        npm start
        ```
    *   The frontend application will open automatically in your browser at `http://localhost:3000`.

### How They Connect
The React frontend at `http://localhost:3000` sends API requests to the Django backend at `http://localhost:8000`. This is configured in `osij-frontend/src/api/axiosConfig.js`. The `django-cors-headers` package on the backend is configured to allow these cross-origin requests during development.

---

## 6. Core Data Models

This section provides an overview of the main database models for each service.

### Education
*   **Course:** Represents a course with a title, description, price, and instructor.
*   **Lesson:** A single lesson within a course (e.g., video, text, or quiz).
*   **Enrollment:** Links a `User` to a `Course`, tracking their progress.
*   **Certificate:** Issued to a `User` upon completion of a `Course`.

### Cosmetology
*   **BeautyService:** A service offered, like a haircut or manicure, with a price and duration.
*   **StylistProfile:** Represents a stylist, their specialization, and availability.
*   **AppointmentBooking:** A record of a `User` booking a `BeautyService` with a `StylistProfile` at a specific time.

### Graphic Design
*   **Designer:** Represents a graphic designer with their name, specialty, and portfolio.
*   **DesignService:** A type of design service offered (e.g., Logo Design).
*   **DesignOrder:** A user's request for a specific design, including a brief, budget, and status.

### Software Services
*   **SoftwareService:** A type of software development service offered (e.g., Web Development).
*   **ServiceRequest:** A formal request from a user for a `SoftwareService`, including project details and budget.
*   **SoftwareEnquiry:** A more general-purpose inquiry from a user about a software problem.

---

## 7. API Endpoint Reference

Below is a summary of the key API endpoints. The base URL for all endpoints is `/api/`.

### Authentication (`/auth/...`)
| Method | Endpoint         | Description                   |
| :----- | :--------------- | :---------------------------- |
| `POST` | `/register/`     | Creates a new user account.   |
| `POST` | `/login/`        | Obtains JWT access/refresh tokens. |
| `POST` | `/logout/`       | Blacklists a refresh token.   |

### Education (`/education/...`)
| Method | Endpoint             | Description                               |
| :----- | :------------------- | :---------------------------------------- |
| `GET`  | `/courses/`          | Lists all available courses.              |
| `GET`  | `/courses/<id>/`     | Retrieves details for a single course.    |
| `POST` | `/enroll/`           | Enrolls the current user in a course.     |
| `GET`  | `/my-enrollments/`   | Lists all courses the user is enrolled in.|

### Cosmetology (`/cosmetology/...`)
| Method | Endpoint         | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `GET`  | `/services/`     | Lists all available beauty services.|
| `GET`  | `/stylists/`     | Lists all available stylists.      |
| `POST` | `/bookings/`     | Creates a new appointment booking.  |

---

## 8. User and Service Guides

### 8.1. User Authentication

*   **Registration:** Navigate to the "Register" page on the frontend. Fill out the form to create a new account. Upon successful registration, a welcome email will be printed to the backend console (as `EMAIL_BACKEND` is set to `console.EmailBackend`).
*   **Login:** Navigate to the "Login" page. Use the credentials of the user you just created or the superuser account. Upon login, a JSON Web Token (JWT) is saved in your browser's `localStorage`, authenticating you for future API requests.

### 8.2. Service Management (Admin Guide)

Most services are managed by an administrator through the **Django Admin Panel**.

*   **Accessing the Admin Panel:** Go to `http://localhost:8000/admin/` and log in with your superuser account.

*   **Education / IT Training:**
    *   In the admin panel, locate the **Education** section.
    *   Here you can add, update, or delete `Courses`, `Lessons`, and `Live Sessions`. This is the primary way to manage the educational content offered.

*   **Software Services:**
    *   In the admin panel, find the **Software Services** section.
    *   You can define the `Software Services` offered.
    *   When a user submits a request through the frontend, a `Service Request` or `Software Enquiry` will appear here, which an admin can then manage.

### 8.3. User Flows (Frontend Guide)

*   **Booking a Cosmetology Appointment:**
    1.  Navigate to the Cosmetology section of the website.
    2.  Browse the list of available services.
    3.  Select a service to view details and available stylists.
    4.  Fill out the booking form to schedule an appointment.

*   **Enrolling in a Course (with PayPal):**
    1.  Navigate to the Education section.
    2.  Select a course and click "Enroll Now".
    3.  You will be redirected to a payment page where the PayPal button is displayed.
    4.  Clicking the PayPal button will open the PayPal payment window to complete the transaction.
    5.  Upon successful payment, you will be redirected back to the site.

---

## 9. Basic Deployment Guide

This is a high-level guide. Actual deployment may require more specific steps based on your configuration.

### Backend (Django on Heroku)
1.  **Install Gunicorn:** `pip install gunicorn`
2.  **Create `Procfile`:** In `osij_backend`, create a file named `Procfile` with the content: `web: gunicorn osij_backend.wsgi --log-file -`
3.  **Configure `settings.py` for Production:**
    *   Set `DEBUG = False`.
    *   Set `ALLOWED_HOSTS` to your Heroku app's domain.
    *   Configure a production database (like PostgreSQL) using `dj-database-url`.
4.  **Create a Heroku App:** Use the Heroku CLI: `heroku create your-app-name`
5.  **Push to Heroku:** `git push heroku main`
6.  **Set Environment Variables:** In the Heroku dashboard, set all the variables from your `.env` file.

### Frontend (React on Vercel)
1.  **Push to GitHub:** Ensure your project is on a GitHub repository.
2.  **Import Project:** In your Vercel dashboard, import the GitHub repository.
3.  **Configure Project:**
    *   Select `osij-frontend` as the Root Directory.
    *   The build command and output directory should be detected automatically (`npm run build`, `build`).
4.  **Set Environment Variables:** Add `REACT_APP_PAYPAL_CLIENT_ID` in the Vercel project settings.
5.  **Deploy:** Click the "Deploy" button.

---

## 10. Troubleshooting

*   **CORS Error:** If the frontend shows a "Cross-Origin Resource Sharing" error, ensure the backend server is running and that `CORS_ALLOWED_ORIGINS` in `osij_backend/settings.py` includes `http://localhost:3000`. For development, you can set `CORS_ALLOW_ALL_ORIGINS = True`.
*   **`npm install` Fails:** Delete the `node_modules` directory and the `package-lock.json` file, then run `npm install` again.
*   **PayPal Button Not Appearing:** Ensure the `REACT_APP_PAYPAL_CLIENT_ID` is set correctly in `osij-frontend/.env.local` and that you have **restarted** the frontend server after creating the file.
*   **Migrations Fail:** If `python manage.py migrate` fails, ensure your models have no errors. You may need to delete the `db.sqlite3` file and the migration files in each app's `migrations` directory (except `__init__.py`) to start fresh, but **this will delete all data**.

---

## 11. Future Improvements

This project has a solid foundation but can be extended in many ways:

*   **Build Out Frontend Pages:** Create dedicated frontend pages for Education, Software Services, and Graphic Design to allow users to interact with them more fully.
*   **User Dashboards:** Create a profile page for logged-in users to view their enrolled courses, appointment bookings, and order history.
*   **Refine UI/UX:** Enhance the visual design and user experience across the application for a more polished feel.
*   **Advanced Email Notifications:** Integrate a real email service (like SendGrid or Mailgun) and create HTML email templates for more professional communication.
*   **Testing:** Expand the test suite with more unit and integration tests to ensure code quality and reliability.
