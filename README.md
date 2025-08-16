<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# 💡 OSIJ Fullstack Development Guide

Modular Django + React project powering the OSIJ platform — built for scalable, lore-driven services and emotionally supportive user flows. This guide equips backend and frontend developers with everything they need to contribute confidently.

---

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```
project_root/
├── osij_backend/
│   ├── osij_backend/        # Django settings
│   ├── education/           # Course delivery + certificates
│   ├── software_services/   # Enquiry system & support flow
│   ├── static/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
├── osij_frontend/           # React + Tailwind frontend
│   ├── public/
│   └── src/
│       ├── api/
│       ├── admin/
│       │   ├── ITTraining/
│       │   ├── SoftwareServices/
│       │   └── CEO/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── App.js
├── .env                     # Environment config (excluded from commits)
└── README.md
```

</details>

---

## 🚀 Getting Started (Backend)

```bash
git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
cd osij_backend

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

🔗 App runs at [`http://localhost:8000`](http://localhost:8000)

---

## 🔐 Environment Setup

Create a `.env` file based on the following template:

```ini
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:pass@localhost:5432/osij
```

✅ `.env` should be excluded from commits via `.gitignore`

---

## 🛠️ Admin Panel Setup

Create your admin account:

```bash
python manage.py createsuperuser
```

Sample model registration:

```python
from django.contrib import admin
from .models import Course, Enrollment, Certificate

admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Certificate)
```

🔐 Panel URL: [`http://localhost:8000/admin`](http://localhost:8000/admin)

---

## 🧩 Backend App Overview

| App Name            | Role                                   | Models |
|---------------------|----------------------------------------|--------|
| `education`          | Courses, enrollments, certificates     | `Course`, `Enrollment`, `Certificate` |
| `software_services`  | Enquiries + support responses          | `SoftwareEnquiry`, `SupportResponse` |

✅ All models are migration-ready and integrated with Django admin.

---

## 📦 Model Field Reference

Here’s a quick breakdown of `SoftwareEnquiry` to support backend logic and frontend integrations:

| Field Name               | Type             | Notes                                |
|--------------------------|------------------|---------------------------------------|
| `user`                   | `ForeignKey`     | Linked to `User`                      |
| `problem_title`          | `CharField`      | Required title                        |
| `problem_description`    | `TextField`      | Detailed issue                        |
| `platform`               | `CharField`      | Optional (e.g., Windows, macOS)       |
| `attachment`             | `FileField`      | Optional upload                       |
| `preferred_contact_method`| `CharField`     | Email / Phone / Live Chat             |
| `status`                 | `CharField`      | Default = `"open"`, 4 choices         |
| `submitted_at`           | `DateTimeField`  | Auto-generated on submit              |

---

## 🌐 API Exposure & Routing

Install API dependencies:

```bash
pip install djangorestframework django-cors-headers
```

Update `settings.py`:

```python
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = ['http://localhost:3000']
```

Define backend routes:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('education/', include('education.urls')),
    path('software/', include('software_services.urls')),
]
```

---

## 🔗 API Endpoint Reference

| Method | Endpoint                             | Purpose                         |
|--------|--------------------------------------|----------------------------------|
| GET    | `/education/sessions/`               | Fetch IT training sessions       |
| POST   | `/education/feedback/`               | Submit feedback form             |
| GET    | `/software/enquiries/?status=open`   | Filter service enquiries         |
| POST   | `/software/responses/`               | Submit enquiry response          |

---

## 🧠 Frontend-Backend Flow Example

### From `SupportDashboard.jsx`:
```js
postResponse({ enquiry_id, message, responder_id })
```

🔁 Hits backend:
```http
POST /software/responses/
↳ Creates a SupportResponse linked to the correct enquiry
```

✅ This modular mapping helps new devs understand fullstack logic.

---

## 🖼️ Frontend Dev Guide

### Setup

```bash
npm install axios
npm start
```

React should run at [`http://localhost:3000`](http://localhost:3000)

---

### Suggested CRA Structure

```
osij_frontend/
├── src/
│   ├── api/
│   ├── admin/
│   │   ├── ITTraining/
│   │   │   ├── ITDashboard.jsx
│   │   │   ├── SessionList.jsx
│   │   │   └── FeedbackForm.jsx
│   │   ├── SoftwareServices/
│   │   │   ├── SupportDashboard.jsx
│   │   │   ├── EnquiryTable.jsx
│   │   │   └── ResponseForm.jsx
│   │   └── CEO/
│   │       └── MasterDashboard.jsx
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
```

---

### API Utilities

`src/api/adminApi.js`:

```js
import axios from "axios";
const BASE = "http://localhost:8000";

export const fetchSessions = () => axios.get(`${BASE}/education/sessions/`);
export const postFeedback = (data) => axios.post(`${BASE}/education/feedback/`, data);
export const fetchEnquiries = () => axios.get(`${BASE}/software/enquiries/?status=open`);
export const postResponse = (data) => axios.post(`${BASE}/software/responses/`, data);
```

---

### Optional: Role-Based Routing

```jsx
<Route path="/admin/it-training" element={<ITDashboard />} />
<Route path="/admin/software-services" element={<SupportDashboard />} />
<Route path="/admin/master" element={<MasterDashboard />} />
```

---

## 🧭 Deployment Notes (WIP)

Prepare for production with:

- Docker setup (optional)
- PostgreSQL for scalability
- Railway or Heroku deployment flow
- Static/media file handling via AWS S3 or similar

A deployment guide will be added once the platform is ready for staging.

---

## 👥 Team Workflow Notes

- 🛠️ Work is done on `main` branch
- 🔃 Use `git pull origin main` to stay updated
- ✅ Always use virtualenv for backend dev
- 🔐 Admin access should remain secure
- 📂 Exclude `.env`, media, and migration folders from commits unless intentional
- 🐞 Log and comment bugs as learning artifacts
- 🗂️ Use task boards for modular planning
- ❤️ Encourage and uplift — progress over perfection
>>>>>>> 5f0dcf0951f8411d940316c2e882197d6c05d188
