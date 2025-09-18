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

## 🧩 Modules

### 🎨 Graphic Design Services

✅ **Sprint Completed – 15 Sept 2025**

- Public designer is now listed via `/designers/`
- Designer detail view with profile
- Order form has been linked to designer via `/graphic-design/order/:id`
- Frontend form built with validation and submission logic to ehance user experience
- Backend accepts public and authenticated orders via `/design-orders/`

