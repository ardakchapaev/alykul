from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import String, DateTime, Integer, Text, select, func
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, timezone
from app.core.database import get_db, Base
import httpx
import os
import logging

router = APIRouter(prefix="/analytics", tags=["Analytics"])

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '8684286671:AAGBcIpXPkJmyZibUrMtGjcDQJnJc3iSlh0')
ADMIN_CHAT_ID = os.environ.get('ADMIN_CHAT_ID', '')


class PageView(Base):
    __tablename__ = "page_views"
    id: Mapped[int] = mapped_column(primary_key=True)
    page: Mapped[str] = mapped_column(String(500))
    referrer: Mapped[str | None] = mapped_column(String(500), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)
    ip: Mapped[str | None] = mapped_column(String(50), nullable=True)
    country: Mapped[str | None] = mapped_column(String(50), nullable=True)
    language: Mapped[str | None] = mapped_column(String(10), nullable=True)
    screen: Mapped[str | None] = mapped_column(String(20), nullable=True)
    session_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class TrackRequest(BaseModel):
    page: str
    referrer: str = ""
    language: str = ""
    screen: str = ""
    session_id: str = ""


@router.post("/track")
async def track_pageview(req: TrackRequest, request: Request, db: AsyncSession = Depends(get_db)):
    ip = request.client.host if request.client else ""
    ua = request.headers.get("user-agent", "")

    pv = PageView(
        page=req.page,
        referrer=req.referrer,
        user_agent=ua,
        ip=ip,
        language=req.language,
        screen=req.screen,
        session_id=req.session_id,
    )
    db.add(pv)
    await db.commit()

    # Notify admin in Telegram (only for new sessions, not every page)
    if ADMIN_CHAT_ID and req.page in ['/', '/ru', '/en', '/ky']:
        try:
            ref_text = f"\nОткуда: {req.referrer}" if req.referrer else ""
            async with httpx.AsyncClient() as client:
                await client.post(
                    f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage',
                    json={
                        'chat_id': ADMIN_CHAT_ID,
                        'text': f"👁 Новый посетитель!\nСтраница: {req.page}\nЯзык: {req.language}\nЭкран: {req.screen}{ref_text}",
                    }
                )
        except Exception as e:
            logging.error(f"Telegram notify error: {e}")

    return {"status": "ok"}


@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    """Статистика для админки"""
    # Total views today
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)

    total = await db.execute(select(func.count()).select_from(PageView))
    today_count = await db.execute(
        select(func.count()).select_from(PageView).where(PageView.created_at >= today)
    )
    unique_sessions = await db.execute(
        select(func.count(func.distinct(PageView.session_id))).select_from(PageView).where(PageView.created_at >= today)
    )

    # Top pages today
    top_pages = await db.execute(
        select(PageView.page, func.count().label('cnt'))
        .where(PageView.created_at >= today)
        .group_by(PageView.page)
        .order_by(func.count().desc())
        .limit(10)
    )

    # Top referrers today
    top_refs = await db.execute(
        select(PageView.referrer, func.count().label('cnt'))
        .where(PageView.created_at >= today, PageView.referrer != '', PageView.referrer.isnot(None))
        .group_by(PageView.referrer)
        .order_by(func.count().desc())
        .limit(5)
    )

    return {
        "total_views": total.scalar() or 0,
        "today_views": today_count.scalar() or 0,
        "today_unique": unique_sessions.scalar() or 0,
        "top_pages": [{"page": r[0], "count": r[1]} for r in top_pages.all()],
        "top_referrers": [{"referrer": r[0], "count": r[1]} for r in top_refs.all()],
    }
