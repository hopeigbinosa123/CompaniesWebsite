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
|   ├── graphic_design/
|   ├── cosmetology/
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

Hope, this is *gorgeous*. You’ve already laid out a clear, modular, emotionally supportive guide — and now we’ll enrich it with the latest updates from our integration work, routing fixes, and learner-friendly scaffolding.

Here’s the updated section to append to your `README.md`:

---

## 🔄 React Routing & Integration Updates

### 🧠 Why This Matters

To support modular navigation and dynamic views, we’ve refactored the frontend to use **React Router**. This enables clean separation of concerns and intuitive user flows across IT Training, Software Services, and CEO dashboards.

---

### 🧭 Routing Setup

Install React Router:

```bash
npm install react-router-dom
```

Update `App.js`:

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourseCard from './components/ItTraining.js/CourseCard';
import CourseDetails from './components/ItTraining.js/Course.Details';
import EnrollmentForm from './components/ItTraining.js/EnrollmentForm';
import ProgressTracker from './components/ItTraining.js/ProgressTraining';
import VideoPlayer from './components/ItTraining.js/VideoPlayer';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Courses</Link> | <Link to="/enroll">Enroll</Link> | <Link to="/progress">Progress</Link> | <Link to="/video/1">Video</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CourseCard />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/enroll" element={<EnrollmentForm />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}
```

---

### 🧪 Backend Integration

Each component fetches data from Django endpoints using `fetch` or `axios`. Example:

```js
export const fetchCourses = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}education/courses/`);
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
};
```

✅ Ensure `.env` contains:

```ini
REACT_APP_API_URL=http://localhost:8000/
```

---

### 🧼 Common Pitfall: `react-scripts` Error

If you see:

```
'react-scripts' is not recognized...
```

Run:

```bash
npm install
```

This installs all dependencies listed in `package.json`.

---

### 🧠 Learner-Friendly Fixes

We moved component rendering from `index.js` to `App.js` to follow best practices:

- `index.js` should only bootstrap the app
- `App.js` handles layout, routing, and component logic

This helps new contributors understand React’s component hierarchy and routing flow.

---

### 🧭 Suggested Learning Flow

For new frontend contributors:

1. Start with `App.js` to understand routing
2. Explore `api/` utilities to see how data flows
3. Review `components/ItTraining.js/` for UI logic
4. Use `pages/` for layout and role-based views
5. Ask questions — we scaffold together ❤️

Perfect — let’s scaffold a modular, role-based README section for OSIJ that clearly outlines contributor responsibilities, onboarding steps, and integration boundaries. This will help new teammates understand where they fit and how to collaborate smoothly.

---

## 📘 OSIJ Contributor Guide: Role-Based Responsibilities

### 🧩 Overview

OSIJ is a modular, lore-driven platform for creative exploration and collaborative learning. Each contributor owns a distinct domain, but we work together through clear interfaces, annotated code, and emotionally supportive workflows.

---

### 🧠 Role Breakdown

| Role                  | Responsibilities                                                                 | Integration Boundaries                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------|
| **Educational Services**<br>(Hope) | - Build and maintain backend endpoints for courses and enrollments<br>- Validate user input and prevent duplicates<br>- Scaffold modular API logic for frontend use | - Does **not** handle email delivery<br>- Exposes clean endpoints for other services |
| **Email Infrastructure** | - Configure SMTP and email backend<br>- Send confirmation emails post-enrollment<br>- Maintain templates and branding | - Relies on enrollment signals from backend<br>- Does **not** modify enrollment logic |
| **Frontend Integration** | - Build React components for course display and enrollment<br>- Handle form submission and feedback<br>- Connect to backend via API | - Uses `fetchCourseById()` and `enrollInCourse()`<br>- Does **not** validate backend logic |
| **Documentation & Onboarding** | - Maintain annotated guides and modular READMEs<br>- Scaffold beginner-friendly walkthroughs<br>- Support new contributors | - Coordinates with all roles<br>- Does **not** own implementation logic |

---

### 🚀 Onboarding Steps

1. **Clone the repo** and install dependencies.
2. **Check your role** in the `README.md` or onboarding doc.
3. **Review your module**:
   - Backend: `education/views.py`, `serializers.py`, `urls.py`
   - Frontend: `CourseDetails.js`, `EnrollmentForm.js`, `api/`
   - Email: `settings.py`, `signals.py`, `mailers/`
4. **Follow integration boundaries** — use exposed functions, don’t modify other domains.
5. **Ask questions early** — we value emotional safety and collaborative learning.

---

### 🧠 Tips for New Contributors

- Use `console.log()` or Django logging to trace integration points.
- Annotate your code for future teammates.
- Celebrate small wins — every fix helps the whole system grow.

## Prince's Contribution

- **Graphic Design Module**: Built responsive UI using React + Tailwind, structured components, and integrated routing  
- **Cosmetology Module**: Designed booking flow, dashboard layout, and gallery components  
- **Role**: Frontend Developer — collaborated with Tonia, Abel, and Lifa.

## Contributions

###  Git Conflict Resolution & Repo Cleanup

- Identified and resolved merge conflicts caused by tracked `.pyc` files
- Updated `.gitignore` to exclude Python cache files (`*.pyc`, `__pycache__/`)
- Removed unnecessary compiled files from version control using `git rm --cached`
- Safely completed rebase using `git rebase --skip` to bypass non-essential commits
- Ensured a clean commit history and smooth push to `main` branch for group submission

This cleanup improves repo clarity, reduces future merge conflicts, and supports a more maintainable codebase for students and collaborators.

Update: Final cleanup completed on August 29, 2025 — all modules rebased and pushed by Prince.

Contribution by Prince: Finalized frontend modules and documented setup steps.


