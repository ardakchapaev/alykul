from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, ForeignKey, Numeric, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.core.database import Base


class TripStatus(str, enum.Enum):
    scheduled = "scheduled"
    boarding = "boarding"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[int] = mapped_column(primary_key=True)
    vessel_id: Mapped[int] = mapped_column(ForeignKey("vessels.id"))
    route_id: Mapped[int] = mapped_column(ForeignKey("routes.id"))
    departure_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    arrival_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    capacity: Mapped[int] = mapped_column(Integer)
    available_seats: Mapped[int] = mapped_column(Integer)
    base_price: Mapped[float] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(3), default="KGS")
    status: Mapped[TripStatus] = mapped_column(SAEnum(TripStatus), default=TripStatus.scheduled)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    vessel: Mapped["Vessel"] = relationship(back_populates="trips")  # noqa: F821
    route: Mapped["Route"] = relationship(back_populates="trips")  # noqa: F821
    bookings: Mapped[list["Booking"]] = relationship(back_populates="trip")  # noqa: F821
