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
│   ├── static/              # Static assets
│   ├── media/               # User uploads
│   ├── manage.py
│   └── requirements.txt
│
├── osij_frontend/           # React + Tailwind frontend
│   ├── public/
│   └── src/
│       ├── api/             # API utility calls
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level views
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

Create basic API views & serializers for `education` app.

Add to root `urls.py`:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('education/', include('education.urls')),
    path('software/', include('software_services.urls')),
]
```

✅ Frontend can now access `GET /education/courses/`, `POST /software/support/`

</details>

---

<details>
<summary>🖼️ <strong>Frontend Dev Guide & Starter Setup</strong></summary>

---

### 🧰 React Setup

```bash
npm install axios
npm start
```

Confirm React is running on `localhost:3000` and Django on `localhost:8000`.

---

### 📁 Suggested React Structure

```
osij_frontend/
├── src/
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── CourseList.jsx
│   │   └── SupportForm.jsx
│   ├── pages/
│   │   ├── Courses.jsx
│   │   └── Support.jsx
│   ├── styles/
│   └── App.js
```

---

### 🔗 API Utility

`src/api/api.js`:

```js
import axios from "axios";
const BASE = "http://localhost:8000";

export const fetchCourses = () => axios.get(`${BASE}/education/courses/`);
export const submitSupport = (data) => axios.post(`${BASE}/software/support/`, data);
```

---

### 📚 Course Display

`components/CourseList.jsx`:
```jsx
const CourseList = ({ courses }) => (
  <div>
    {courses.map(course => (
      <div key={course.id}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
    ))}
  </div>
);
```

`pages/Courses.jsx`:
```jsx
import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";
import CourseList from "../components/CourseList";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses().then(res => setCourses(res.data));
  }, []);
  return <CourseList courses={courses} />;
};
```

---

### 🛠️ Support Form

`components/SupportForm.jsx`:
```jsx
import { useState } from "react";
import { submitSupport } from "../api/api";

const SupportForm = () => {
  const [issue, setIssue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitSupport({ description: issue });
    setIssue("");
    alert("Submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={issue} onChange={e => setIssue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

`pages/Support.jsx`:
```jsx
import SupportForm from "../components/SupportForm";

const Support = () => <SupportForm />;
```

---

### 👶 Beginner Notes

- Keep components small and reusable
- Test backend endpoints with Postman or your browser
- Use `console.log()` to debug
- Ask for help often — this project is built on teamwork 💙

</details>

---

<details>
<summary>👥 <strong>Team Workflow Notes</strong></summary>

- 🛠️ All work done on `main` branch for simplicity
- 🔃 Pull updates using `git pull origin main`
- ✅ Virtualenv required for backend contributors
- 🔐 Admin access restricted to trusted users only
- 📂 Media files & `.env` should be excluded from commits
- 💬 Document errors and fixes — they help the whole team grow
- 💡 Use task boards to assign and track progress
- ❤️ Help each other — everyone's still learning

</details>
```