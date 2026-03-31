"""PDF ticket generator with QR code for boarding."""
import io
import os
import qrcode
from reportlab.lib.pagesizes import A5, landscape
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

NAVY = HexColor("#182F48")
OCEAN = HexColor("#246DC9")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#8EA0A2")
LIGHT = HexColor("#F4F8FB")


def generate_ticket_pdf(
    booking_id: int,
    qr_token: str,
    route_name: str,
    vessel_name: str,
    departure_pier: str,
    departure_time: str,
    departure_date: str,
    num_passengers: int,
    total_amount: float,
    currency: str,
    passenger_name: str = "",
) -> bytes:
    """Generate a PDF ticket with QR code. Returns PDF bytes."""
    buf = io.BytesIO()
    width, height = landscape(A5)
    c = canvas.Canvas(buf, pagesize=landscape(A5))

    # Background
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # Header bar
    c.setFillColor(NAVY)
    c.rect(0, height - 60, width, 60, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(20, height - 42, "АЛЫКУЛ")
    c.setFont("Helvetica", 10)
    c.drawString(130, height - 38, "Water Tourism · Issyk-Kul")
    c.setFont("Helvetica-Bold", 12)
    c.drawRightString(width - 20, height - 38, f"TICKET #{booking_id:06d}")

    # QR code
    qr_url = f"https://alykul.baimuras.pro/api/v1/bookings/{booking_id}/verify-qr?qr_token={qr_token}"
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=6, border=2)
    qr.add_data(qr_url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")

    qr_buf = io.BytesIO()
    qr_img.save(qr_buf, format="PNG")
    qr_buf.seek(0)

    from reportlab.lib.utils import ImageReader
    qr_size = 120
    qr_x = width - qr_size - 20
    qr_y = height - 60 - qr_size - 20
    c.drawImage(ImageReader(qr_buf), qr_x, qr_y, qr_size, qr_size)
    c.setFont("Helvetica", 7)
    c.setFillColor(MUTED)
    c.drawCentredString(qr_x + qr_size / 2, qr_y - 10, "Scan QR at boarding")

    # Dashed separator line
    c.setStrokeColor(HexColor("#E0E0E0"))
    c.setDash(3, 3)
    c.line(qr_x - 15, height - 70, qr_x - 15, 20)
    c.setDash()

    # Content area
    content_x = 20
    content_width = qr_x - 50
    y = height - 90

    # Route name
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(content_x, y, route_name[:40])
    y -= 25

    # Vessel
    c.setFillColor(OCEAN)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(content_x, y, vessel_name)
    y -= 30

    # Details grid
    details = [
        ("PIER", departure_pier),
        ("DATE", departure_date),
        ("TIME", departure_time),
        ("GUESTS", str(num_passengers)),
    ]

    c.setFont("Helvetica", 8)
    col_width = content_width / len(details)
    for i, (label, value) in enumerate(details):
        x = content_x + i * col_width
        # Label
        c.setFillColor(MUTED)
        c.drawString(x, y, label)
        # Value
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(x, y - 18, value)
        c.setFont("Helvetica", 8)

    y -= 50

    # Amount
    c.setFillColor(LIGHT)
    c.roundRect(content_x, y - 5, content_width, 35, 8, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica", 10)
    c.drawString(content_x + 10, y + 8, "TOTAL")
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(OCEAN)
    c.drawString(content_x + 60, y + 5, f"{total_amount:,.0f} {currency}")

    y -= 35

    # Passenger name
    if passenger_name:
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(content_x, y, f"Passenger: {passenger_name}")
        y -= 15

    # Footer
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7)
    c.drawString(content_x, 15, "alykul.baimuras.pro · +996 555 123 456 · Cholpon-Ata, Issyk-Kul, Kyrgyzstan")
    c.drawRightString(width - 20, 15, f"QR: {qr_token[:16]}...")

    c.showPage()
    c.save()
    buf.seek(0)
    return buf.read()
