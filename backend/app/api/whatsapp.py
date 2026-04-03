from fastapi import APIRouter, Request, Response
from app.services.ai_service import AiService
from app.models.conversation import Channel
from app.core.database import async_session

router = APIRouter(prefix="/whatsapp", tags=["WhatsApp"])


# WhatsApp Business API webhook verification
@router.get("/webhook")
async def verify_webhook(request: Request):
    """WhatsApp webhook verification (GET)"""
    params = request.query_params
    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    VERIFY_TOKEN = "alykul_whatsapp_verify_2026"  # TODO: Move to env

    if mode == "subscribe" and token == VERIFY_TOKEN:
        return Response(content=challenge, media_type="text/plain")
    return Response(status_code=403)


@router.post("/webhook")
async def receive_message(request: Request):
    """WhatsApp webhook receiver (POST) — handles incoming messages"""
    body = await request.json()

    # Extract message from WhatsApp Cloud API format
    try:
        entry = body.get("entry", [{}])[0]
        changes = entry.get("changes", [{}])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])

        if not messages:
            return {"status": "ok"}

        message = messages[0]
        from_number = message.get("from", "")  # Phone number
        text = message.get("text", {}).get("body", "")

        if not text:
            return {"status": "ok"}

        # Process through unified AI
        async with async_session() as db:
            response = await AiService.chat(
                db=db,
                channel=Channel.whatsapp,
                channel_user_id=from_number,
                message=text,
                customer_phone=from_number,
            )

        # Send reply via WhatsApp Cloud API
        # TODO: Implement send_whatsapp_message(from_number, response)
        # Requires: WHATSAPP_TOKEN and PHONE_NUMBER_ID from Meta Business

        return {"status": "ok", "response": response}
    except Exception as e:
        import logging
        logging.error(f"WhatsApp webhook error: {e}")
        return {"status": "error"}
