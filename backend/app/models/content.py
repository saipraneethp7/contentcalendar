from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class BusinessProfile(Base):
    __tablename__ = "business_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    business_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    target_audience = Column(String, nullable=False)
    tone = Column(String, nullable=False)
    platforms = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    posts = relationship("ContentPost", back_populates="business")


class ContentPost(Base):
    __tablename__ = "content_posts"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("business_profiles.id"), nullable=False)
    day_number = Column(Integer, nullable=False)
    platform = Column(String, nullable=False)
    post_type = Column(String, nullable=False)
    caption = Column(Text, nullable=False)
    hashtags = Column(Text, nullable=False)
    best_time = Column(String, nullable=False)
    is_published = Column(Boolean, default=False)
    month = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    business = relationship("BusinessProfile", back_populates="posts")