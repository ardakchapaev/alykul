from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.trip import Trip
from app.models.booking import Booking, BookingStatus, Payment, PromoCode
from app.schemas.booking import BookingCreate, BookingResponse, BookingDetailResponse

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("/", response_model=BookingResponse, summary="Create booking")
async def create_booking(
    data: BookingCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Get trip
    result = await db.execute(select(Trip).where(Trip.id == data.trip_id))
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.available_seats < data.num_passengers:
        raise HTTPException(status_code=400, detail="Not enough seats available")

    # Calculate price
    total = float(trip.base_price) * data.num_passengers
    discount = 0.0

    # Apply promo code
    if data.promo_code:
        promo_result = await db.execute(
            select(PromoCode).where(PromoCode.code == data.promo_code, PromoCode.is_active == True)
        )
        promo = promo_result.scalar_one_or_none()
        if promo:
            if promo.max_uses and promo.used_count >= promo.max_uses:
                raise HTTPException(status_code=400, detail="Promo code expired")
            if promo.discount_percent > 0:
                discount = total * promo.discount_percent / 100
            elif float(promo.discount_fixed) > 0:
                discount = float(promo.discount_fixed)
            promo.used_count += 1

    total -= discount

    # Create booking
    booking = Booking(
        user_id=user.id,
        trip_id=trip.id,
        num_passengers=data.num_passengers,
        seats=data.seats,
        total_amount=total,
        currency=trip.currency,
        payment_method=data.payment_method,
        promo_code=data.promo_code,
        discount_amount=discount,
    )
    db.add(booking)

    # Reserve seats
    trip.available_seats -= data.num_passengers

    await db.commit()
    await db.refresh(booking)

    # TODO: Create payment via Mbank/Optima/O!Деньги API
    # TODO: Send confirmation SMS/email via Celery

    return booking


@router.get("/", response_model=list[BookingResponse], summary="My bookings")
async def list_bookings(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking)
        .where(Booking.user_id == user.id)
        .order_by(Booking.created_at.desc())
    )
    return result.scalars().all()


@router.get("/{booking_id}", response_model=BookingDetailResponse, summary="Booking details")
async def get_booking(
    booking_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking)
        .options(selectinload(Booking.trip).selectinload(Trip.vessel), selectinload(Booking.trip).selectinload(Trip.route))
        .where(Booking.id == booking_id, Booking.user_id == user.id)
    )
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/{booking_id}/cancel", response_model=BookingResponse, summary="Cancel booking")
async def cancel_booking(
    booking_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Booking).where(Booking.id == booking_id, Booking.user_id == user.id)
    )
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.status not in (BookingStatus.pending, BookingStatus.hold, BookingStatus.confirmed):
        raise HTTPException(status_code=400, detail="Cannot cancel this booking")

    # Return seats
    trip_result = await db.execute(select(Trip).where(Trip.id == booking.trip_id))
    trip = trip_result.scalar_one()
    trip.available_seats += booking.num_passengers

    booking.status = BookingStatus.cancelled
    await db.commit()
    await db.refresh(booking)

    # TODO: Process refund via payment gateway
    # TODO: Send cancellation notification

    return booking


@router.post("/{booking_id}/verify-qr", summary="Verify QR code (captain scan)")
async def verify_qr(qr_token: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Booking)
        .options(selectinload(Booking.trip).selectinload(Trip.route))
        .where(Booking.qr_token == qr_token)
    )
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=404, detail="Invalid QR code")
    if booking.status != BookingStatus.confirmed:
        raise HTTPException(status_code=400, detail=f"Booking status: {booking.status.value}")

    booking.status = BookingStatus.checked_in
    await db.commit()

    return {
        "valid": True,
        "booking_id": booking.id,
        "passengers": booking.num_passengers,
        "trip": booking.trip.route.name_ru if booking.trip and booking.trip.route else "Unknown",
    }
