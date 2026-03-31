"""Seed database with initial data for Alykul."""
import asyncio
from datetime import datetime, timedelta, timezone

from app.core.database import engine, Base, async_session
from app.models.user import User, UserRole
from app.models.vessel import Vessel
from app.models.route import Route
from app.models.trip import Trip, TripStatus
from app.models.booking import PromoCode


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        # Check if already seeded
        from sqlalchemy import select, func
        count = await db.scalar(select(func.count()).select_from(Vessel))
        if count and count > 0:
            print("Database already seeded, skipping")
            return

        # === ADMIN USER ===
        admin = User(
            phone="+996555123456",
            name="Admin Alykul",
            role=UserRole.admin,
            is_verified=True,
        )
        db.add(admin)

        # === VESSELS ===
        alykul_ship = Vessel(
            name='Теплоход «Алыкул»',
            slug="alykul-steamship",
            vessel_type="steamship",
            capacity=200,
            description_ru="Флагман флота. Круизы, корпоративы, свадьбы, детские праздники. 2 палубы, банкетный зал.",
            description_en="Fleet flagship. Cruises, corporate events, weddings, kids parties. 2 decks, banquet hall.",
            description_ky="Флоттун флагманы. Круиздер, корпоративдер, үйлөнүү тойлору. 2 палуба, банкет залы.",
            specs={"decks": 2, "banquet": True, "restaurant": True, "dj": True},
            images=["/images/q02.jpg", "/images/alykul1.jpg"],
        )
        nomad_yacht = Vessel(
            name='Яхта «Nomad»',
            slug="nomad-yacht",
            vessel_type="yacht",
            capacity=12,
            description_ru="Приватные чартеры, романтические прогулки, VIP-обслуживание.",
            description_en="Private charters, romantic trips, VIP service.",
            description_ky="Жеке чартерлер, романтикалык сейилдөөлөр, VIP тейлөө.",
            specs={"sailing": True, "vip": True},
            images=["/images/ep03.jpg"],
        )
        speedboat = Vessel(
            name="Скоростной катер",
            slug="speedboat",
            vessel_type="speedboat",
            capacity=8,
            description_ru="Адреналиновые туры, водные лыжи, вейкборд, рыбалка. До 60 км/ч.",
            description_en="Adrenaline tours, water skiing, wakeboarding, fishing. Up to 60 km/h.",
            description_ky="Адреналин турлары, суу лыжалары, вейкборд, балык уулоо. 60 км/с чейин.",
            specs={"speed_kmh": 60, "wakeboard": True, "fishing": True},
            images=["/images/scene6.jpg"],
        )
        db.add_all([alykul_ship, nomad_yacht, speedboat])
        await db.flush()

        # === ROUTES ===
        routes_data = [
            Route(
                name_ru="Закатный круиз", name_en="Sunset Cruise", name_ky="Кечки круиз",
                slug="sunset-cruise", departure_pier="Чолпон-Ата", arrival_pier="Чолпон-Ата",
                description_ru="2-часовой круиз на закате с видом на горы Тянь-Шаня",
                description_en="2-hour sunset cruise with views of Tien Shan mountains",
                duration_minutes=120, category="cruise", image="/images/q02.jpg",
            ),
            Route(
                name_ru="Утренний круиз", name_en="Morning Cruise", name_ky="Эртеңки круиз",
                slug="morning-cruise", departure_pier="Бостери", arrival_pier="Бостери",
                description_ru="1.5-часовой утренний круиз по живописному побережью",
                description_en="1.5-hour morning cruise along the scenic coastline",
                duration_minutes=90, category="cruise", image="/images/scene4.jpg",
            ),
            Route(
                name_ru="Скоростной тур", name_en="Speed Tour", name_ky="Ылдам тур",
                slug="speed-tour", departure_pier="Чолпон-Ата",
                description_ru="40-минутный адреналиновый тур на скоростном катере",
                description_en="40-minute adrenaline tour on a speedboat",
                duration_minutes=40, category="entertainment", image="/images/scene6.jpg",
            ),
            Route(
                name_ru="Приватный чартер", name_en="Private Charter", name_ky="Жеке чартер",
                slug="private-charter", departure_pier="Чолпон-Ата",
                description_ru="Приватная яхта с экипажем для VIP-гостей",
                description_en="Private yacht with crew for VIP guests",
                duration_minutes=180, category="charter", image="/images/ep03.jpg",
            ),
            Route(
                name_ru="Детский праздник", name_en="Kids Party", name_ky="Балдар майрамы",
                slug="kids-party", departure_pier="Чолпон-Ата", arrival_pier="Чолпон-Ата",
                description_ru="Праздник на борту теплохода с пиратским шоу и анимацией",
                description_en="Party on board the steamship with pirate show and animation",
                duration_minutes=150, category="kids", image="/images/kids.jpg",
            ),
            Route(
                name_ru="Рыбалка + тур", name_en="Fishing Tour", name_ky="Балык уулоо тур",
                slug="fishing-tour", departure_pier="Каракол",
                description_ru="4-часовой рыболовный тур с выходом в открытое озеро",
                description_en="4-hour fishing tour to the open lake",
                duration_minutes=240, category="entertainment", image="/images/scene5.jpg",
            ),
        ]
        db.add_all(routes_data)
        await db.flush()

        # === TRIPS (June-September 2026, daily) ===
        season_start = datetime(2026, 6, 1, tzinfo=timezone.utc)
        season_end = datetime(2026, 9, 15, tzinfo=timezone.utc)

        trips = []
        current = season_start
        while current <= season_end:
            # Sunset cruise daily at 18:00
            trips.append(Trip(
                vessel_id=alykul_ship.id, route_id=routes_data[0].id,
                departure_at=current.replace(hour=18, minute=0),
                capacity=200, available_seats=200, base_price=1400, currency="KGS",
            ))
            # Morning cruise daily at 10:00
            trips.append(Trip(
                vessel_id=alykul_ship.id, route_id=routes_data[1].id,
                departure_at=current.replace(hour=10, minute=0),
                capacity=200, available_seats=200, base_price=1200, currency="KGS",
            ))
            # Speed tour 3x daily
            for hour in [12, 14, 16]:
                trips.append(Trip(
                    vessel_id=speedboat.id, route_id=routes_data[2].id,
                    departure_at=current.replace(hour=hour, minute=0),
                    capacity=8, available_seats=8, base_price=2000, currency="KGS",
                ))
            # Private charter (available daily)
            trips.append(Trip(
                vessel_id=nomad_yacht.id, route_id=routes_data[3].id,
                departure_at=current.replace(hour=10, minute=0),
                capacity=12, available_seats=12, base_price=7000, currency="KGS",
            ))
            # Kids party (weekends only)
            if current.weekday() in (5, 6):  # Sat, Sun
                trips.append(Trip(
                    vessel_id=alykul_ship.id, route_id=routes_data[4].id,
                    departure_at=current.replace(hour=14, minute=0),
                    capacity=100, available_seats=100, base_price=1000, currency="KGS",
                ))
            # Fishing tour (weekends only)
            if current.weekday() in (5, 6):
                trips.append(Trip(
                    vessel_id=speedboat.id, route_id=routes_data[5].id,
                    departure_at=current.replace(hour=7, minute=0),
                    capacity=8, available_seats=8, base_price=3500, currency="KGS",
                ))

            current += timedelta(days=1)

        db.add_all(trips)

        # === PROMO CODES ===
        db.add_all([
            PromoCode(code="WELCOME10", discount_percent=10, max_uses=100),
            PromoCode(code="SUMMER2026", discount_percent=15, max_uses=50),
            PromoCode(code="VIP500", discount_fixed=500, max_uses=20),
        ])

        await db.commit()
        print(f"Seeded: 3 vessels, {len(routes_data)} routes, {len(trips)} trips, 3 promo codes")


if __name__ == "__main__":
    asyncio.run(seed())
