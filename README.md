# 💡 OSIJ Fullstack Development Guide

Modular Django + React project powering the OSIJ platform — built for scalable, lore-driven services and smooth user flows. This guide includes everything backend and frontend devs need to get started.

---

<details>
<summary>📁 <strong>Project Structure</strong></summary>

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
├── .env
└── README.md
```

</details>

---

<details>
<summary>🚀 <strong>Getting Started (Backend)</strong></summary>

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

</details>

---

<details>
<summary>🛠️ <strong>Admin Panel Setup</strong></summary>

```bash
python manage.py createsuperuser
```

Register models in `admin.py`:

```python
from django.contrib import admin
from .models import Course, Enrollment, Certificate
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Certificate)
```

🔐 Panel URL: [`http://localhost:8000/admin`](http://localhost:8000/admin)

</details>

---

<details>
<summary>🧩 <strong>Backend App Overview</strong></summary>

| App Name            | Role                                   | Models |
|---------------------|----------------------------------------|--------|
| `education`          | Courses, enrollments, certificates     | `Course`, `Enrollment`, `Certificate` |
| `software_services`  | Enquiries + support responses          | `SoftwareEnquiry`, `SupportResponse` |

✅ All models are migration-ready and integrated with Django admin.

</details>

---

<details>
<summary>🌐 <strong>API Exposure & Routing</strong></summary>

🔧 Install Django REST Framework + CORS headers:
```bash
pip install djangorestframework django-cors-headers
```

Update `settings.py`:
```python
INSTALLED_APPS = ['rest_framework', 'corsheaders', ...]
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOWED_ORIGINS = ['http://localhost:3000']
```

Add app routes:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('education/', include('education.urls')),
    path('software/', include('software_services.urls')),
]
```

### 🔗 Key Endpoints for Admin Dashboards

| Method | Endpoint                             | Purpose                         |
|--------|--------------------------------------|----------------------------------|
| GET    | `/education/sessions/`               | Fetch IT training sessions       |
| POST   | `/education/feedback/`               | Submit feedback form             |
| GET    | `/software/enquiries/?status=open`   | Filter service enquiries         |
| POST   | `/software/responses/`               | Submit enquiry response          |

</details>

---

<details>
<summary>🖼️ <strong>Frontend Dev Guide</strong></summary>

### 🧰 Setup

```bash
npm install axios
npm start
```

Confirm React is running on `http://localhost:3000`

---

### 📁 Suggested CRA Structure (with Admin Panels)

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

### 🔗 API Utilities

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

### 🔐 Role-Based Routing (Optional)

```jsx
<Route path="/admin/it-training" element={<ITDashboard />} />
<Route path="/admin/software-services" element={<SupportDashboard />} />
<Route path="/admin/master" element={<MasterDashboard />} />
```

</details>

---

<details>
<summary>👥 <strong>Team Workflow Notes</strong></summary>

- 🛠️ Work is done on `main` branch
- 🔃 Use `git pull origin main` to stay updated
- ✅ Use virtualenv for backend development
- 🔐 Keep admin access secure
- 📂 Exclude `.env` and media files from commits
- 💬 Document bugs and fixes for shared learning
- 💡 Use task boards to track work
- ❤️ Lift each other up — everyone's growing

</details>
```