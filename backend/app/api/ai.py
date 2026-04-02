from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.ai_service import AiService
from app.models.conversation import Channel

router = APIRouter(prefix="/ai", tags=["AI"])


class ChatRequest(BaseModel):
    channel: str = "website"
    channel_user_id: str
    message: str
    user_id: int | None = None
    customer_name: str | None = None
    customer_phone: str | None = None


class ChatResponse(BaseModel):
    response: str
    session_id: int | None = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    channel = Channel(request.channel) if request.channel in Channel.__members__ else Channel.website

    response = await AiService.chat(
        db=db,
        channel=channel,
        channel_user_id=request.channel_user_id,
        message=request.message,
        user_id=request.user_id,
        customer_name=request.customer_name,
        customer_phone=request.customer_phone,
    )

    return ChatResponse(response=response)


@router.get("/sessions/{phone}")
async def get_sessions(phone: str, db: AsyncSession = Depends(get_db)):
    """Get all conversation sessions for a customer (admin use)"""
    sessions = await AiService.get_customer_sessions(db, phone)
    return [
        {
            "id": s.id,
            "channel": s.channel.value,
            "customer_name": s.customer_name,
            "message_count": s.message_count,
            "last_message_at": s.last_message_at.isoformat(),
        }
        for s in sessions
    ]
