from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.content import BusinessProfile, ContentPost
from app.schemas.content import (
    BusinessProfileCreate,
    BusinessProfileResponse,
    ContentPostResponse,
    GenerateContentRequest,
    UpdatePostRequest
)
from app.api.auth import get_current_user
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/business-profile", response_model=BusinessProfileResponse)
def create_business_profile(profile: BusinessProfileCreate, authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    existing = db.query(BusinessProfile).filter(BusinessProfile.user_id == user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Business profile already exists")
    new_profile = BusinessProfile(
        user_id=user.id,
        business_name=profile.business_name,
        industry=profile.industry,
        target_audience=profile.target_audience,
        tone=profile.tone,
        platforms=profile.platforms
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/business-profile", response_model=BusinessProfileResponse)
def get_business_profile(authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    profile = db.query(BusinessProfile).filter(BusinessProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Business profile not found")
    return profile

@router.post("/generate")
def generate_content(request: GenerateContentRequest, authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    profile = db.query(BusinessProfile).filter(BusinessProfile.id == request.business_id, BusinessProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Business profile not found")
    existing_posts = db.query(ContentPost).filter(
        ContentPost.business_id == request.business_id,
        ContentPost.month == request.month
    ).first()
    if existing_posts:
        raise HTTPException(status_code=400, detail="Content already generated for this month")
    prompt = f"""
    You are a social media expert. Generate a 30-day content calendar for this business:
    Business Name: {profile.business_name}
    Industry: {profile.industry}
    Target Audience: {profile.target_audience}
    Tone: {profile.tone}
    Platforms: {profile.platforms}

    Return ONLY a JSON array with exactly 30 objects. Each object must have these exact keys:
    - day_number (integer 1-30)
    - platform (string)
    - post_type (string: educational, promotional, entertaining, or inspirational)
    - caption (string, ready to post)
    - hashtags (string, space separated)
    - best_time (string, example: "9:00 AM")

    Return only the JSON array, no explanation, no markdown, no extra text.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=4000
    )
    raw = response.choices[0].message.content.strip()
    posts_data = json.loads(raw)
    for post in posts_data:
        new_post = ContentPost(
            business_id=request.business_id,
            day_number=post["day_number"],
            platform=post["platform"],
            post_type=post["post_type"],
            caption=post["caption"],
            hashtags=post["hashtags"],
            best_time=post["best_time"],
            month=request.month
        )
        db.add(new_post)
    db.commit()
    return {"message": "Content generated successfully", "total_posts": len(posts_data)}

@router.get("/posts/{business_id}", response_model=list[ContentPostResponse])
def get_posts(business_id: int, month: str, authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    profile = db.query(BusinessProfile).filter(BusinessProfile.id == business_id, BusinessProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Business profile not found")
    posts = db.query(ContentPost).filter(
        ContentPost.business_id == business_id,
        ContentPost.month == month
    ).order_by(ContentPost.day_number).all()
    return posts

@router.patch("/posts/{post_id}", response_model=ContentPostResponse)
def update_post(post_id: int, update: UpdatePostRequest, authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if update.caption is not None:
        post.caption = update.caption
    if update.hashtags is not None:
        post.hashtags = update.hashtags
    if update.is_published is not None:
        post.is_published = update.is_published
    db.commit()
    db.refresh(post)
    return post

@router.delete("/posts/{post_id}")
def delete_post(post_id: int, authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}