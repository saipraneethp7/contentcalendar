from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class BusinessProfileCreate(BaseModel):
    business_name: str
    industry: str
    target_audience: str
    tone: str
    platforms: str

class BusinessProfileResponse(BaseModel):
    id: int
    user_id: int
    business_name: str
    industry: str
    target_audience: str
    tone: str
    platforms: str
    created_at: datetime

    class Config:
        from_attributes = True

class ContentPostResponse(BaseModel):
    id: int
    business_id: int
    day_number: int
    platform: str
    post_type: str
    caption: str
    hashtags: str
    best_time: str
    is_published: bool
    month: str
    created_at: datetime

    class Config:
        from_attributes = True

class GenerateContentRequest(BaseModel):
    business_id: int
    month: str

class UpdatePostRequest(BaseModel):
    caption: Optional[str] = None
    hashtags: Optional[str] = None
    is_published: Optional[bool] = None