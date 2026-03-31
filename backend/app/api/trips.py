from datetime import date, datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.trip import Trip, TripStatus
from app.models.vessel import Vessel
from app.models.route import Route
from app.schemas.booking import TripResponse, TripListResponse

router = APIRouter(prefix="/trips", tags=["trips"])


@router.get("/", response_model=list[TripListResponse], summary="Search trips")
async def search_trips(
    date_from: date | None = Query(None, description="Start date"),
    date_to: date | None = Query(None, description="End date"),
    pier: str | None = Query(None, description="Departure pier"),
    category: str | None = Query(None, description="Route category"),
    vessel_type: str | None = Query(None, description="Vessel type"),
    min_seats: int = Query(1, description="Minimum available seats"),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(Trip)
        .options(selectinload(Trip.vessel), selectinload(Trip.route))
        .where(Trip.status == TripStatus.scheduled)
        .where(Trip.available_seats >= min_seats)
        .order_by(Trip.departure_at)
    )

    if date_from:
        query = query.where(Trip.departure_at >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        query = query.where(Trip.departure_at <= datetime.combine(date_to, datetime.max.time()))
    if pier:
        query = query.join(Route).where(Route.departure_pier == pier)
    if category:
        query = query.join(Route, isouter=True).where(Route.category == category)
    if vessel_type:
        query = query.join(Vessel, isouter=True).where(Vessel.vessel_type == vessel_type)

    result = await db.execute(query)
    trips = result.scalars().all()

    return [
        TripListResponse(
            id=t.id,
            vessel_id=t.vessel_id,
            route_id=t.route_id,
            departure_at=t.departure_at,
            available_seats=t.available_seats,
            base_price=float(t.base_price),
            currency=t.currency,
            status=t.status.value,
            vessel_name=t.vessel.name if t.vessel else None,
            route_name=t.route.name_ru if t.route else None,
        )
        for t in trips
    ]


@router.get("/{trip_id}", response_model=TripResponse, summary="Get trip details")
async def get_trip(trip_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Trip)
        .options(selectinload(Trip.vessel), selectinload(Trip.route))
        .where(Trip.id == trip_id)
    )
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip
