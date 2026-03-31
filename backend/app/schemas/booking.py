from datetime import datetime
from pydantic import BaseModel


class VesselResponse(BaseModel):
    id: int
    name: str
    slug: str
    vessel_type: str
    capacity: int
    description_ru: str | None
    description_en: str | None
    description_ky: str | None
    specs: dict | None
    images: list | None

    class Config:
        from_attributes = True


class RouteResponse(BaseModel):
    id: int
    name_ru: str
    name_en: str | None
    name_ky: str | None
    slug: str
    departure_pier: str
    arrival_pier: str | None
    duration_minutes: int
    category: str
    image: str | None

    class Config:
        from_attributes = True


class TripResponse(BaseModel):
    id: int
    vessel: VesselResponse
    route: RouteResponse
    departure_at: datetime
    arrival_at: datetime | None
    capacity: int
    available_seats: int
    base_price: float
    currency: str
    status: str

    class Config:
        from_attributes = True


class TripListResponse(BaseModel):
    id: int
    vessel_id: int
    route_id: int
    departure_at: datetime
    available_seats: int
    base_price: float
    currency: str
    status: str
    vessel_name: str | None = None
    route_name: str | None = None

    class Config:
        from_attributes = True


class BookingCreate(BaseModel):
    trip_id: int
    num_passengers: int = 1
    seats: list[dict] | None = None
    promo_code: str | None = None
    payment_method: str = "mbank"


class BookingResponse(BaseModel):
    id: int
    trip_id: int
    num_passengers: int
    total_amount: float
    currency: str
    status: str
    payment_method: str | None
    qr_token: str
    ticket_pdf_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True


class BookingDetailResponse(BookingResponse):
    trip: TripResponse
    seats: list[dict] | None


class ReviewCreate(BaseModel):
    trip_id: int
    rating: int
    text: str | None = None


class ReviewResponse(BaseModel):
    id: int
    user_id: int
    trip_id: int
    rating: int
    text: str | None
    created_at: datetime

    class Config:
        from_attributes = True
