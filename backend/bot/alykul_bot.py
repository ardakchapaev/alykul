"""
Alykul Telegram Bot — Trip search, booking, schedule, prices, FAQ.
Uses python-telegram-bot v20+ (async).
"""

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes,
)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8684286671:AAGBcIpXPkJmyZibUrMtGjcDQJnJc3iSlh0")
SITE_URL = os.environ.get("SITE_URL", "https://alykul.baimuras.pro")
API_URL = os.environ.get("API_URL", f"{SITE_URL}/api/v1")
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID", "")

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Data (hardcoded MVP — will switch to API later) ---

PIERS = ["Чолпон-Ата", "Бостери", "Каракол", "Тамга"]

TRIPS = [
    {"name": "🌅 Закатный круиз", "pier": "Чолпон-Ата", "time": "18:00", "dur": "2 часа", "vessel": "Теплоход «Алыкул»", "price": 1400},
    {"name": "☀️ Утренний круиз", "pier": "Бостери", "time": "10:00", "dur": "1.5 часа", "vessel": "Теплоход «Алыкул»", "price": 1200},
    {"name": "⚡ Скоростной тур (12:00)", "pier": "Чолпон-Ата", "time": "12:00", "dur": "40 мин", "vessel": "Катер", "price": 2000},
    {"name": "⚡ Скоростной тур (14:00)", "pier": "Чолпон-Ата", "time": "14:00", "dur": "40 мин", "vessel": "Катер", "price": 2000},
    {"name": "⚡ Скоростной тур (16:00)", "pier": "Чолпон-Ата", "time": "16:00", "dur": "40 мин", "vessel": "Катер", "price": 2000},
    {"name": "🛥 Приватный чартер", "pier": "Все причалы", "time": "По запросу", "dur": "2-6 часов", "vessel": "Яхта «Nomad»", "price": 7000},
    {"name": "🎉 Детский праздник", "pier": "Все причалы", "time": "По запросу", "dur": "2-3 часа", "vessel": "Теплоход", "price": 1000},
]

FAQ_ITEMS = [
    ("Как забронировать?", "Выберите рейс на сайте или через бота, укажите количество мест и оплатите онлайн. Подтверждение придёт на email и в Telegram."),
    ("Можно ли отменить бронь?", "Бесплатная отмена за 24 часа до рейса. При отмене менее чем за 24 часа удерживается 50% стоимости."),
    ("Есть ли скидки для детей?", "Дети до 5 лет — бесплатно, от 5 до 12 лет — скидка 50%."),
    ("Что взять с собой?", "Солнцезащитный крем, головной убор, лёгкую куртку (на воде прохладно). Спасательные жилеты предоставляются."),
    ("Работаете ли зимой?", "Сезон: 1 июня — 15 сентября. Зимой доступны только приватные чартеры по запросу."),
]

# --- Static texts ---

PRICES_TEXT = (
    "💰 <b>Цены на услуги Алыкул:</b>\n\n"
    "🌅 Закатный круиз — от 1,400 KGS\n☀️ Утренний круиз — от 1,200 KGS\n"
    "⚡ Скоростной тур — от 2,000 KGS\n🛥 Приватный чартер — от 7,000 KGS\n"
    "🎉 Детский праздник — от 1,000 KGS/чел\n\nСезон: 1 июня — 15 сентября"
)

SCHEDULE_TEXT = (
    "📅 <b>Расписание рейсов:</b>\n\n"
    "🌅 <b>Закатный круиз</b> (Чолпон-Ата)\n   ⏰ 18:00 | ⏱ 2 часа | 🚢 Теплоход «Алыкул» | Ежедневно\n\n"
    "☀️ <b>Утренний круиз</b> (Бостери)\n   ⏰ 10:00 | ⏱ 1.5 часа | 🚢 Теплоход «Алыкул» | Ежедневно\n\n"
    "⚡ <b>Скоростной тур</b> (Чолпон-Ата)\n   ⏰ 12:00, 14:00, 16:00 | ⏱ 40 мин | 🚤 Катер | Ежедневно\n\n"
    "🛥 <b>Приватный чартер</b>\n   📞 По запросу | ⏱ 2-6 часов | 🛥 Яхта «Nomad»\n\n"
    "🎉 <b>Детский праздник</b>\n   📞 По запросу | ⏱ 2-3 часа | 🚢 Теплоход | Выходные"
)

FLEET_TEXT = (
    "🚢 <b>Наш флот:</b>\n\n"
    "🛳 <b>Теплоход «Алыкул»</b>\n   Вместимость: до 200 чел | 2 палубы | Банкетный зал\n   Круизы, свадьбы, корпоративы\n\n"
    "⛵ <b>Яхта «Nomad»</b>\n   Вместимость: до 12 чел | VIP-обслуживание\n   Приватные чартеры, романтика\n\n"
    "🚤 <b>Скоростные катера</b>\n   Вместимость: до 8 чел | До 60 км/ч\n   Адреналиновые туры, вейкборд"
)

CONTACTS_TEXT = (
    "📞 <b>Контакты:</b>\n\n"
    "📱 Телефон: +996 555 123 456\n📧 Email: info@alykul.kg\n"
    f"🌐 Сайт: {SITE_URL}\n📍 Чолпон-Ата, Озеро Иссык-Куль\n\n"
    "💬 WhatsApp: wa.me/996555123456\n📸 Instagram: @alykul.kg"
)

WELCOME_TEXT = (
    "🚢 <b>Добро пожаловать в Алыкул!</b>\n\n"
    "Первая платформа водного туризма на озере Иссык-Куль.\n\nЧто вы хотите сделать?"
)

# --- Keyboard builders ---

def main_menu_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🔍 Найти рейс", callback_data="search")],
        [InlineKeyboardButton("💰 Цены", callback_data="prices")],
        [InlineKeyboardButton("📅 Расписание", callback_data="schedule")],
        [InlineKeyboardButton("🚢 Наш флот", callback_data="fleet")],
        [InlineKeyboardButton("❓ FAQ", callback_data="faq")],
        [InlineKeyboardButton("📞 Контакты", callback_data="contacts")],
        [InlineKeyboardButton("🌐 Открыть сайт", url=f"{SITE_URL}/ru")],
    ])

def back_kb(cb: str = "back_main") -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([[InlineKeyboardButton("⬅️ Назад", callback_data=cb)]])

def pier_kb() -> InlineKeyboardMarkup:
    buttons = [[InlineKeyboardButton(p, callback_data=f"pier_{p}")] for p in PIERS]
    buttons.append([InlineKeyboardButton("Все причалы", callback_data="pier_all")])
    buttons.append([InlineKeyboardButton("⬅️ Назад", callback_data="back_main")])
    return InlineKeyboardMarkup(buttons)

def date_kb(pier: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("Сегодня", callback_data=f"date_{pier}_today")],
        [InlineKeyboardButton("Завтра", callback_data=f"date_{pier}_tomorrow")],
        [InlineKeyboardButton("Эта неделя", callback_data=f"date_{pier}_week")],
        [InlineKeyboardButton("⬅️ Назад", callback_data="search")],
    ])

def faq_kb() -> InlineKeyboardMarkup:
    buttons = [[InlineKeyboardButton(f"{i+1}. {q}", callback_data=f"faq_{i}")] for i, (q, _) in enumerate(FAQ_ITEMS)]
    buttons.append([InlineKeyboardButton("⬅️ Назад", callback_data="back_main")])
    return InlineKeyboardMarkup(buttons)

def book_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("Забронировать", url=f"{SITE_URL}/ru/trips")],
        [InlineKeyboardButton("⬅️ Назад", callback_data="back_main")],
    ])

# --- Section renderers (text + keyboard pairs) ---

SECTIONS = {
    "prices":   (PRICES_TEXT, book_kb),
    "schedule": (SCHEDULE_TEXT, back_kb),
    "fleet":    (FLEET_TEXT, back_kb),
    "contacts": (CONTACTS_TEXT, back_kb),
    "faq":      ("❓ <b>Частые вопросы:</b>\n\nВыберите вопрос:", faq_kb),
    "search":   ("🔍 <b>Выберите причал отправления:</b>", pier_kb),
}

async def _send_section(section: str, update: Update) -> None:
    """Send a section as a reply to a message."""
    text, kb_fn = SECTIONS[section]
    await update.message.reply_text(text, reply_markup=kb_fn(), parse_mode="HTML")

# --- Command handlers ---

async def cmd_start(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(WELCOME_TEXT, reply_markup=main_menu_kb(), parse_mode="HTML")

async def cmd_help(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "📋 <b>Доступные команды:</b>\n\n"
        "/start — Главное меню\n/search — Найти рейс\n/prices — Цены\n"
        "/schedule — Расписание\n/fleet — Наш флот\n/faq — Частые вопросы\n"
        "/contacts — Контакты\n/help — Эта справка"
    )
    await update.message.reply_text(text, parse_mode="HTML")

async def cmd_prices(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("prices", update)

async def cmd_schedule(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("schedule", update)

async def cmd_fleet(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("fleet", update)

async def cmd_faq(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("faq", update)

async def cmd_contacts(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("contacts", update)

async def cmd_search(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await _send_section("search", update)

# --- Callback query router ---

async def callback_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    data = query.data

    # Back to main menu
    if data == "back_main":
        await query.edit_message_text(WELCOME_TEXT, reply_markup=main_menu_kb(), parse_mode="HTML")
        return

    # Simple sections (prices, schedule, fleet, contacts, faq, search)
    if data in SECTIONS:
        text, kb_fn = SECTIONS[data]
        await query.edit_message_text(text, reply_markup=kb_fn(), parse_mode="HTML")
        return

    # FAQ answer
    if data.startswith("faq_"):
        idx = int(data.split("_")[1])
        question, answer = FAQ_ITEMS[idx]
        kb = InlineKeyboardMarkup([
            [InlineKeyboardButton("⬅️ К вопросам", callback_data="faq")],
            [InlineKeyboardButton("⬅️ Главное меню", callback_data="back_main")],
        ])
        await query.edit_message_text(f"❓ <b>{question}</b>\n\n{answer}", reply_markup=kb, parse_mode="HTML")
        return

    # Pier chosen → date selection
    if data.startswith("pier_"):
        pier = data[5:]
        label = "все причалы" if pier == "all" else pier
        context.user_data["pier"] = pier
        await query.edit_message_text(
            f"📅 Причал: <b>{label}</b>\n\nВыберите дату:",
            reply_markup=date_kb(pier), parse_mode="HTML",
        )
        return

    # Date chosen → show trips
    if data.startswith("date_"):
        parts = data.split("_", 2)
        pier, when = parts[1], parts[2]
        date_label = {"today": "Сегодня", "tomorrow": "Завтра", "week": "Эта неделя"}.get(when, when)

        matched = TRIPS if pier == "all" else [t for t in TRIPS if t["pier"] in (pier, "Все причалы")]

        if not matched:
            await query.edit_message_text(
                f"😔 Рейсов из <b>{pier}</b> на <b>{date_label}</b> не найдено.",
                reply_markup=back_kb("search"), parse_mode="HTML",
            )
            return

        lines = [f"🔍 <b>Рейсы — {date_label}</b>\n"]
        for t in matched:
            lines.append(f"{t['name']}\n   📍 {t['pier']} | ⏰ {t['time']} | ⏱ {t['dur']}\n   🚢 {t['vessel']} | 💰 от {t['price']:,} KGS\n")

        kb = InlineKeyboardMarkup([
            [InlineKeyboardButton("🎫 Забронировать", url=f"{SITE_URL}/ru/trips")],
            [InlineKeyboardButton("🔍 Другой причал", callback_data="search")],
            [InlineKeyboardButton("⬅️ Главное меню", callback_data="back_main")],
        ])
        await query.edit_message_text("\n".join(lines), reply_markup=kb, parse_mode="HTML")
        return

# --- Free-text handler (keyword matching) ---

KEYWORD_MAP = {
    "prices": ("цена", "цены", "price", "стоимость", "сколько стоит"),
    "schedule": ("расписание", "schedule", "время", "когда"),
    "search": ("бронь", "бронирование", "book", "забронировать"),
    "fleet": ("флот", "fleet", "корабль", "яхта", "катер", "теплоход"),
    "faq": ("вопрос", "faq", "помощь"),
    "contacts": ("контакт", "телефон", "phone", "email", "адрес"),
}

async def free_text_handler(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    msg = update.message.text.lower().strip()
    for action, keywords in KEYWORD_MAP.items():
        if any(kw in msg for kw in keywords):
            await _send_section(action, update)
            return
    await update.message.reply_text("🤔 Я не совсем понял. Вот что я умею:", reply_markup=main_menu_kb(), parse_mode="HTML")

# --- Admin notification helper ---

async def notify_admin_booking(app: Application, booking_info: str) -> None:
    """Send a booking notification to the admin chat (called externally)."""
    if ADMIN_CHAT_ID:
        await app.bot.send_message(
            chat_id=int(ADMIN_CHAT_ID),
            text=f"🔔 <b>Новое бронирование!</b>\n\n{booking_info}",
            parse_mode="HTML",
        )

# --- Main ---

def main() -> None:
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help", cmd_help))
    app.add_handler(CommandHandler("search", cmd_search))
    app.add_handler(CommandHandler("prices", cmd_prices))
    app.add_handler(CommandHandler("schedule", cmd_schedule))
    app.add_handler(CommandHandler("fleet", cmd_fleet))
    app.add_handler(CommandHandler("faq", cmd_faq))
    app.add_handler(CommandHandler("contacts", cmd_contacts))
    app.add_handler(CallbackQueryHandler(callback_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, free_text_handler))

    logger.info("Alykul bot starting (polling mode)...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
