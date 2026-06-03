# Craftly — AI Content Calendar

Craftly is a full stack SaaS application that generates 30 days of AI-powered social media content tailored to your business's industry, audience and tone.

## Live Demo
https://craftlyapp.netlify.app

## Features
- JWT authentication with secure password hashing
- Business profile setup with industry, audience, tone and platform selection
- AI-powered 30 day content calendar generation using Groq API
- Visual calendar dashboard with post type and platform color coding
- Edit, delete and mark posts as published
- Monthly content history stored in PostgreSQL
- Analytics showing total, published and pending posts

## Tech Stack
**Frontend:** React, Tailwind CSS, Axios, React Router

**Backend:** FastAPI, SQLAlchemy, PostgreSQL, Neon

**AI:** Groq API with LLaMA 3.3 70B

**Deployment:** Railway (backend), Netlify (frontend)

**Auth:** JWT tokens, bcrypt password hashing

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend folder:
DATABASE_URL=your_postgresql_url
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30


## Screenshots
Dashboard, calendar view and content generation all live at the demo link above.