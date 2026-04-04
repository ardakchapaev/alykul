import hashlib
import hmac
import os
import secrets

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import create_access_token, get_current_user, hash_password
from app.models.user import User
from app.schemas.auth import OTPRequest, OTPVerify, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])

# Environment detection
_IS_DEV = os.environ.get('ENVIRONMENT', 'development') != 'production'

# Telegram bot token for hash verification
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')

# In-memory OTP store (use Redis in production)
_otp_store: dict[str, str] = {}


@router.post("/otp/request", summary="Request OTP code")
async def request_otp(data: OTPRequest, db: AsyncSession = Depends(get_db)):
    """Send OTP code to phone number. Creates user if not exists."""
    otp = str(secrets.randbelow(9000) + 1000)  # Cryptographically secure 4-digit OTP
    _otp_store[data.phone] = otp

    # Create user if not exists
    result = await db.execute(select(User).where(User.phone == data.phone))
    user = result.scalar_one_or_none()
    if not user:
        user = User(phone=data.phone)
        db.add(user)
        await db.commit()

    # TODO: Send SMS via Beeline/MegaCom API
    # Return dev_code only in non-production environments
    return {"message": "OTP sent", **({"dev_code": otp} if _IS_DEV else {})}


@router.post("/otp/verify", response_model=TokenResponse, summary="Verify OTP and get token")
async def verify_otp(data: OTPVerify, db: AsyncSession = Depends(get_db)):
    stored = _otp_store.get(data.phone)
    if not stored or stored != data.code:
        raise HTTPException(status_code=400, detail="Invalid OTP code")

    del _otp_store[data.phone]

    result = await db.execute(select(User).where(User.phone == data.phone))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_verified = True
    await db.commit()

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token)


def verify_telegram_auth(data: dict, bot_token: str) -> bool:
    """Verify Telegram Login Widget data using HMAC-SHA256."""
    check_hash = data.pop('hash', '')
    if not check_hash or not bot_token:
        return False
    data_check_arr = sorted([f"{k}={v}" for k, v in data.items()])
    data_check_string = "\n".join(data_check_arr)
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    hmac_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(hmac_hash, check_hash)


@router.post("/telegram", summary="Login via Telegram Widget")
async def telegram_login(data: dict, db: AsyncSession = Depends(get_db)):
    """Login via Telegram Widget"""
    # Verify Telegram auth hash (skip in dev if no bot token configured)
    if BOT_TOKEN and not verify_telegram_auth(data.copy(), BOT_TOKEN):
        raise HTTPException(status_code=401, detail="Invalid Telegram auth")
    elif not BOT_TOKEN and not _IS_DEV:
        raise HTTPException(status_code=500, detail="Telegram bot token not configured")

    telegram_id = data.get('id')
    first_name = data.get('first_name', '')

    # Find or create user
    stmt = select(User).where(User.phone == f"tg_{telegram_id}")
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            phone=f"tg_{telegram_id}",
            name=first_name,
            is_verified=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    # Generate JWT
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse, summary="Get current user")
async def get_me(user: User = Depends(get_current_user)):
    return user


@router.patch("/me", response_model=UserResponse, summary="Update profile")
async def update_me(
    name: str | None = None,
    email: str | None = None,
    language: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if name is not None:
        user.name = name
    if email is not None:
        user.email = email
    if language is not None:
        user.language = language
    await db.commit()
    await db.refresh(user)
    return user
