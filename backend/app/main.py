from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base
import app.models  # noqa: F401 — register all models with Base.metadata
from app.api import auth, vessels, trips, bookings, ai, whatsapp, forms, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (use Alembic in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(vessels.router, prefix=settings.API_PREFIX)
app.include_router(trips.router, prefix=settings.API_PREFIX)
app.include_router(bookings.router, prefix=settings.API_PREFIX)
app.include_router(ai.router, prefix=settings.API_PREFIX)
app.include_router(whatsapp.router, prefix=settings.API_PREFIX)
app.include_router(forms.router, prefix=settings.API_PREFIX)
app.include_router(analytics.router, prefix=settings.API_PREFIX)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "alykul-api"}


@app.get("/")
async def root():
    return {"name": settings.PROJECT_NAME, "version": settings.VERSION, "docs": "/docs"}
