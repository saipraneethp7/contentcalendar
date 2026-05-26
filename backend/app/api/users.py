from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def get_me(authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    return user