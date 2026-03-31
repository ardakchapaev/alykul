from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, ForeignKey, Numeric, Text, JSON, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
import uuid

from app.core.database import Base


class BookingStatus(str, enum.Enum):
    pending = "pending"        # Created, awaiting payment
    hold = "hold"              # Reserved, pay within 24h
    confirmed = "confirmed"    # Paid, ticket issued
    checked_in = "checked_in"  # QR scanned at boarding
    completed = "completed"    # Trip finished
    cancelled = "cancelled"    # Cancelled by user
    refunded = "refunded"      # Money returned
    expired = "expired"        # Hold expired


class PaymentMethod(str, enum.Enum):
    mbank = "mbank"
    optima = "optima"
    odengi = "odengi"
    cash = "cash"
    stripe = "stripe"


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    trip_id: Mapped[int] = mapped_column(ForeignKey("trips.id"), index=True)
    seats: Mapped[dict | None] = mapped_column(JSON)  # [{"seat": "A1", "passenger": "Name"}]
    num_passengers: Mapped[int] = mapped_column(Integer, default=1)
    total_amount: Mapped[float] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(3), default="KGS")
    status: Mapped[BookingStatus] = mapped_column(SAEnum(BookingStatus), default=BookingStatus.pending)
    payment_method: Mapped[PaymentMethod | None] = mapped_column(SAEnum(PaymentMethod))
    payment_id: Mapped[str | None] = mapped_column(String(255))  # External payment gateway ID
    qr_token: Mapped[str] = mapped_column(String(64), unique=True, default=lambda: uuid.uuid4().hex)
    ticket_pdf_url: Mapped[str | None] = mapped_column(String(500))
    promo_code: Mapped[str | None] = mapped_column(String(50))
    discount_amount: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship(back_populates="bookings")  # noqa: F821
    trip: Mapped["Trip"] = relationship(back_populates="bookings")  # noqa: F821
    payment: Mapped["Payment | None"] = relationship(back_populates="booking", uselist=False)  # noqa: F821


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True)
    booking_id: Mapped[int] = mapped_column(ForeignKey("bookings.id"), unique=True)
    method: Mapped[PaymentMethod] = mapped_column(SAEnum(PaymentMethod))
    amount: Mapped[float] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(3), default="KGS")
    external_id: Mapped[str | None] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50), default="pending")  # pending, success, failed, refunded
    raw_response: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    booking: Mapped["Booking"] = relationship(back_populates="payment")  # noqa: F821


class PromoCode(Base):
    __tablename__ = "promo_codes"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    discount_percent: Mapped[int] = mapped_column(Integer, default=0)
    discount_fixed: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    max_uses: Mapped[int | None] = mapped_column(Integer)
    used_count: Mapped[int] = mapped_column(Integer, default=0)
    valid_from: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    valid_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    is_active: Mapped[bool] = mapped_column(default=True)


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    trip_id: Mapped[int] = mapped_column(ForeignKey("trips.id"))
    rating: Mapped[int] = mapped_column(Integer)  # 1-5
    text: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship(back_populates="reviews")  # noqa: F821
