from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Preference(Base):
    __tablename__ = "preferences"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    preferred_destination_type = Column(String(100), nullable=False)
    budget_range = Column(String(100), nullable=False)
    travel_style = Column(String(100), nullable=False)

    # Relationship with User
    user = relationship("User", back_populates="preferences")