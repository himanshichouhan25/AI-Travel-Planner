from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import Models
from app.models.user import User
from app.models.trip import Trip
from app.models.preference import Preference

# Import Routers
from app.routers.auth_router import router as auth_router
from app.routers.trip_router import router as trip_router
from app.routers.preference_router import router as preference_router
from app.routers.ai_router import router as ai_router

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Create FastAPI App
app = FastAPI(
    title="AI Travel Planner API",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routes
# -----------------------------
app.include_router(auth_router)
app.include_router(trip_router)
app.include_router(preference_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to AI Travel Planner API 🚀"
    }