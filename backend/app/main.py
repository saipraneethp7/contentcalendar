from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.api import auth, users, content

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Craftly API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(content.router, prefix="/content", tags=["Content"])

@app.get("/")
def root():
    return {"message": "ContentCalendar API is running"}