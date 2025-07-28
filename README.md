# 💡 OSIJ Backend and Frontend Development Application

A modular **Django backend** powering the OSIJ platform — designed for scalable, lore-driven services and smooth user flows.

---

## 📁 Project Structure

```
project_root/
├── osij_frontend/           # React + Tailwind frontend
│   └── ...
│
├── osij_backend/
│   ├── osij_backend/        # Global Django settings
│   ├── services/            # Core backend logic
│   ├── static/              # Static files (optional)
│   ├── media/               # User-uploaded content
│   ├── manage.py            # CLI tool for backend control
│   └── requirements.txt     # Python dependencies
├── .env                     # Environment variables (hidden from Git)
└── README.md                # You're reading it!
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hopeigbinosa123/CompaniesWebsite.git
cd osij_backend
```

### 2. Create & activate virtual environment

```bash
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Create `.env` file (optional but recommended)

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### 5. Run migrations

```bash
python manage.py migrate
```

### 6. Start the development server

```bash
python manage.py runserver
```

Your backend will now be available at `http://127.0.0.1:8000/`

---

## 🧩 App Overview — `services`

Handles core platform features like service creation, content delivery, and user flows.

| File | Role |
|------|------|
| `models.py` | Database models |
| `views.py` | Business logic and controller actions |
| `urls.py` | App-level routing |
| `serializers.py` | API data formatting (if using DRF) |
| `admin.py` | Admin panel registration |

---

## 🛠️ Admin Panel Setup

Django includes a built-in admin dashboard to manage backend data visually.

### Step 1: Create superuser

```bash
python manage.py createsuperuser
```

Follow the prompts for username, email, and password.

### Step 2: Register models

In `services/admin.py`, register models like:

```python
from django.contrib import admin
from .models import YourModelName

admin.site.register(YourModelName)
```

### Step 3: Access the dashboard

```bash
python manage.py runserver
```

Visit [`http://127.0.0.1:8000/admin/`](http://127.0.0.1:8000/admin/) and log in using your superuser credentials.

---

## 🌐 Routing Guide

Update `osij_backend/urls.py` as needed:

```python
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('services.urls')),
]
```

Sample endpoint: `GET /api/services/`

---

## 🔧 Dev Tips

- Use Postman to test endpoints
- Add Django REST Framework (DRF) for browsable APIs
- Consider Swagger UI for documentation
- Avoid committing `.env`, database files, or migrations without confirming

---

## 👥 Team Workflow Notes

- **Single branch setup**: all work is done on `main` for simplicity
- **Updates**: teammates should run `git pull origin main` to get the latest code
- **Virtualenv required**: make sure teammates activate before installing packages
- **Admin access**: only trusted roles should create superusers or manage live data