from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.forms import FormSubmission, FormType
import httpx
import os
import logging

router = APIRouter(prefix="/forms", tags=["Forms"])

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '8684286671:AAGBcIpXPkJmyZibUrMtGjcDQJnJc3iSlh0')
ADMIN_CHAT_ID = os.environ.get('ADMIN_CHAT_ID', '')  # TODO: Set admin's Telegram chat ID


async def notify_telegram(message: str):
    """Отправить уведомление админу в Telegram"""
    if not ADMIN_CHAT_ID:
        logging.warning("ADMIN_CHAT_ID not set, skipping Telegram notification")
        return
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage',
                json={'chat_id': ADMIN_CHAT_ID, 'text': message, 'parse_mode': 'HTML'}
            )
    except Exception as e:
        logging.error(f"Telegram notification failed: {e}")


async def save_form(db: AsyncSession, form_type: FormType, data: dict) -> FormSubmission:
    """Сохранить форму в БД"""
    submission = FormSubmission(form_type=form_type, data=data)
    db.add(submission)
    await db.commit()
    await db.refresh(submission)
    return submission


# ── Contact Form ──
class ContactRequest(BaseModel):
    name: str
    phone: str
    email: str = ""
    subject: str = ""
    message: str

@router.post("/contact")
async def submit_contact(req: ContactRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.contact, req.model_dump())
    await notify_telegram(
        f"<b>Новое обращение #{sub.id}</b>\n"
        f"Имя: {req.name}\nТелефон: {req.phone}\nEmail: {req.email}\n"
        f"Тема: {req.subject}\nСообщение: {req.message}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Group Booking ──
class GroupBookingRequest(BaseModel):
    company: str = ""
    contact_name: str
    phone: str
    email: str = ""
    event_type: str
    preferred_date: str = ""
    guests: int
    vessel: str = ""
    budget: str = ""
    message: str = ""

@router.post("/group-booking")
async def submit_group_booking(req: GroupBookingRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.group_booking, req.model_dump())
    await notify_telegram(
        f"<b>Групповая заявка #{sub.id}</b>\n"
        f"Контакт: {req.contact_name} | {req.phone}\n"
        f"Тип: {req.event_type} | Гостей: {req.guests}\n"
        f"Дата: {req.preferred_date} | Бюджет: {req.budget}\n"
        f"Судно: {req.vessel}\nСообщение: {req.message}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Partner Application ──
class PartnerRequest(BaseModel):
    company: str
    contact_name: str
    phone: str
    email: str
    partner_type: str
    clients_per_month: str = ""
    message: str = ""

@router.post("/partners")
async def submit_partner(req: PartnerRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.partner, req.model_dump())
    await notify_telegram(
        f"<b>Заявка партнёра #{sub.id}</b>\n"
        f"Компания: {req.company}\nКонтакт: {req.contact_name} | {req.phone}\n"
        f"Тип: {req.partner_type} | Клиентов/мес: {req.clients_per_month}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Career Application ──
class CareerRequest(BaseModel):
    name: str
    phone: str
    email: str
    position: str
    message: str = ""

@router.post("/careers")
async def submit_career(req: CareerRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.career, req.model_dump())
    await notify_telegram(
        f"<b>Отклик на вакансию #{sub.id}</b>\n"
        f"Имя: {req.name} | Телефон: {req.phone}\n"
        f"Позиция: {req.position}\nEmail: {req.email}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Review ──
class ReviewRequest(BaseModel):
    booking_id: int = 0
    rating: int  # 1-5
    text: str
    recommend: bool = True
    tags: list[str] = []

@router.post("/reviews")
async def submit_review(req: ReviewRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.review, req.model_dump())
    stars = "* " * req.rating
    await notify_telegram(
        f"<b>Новый отзыв #{sub.id}</b>\n"
        f"{stars}({req.rating}/5)\n"
        f"Бронь: #{req.booking_id}\n"
        f"Текст: {req.text[:200]}\n"
        f"Рекомендует: {'Да' if req.recommend else 'Нет'}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Gift Certificate ──
class GiftRequest(BaseModel):
    certificate_type: str
    amount: int
    from_name: str
    to_name: str
    recipient_phone: str = ""
    recipient_email: str = ""
    message: str = ""

@router.post("/certificates")
async def submit_gift(req: GiftRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.gift_certificate, req.model_dump())
    await notify_telegram(
        f"<b>Подарочный сертификат #{sub.id}</b>\n"
        f"Тип: {req.certificate_type} | Сумма: {req.amount} KGS\n"
        f"От: {req.from_name} -> Кому: {req.to_name}\n"
        f"Телефон: {req.recipient_phone}"
    )
    return {"id": sub.id, "status": "ok"}


# ── Newsletter Subscribe ──
class NewsletterRequest(BaseModel):
    email: str

@router.post("/newsletter")
async def subscribe_newsletter(req: NewsletterRequest, db: AsyncSession = Depends(get_db)):
    sub = await save_form(db, FormType.newsletter, {"email": req.email})
    return {"id": sub.id, "status": "ok"}


# ── Admin: Get all submissions ──
@router.get("/submissions")
async def get_submissions(form_type: str = "", db: AsyncSession = Depends(get_db)):
    from sqlalchemy import select
    stmt = select(FormSubmission).order_by(FormSubmission.created_at.desc()).limit(100)
    if form_type:
        stmt = stmt.where(FormSubmission.form_type == form_type)
    result = await db.execute(stmt)
    subs = result.scalars().all()
    return [
        {
            "id": s.id,
            "form_type": s.form_type.value,
            "data": s.data,
            "status": s.status,
            "created_at": s.created_at.isoformat(),
        }
        for s in subs
    ]
