from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.vessel import Vessel
from app.schemas.booking import VesselResponse

router = APIRouter(prefix="/vessels", tags=["vessels"])


@router.get("/", response_model=list[VesselResponse], summary="List all vessels")
async def list_vessels(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Vessel).where(Vessel.is_active == True).order_by(Vessel.id))
    return result.scalars().all()


@router.get("/{slug}", response_model=VesselResponse, summary="Get vessel by slug")
async def get_vessel(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Vessel).where(Vessel.slug == slug))
    vessel = result.scalar_one_or_none()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found")
    return vessel
