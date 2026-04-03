import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import create_access_token, get_current_user, hash_password
from app.models.user import User
from app.schemas.auth import OTPRequest, OTPVerify, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])

# In-memory OTP store (use Redis in production)
_otp_store: dict[str, str] = {}


@router.post("/otp/request", summary="Request OTP code")
async def request_otp(data: OTPRequest, db: AsyncSession = Depends(get_db)):
    """Send OTP code to phone number. Creates user if not exists."""
    code = f"{random.randint(1000, 9999)}"
    _otp_store[data.phone] = code

    # Create user if not exists
    result = await db.execute(select(User).where(User.phone == data.phone))
    user = result.scalar_one_or_none()
    if not user:
        user = User(phone=data.phone)
        db.add(user)
        await db.commit()

    # TODO: Send SMS via Beeline/MegaCom API
    # For now, return code in development
    return {"message": "OTP sent", "dev_code": code}


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


@router.post("/telegram", summary="Login via Telegram Widget")
async def telegram_login(data: dict, db: AsyncSession = Depends(get_db)):
    """Login via Telegram Widget"""
    telegram_id = data.get('id')
    first_name = data.get('first_name', '')
    # TODO: Verify hash with bot token for security

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
