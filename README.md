# ✍️ Craftly — AI Content Calendar

Generate 30 days of social media content for any business in seconds.

**Live Demo:** https://craftlyapp.netlify.app

## What is Craftly?

Small business owners and creators struggle to stay consistent on social media. They either hire expensive social media managers or simply don't post. Craftly solves this by using AI to generate a full month of platform-specific content tailored to their business in seconds.

## Features

- JWT authentication with bcrypt password hashing
- Business profile setup with industry, audience, tone and platform selection
- AI-powered 30 day content calendar generation using Groq API and LLaMA 3.3 70B
- Visual calendar dashboard with color coded platform and post type badges
- Edit, delete and mark posts as published
- Monthly analytics showing total, published and pending posts
- Responsive design built with Tailwind CSS

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** FastAPI, SQLAlchemy, Pydantic
- **Database:** PostgreSQL hosted on Neon
- **AI:** Groq API with LLaMA 3.3 70B
- **Auth:** JWT tokens with bcrypt password hashing
- **Deployment:** Railway for backend, Netlify for frontend

## Getting Started

Clone the repo and set up both folders.

**Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm start
```

**Environment Variables**

```bash
Create a .env file in the backend folder with these keys:

DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login and get JWT token |
| GET | /users/me | Get current user |
| POST | /content/business-profile | Create business profile |
| GET | /content/business-profile | Get business profile |
| POST | /content/generate | Generate 30 days of content |
| GET | /content/posts/{id} | Get posts for a month |
| PATCH | /content/posts/{id} | Update a post |
| DELETE | /content/posts/{id} | Delete a post |

## License

MIT
