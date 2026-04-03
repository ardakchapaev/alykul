'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

// --- i18n ---
const t = {
  ru: {
    title: 'AI-разговоры',
    subtitle: 'Все диалоги AI-ассистента по каналам',
    all: 'Все',
    website: 'Сайт',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    search: 'Поиск по телефону или имени...',
    messages: 'сообщений',
    lastActive: 'Активен',
    noResults: 'Разговоры не найдены',
    collapse: 'Свернуть',
  },
  en: {
    title: 'AI Conversations',
    subtitle: 'All AI assistant dialogs across channels',
    all: 'All',
    website: 'Website',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    search: 'Search by phone or name...',
    messages: 'messages',
    lastActive: 'Active',
    noResults: 'No conversations found',
    collapse: 'Collapse',
  },
  ky: {
    title: 'AI-сүйлөшүүлөр',
    subtitle: 'AI-ассистенттин бардык диалогдору',
    all: 'Баары',
    website: 'Сайт',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    search: 'Телефон же ат боюнча издөө...',
    messages: 'билдирүү',
    lastActive: 'Активдүү',
    noResults: 'Сүйлөшүүлөр табылган жок',
    collapse: 'Жыйноо',
  },
} as const;

type Lang = keyof typeof t;
type ChannelType = 'all' | 'website' | 'telegram' | 'whatsapp';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface Conversation {
  id: number;
  channel: 'website' | 'telegram' | 'whatsapp';
  customerName: string | null;
  customerPhone: string;
  lastMessage: string;
  messageCount: number;
  lastActive: string;
  messages: Message[];
}

const channelIcons: Record<string, string> = {
  website: '\uD83C\uDF10',
  telegram: '\uD83D\uDCF1',
  whatsapp: '\uD83D\uDCAC',
};

const channelColors: Record<string, string> = {
  website: 'bg-blue-100 text-blue-700',
  telegram: 'bg-sky-100 text-sky-700',
  whatsapp: 'bg-green-100 text-green-700',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockConversations: Conversation[] = [
  {
    id: 1, channel: 'website', customerName: 'Айбек Турсунов', customerPhone: '+996 555 112 233',
    lastMessage: 'Спасибо! Буду бронировать на июль.', messageCount: 8, lastActive: '2026-04-03 14:23',
    messages: [
      { role: 'user', content: 'Здравствуйте! Какие экскурсии есть на Иссык-Куле?', time: '14:10' },
      { role: 'assistant', content: 'Здравствуйте! У нас есть закатный круиз (2 часа, 2800 сом), утренний бриз (1.5 часа, 1400 сом), дневная прогулка (2.5 часа, 1800 сом) и VIP-чартер (от 3 часов, 7000 сом). Что вас интересует?', time: '14:10' },
      { role: 'user', content: 'Закатный круиз звучит отлично. А когда сезон?', time: '14:12' },
      { role: 'assistant', content: 'Сезон с июня по сентябрь. Закатный круиз отправляется ежедневно. В июне-июле выход в 19:00, в августе в 18:30, в сентябре в 18:00. На борту есть мини-бар и снеки.', time: '14:12' },
      { role: 'user', content: 'А сколько человек вмещает яхта?', time: '14:15' },
      { role: 'assistant', content: 'Яхта Nomad вмещает до 20 пассажиров. Для комфортного круиза рекомендуем группу до 15 человек. Также доступен VIP-чартер, где вся яхта только для вас.', time: '14:15' },
      { role: 'user', content: 'Можно с детьми 5 лет?', time: '14:20' },
      { role: 'assistant', content: 'Конечно! Дети от 3 лет допускаются на все рейсы. Мы предоставляем детские спасательные жилеты. Дети до 6 лет — бесплатно. Рекомендуем закатный круиз или дневную прогулку для семей с маленькими детьми.', time: '14:20' },
      { role: 'user', content: 'Спасибо! Буду бронировать на июль.', time: '14:23' },
      { role: 'assistant', content: 'Отлично! Вы можете забронировать на сайте или написать нам. Рекомендую бронировать за 3-5 дней, особенно в июле — места заполняются быстро. Хорошего отдыха!', time: '14:23' },
    ],
  },
  {
    id: 2, channel: 'telegram', customerName: null, customerPhone: '+996 700 445 566',
    lastMessage: 'VIP чартер на 15 июля, 4 человека', messageCount: 5, lastActive: '2026-04-03 11:45',
    messages: [
      { role: 'user', content: 'Привет, хочу арендовать яхту целиком', time: '11:30' },
      { role: 'assistant', content: 'Здравствуйте! VIP-чартер на яхте Nomad — отличный выбор. Стоимость от 7000 сом за 3 часа. В стоимость входит: персональный капитан, шампанское, фрукты, декор по желанию. На какую дату планируете?', time: '11:30' },
      { role: 'user', content: 'На 15 июля, нас будет 4 человека', time: '11:35' },
      { role: 'assistant', content: '15 июля доступно! Для 4 человек будет очень комфортно. Какое время предпочитаете? Самый популярный вариант — закатный VIP-чартер с 18:00 до 21:00.', time: '11:35' },
      { role: 'user', content: 'VIP чартер на 15 июля, 4 человека', time: '11:45' },
      { role: 'assistant', content: 'Записал! VIP-чартер 15 июля, 18:00-21:00, 4 человека. Стоимость 7000 сом. Для подтверждения нужна предоплата 50%. Могу отправить реквизиты для оплаты?', time: '11:45' },
    ],
  },
  {
    id: 3, channel: 'whatsapp', customerName: 'Марат Белеков', customerPhone: '+996 555 778 899',
    lastMessage: 'А есть рыбалка на яхте?', messageCount: 4, lastActive: '2026-04-02 19:30',
    messages: [
      { role: 'user', content: 'Салам! Есть ли экскурсии с рыбалкой?', time: '19:15' },
      { role: 'assistant', content: 'Салам! Да, у нас есть маршрут "Рыбалка на озере" — 4 часа, выход в 5:00 утра. Стоимость 3500 сом. Включает снасти, наживку и горячий чай. Ловим форель и чебачок.', time: '19:15' },
      { role: 'user', content: 'А улов можно забрать?', time: '19:25' },
      { role: 'assistant', content: 'Конечно! Весь ваш улов — ваш. Мы также можем приготовить свежепойманную рыбу прямо на борту за дополнительные 500 сом (повар готовит на гриле).', time: '19:25' },
      { role: 'user', content: 'А есть рыбалка на яхте?', time: '19:30' },
      { role: 'assistant', content: 'Да, рыбалка проходит именно на яхте Nomad. Выходим в открытое озеро, где рыба клюёт лучше всего. Капитан знает все секретные точки. Забронировать?', time: '19:30' },
    ],
  },
  {
    id: 4, channel: 'website', customerName: null, customerPhone: '+996 700 111 222',
    lastMessage: 'Какая погода обычно в августе?', messageCount: 3, lastActive: '2026-04-02 16:10',
    messages: [
      { role: 'user', content: 'Здравствуйте, планируем отпуск в августе. Стоит ли бронировать яхту?', time: '16:00' },
      { role: 'assistant', content: 'Здравствуйте! Август — идеальное время для яхтенных прогулок. Вода прогревается до 22-24 градусов, погода стабильная. Рекомендую закатный круиз — самые красивые закаты именно в августе.', time: '16:00' },
      { role: 'user', content: 'Какая погода обычно в августе?', time: '16:10' },
      { role: 'assistant', content: 'В августе на Иссык-Куле средняя температура воздуха 25-28 градусов, воды 22-24 градуса. Дожди редки, обычно ясно. Ветер "улан" бывает 2-3 раза в месяц, но мы следим за прогнозом и в плохую погоду не выходим. Рейс переносят бесплатно.', time: '16:10' },
    ],
  },
  {
    id: 5, channel: 'telegram', customerName: 'Жибек Асанова', customerPhone: '+996 555 333 444',
    lastMessage: 'Отлично, бронирую!', messageCount: 6, lastActive: '2026-04-02 10:20',
    messages: [
      { role: 'user', content: 'Хочу организовать день рождения дочери на яхте, ей 8 лет', time: '09:50' },
      { role: 'assistant', content: 'Отличная идея! Детский праздник на яхте — незабываемое впечатление. Для 8-летней именинницы рекомендуем программу на 3 часа: морские игры с аниматором-пиратом, купание, праздничный стол и торт на палубе. Сколько детей планируете?', time: '09:50' },
      { role: 'user', content: 'Около 10 детей и 3 взрослых', time: '09:55' },
      { role: 'assistant', content: 'Идеально! Для 10 детей подходит базовый пакет за 15,000 сом. Включает: яхту на 3 часа, аниматора, декор, детское меню (мини-бургеры, наггетсы, фрукты, соки). Торт можно заказать у нашего кондитера или привезти свой.', time: '09:55' },
      { role: 'user', content: 'А безопасность? Все-таки дети...', time: '10:10' },
      { role: 'assistant', content: 'Полностью понимаю. У нас все дети получают спасательные жилеты по размеру. Во время купания в воде дежурит сертифицированный спасатель. Палуба с нескользящим покрытием. Аниматоры проходят инструктаж по безопасности. За 15 лет — ни одного инцидента.', time: '10:10' },
      { role: 'user', content: 'А на какую дату можно?', time: '10:15' },
      { role: 'assistant', content: 'Июль и август — самые популярные месяцы, рекомендую бронировать за 2 недели. Какая дата удобна? Выходные заполняются быстрее, будни посвободнее.', time: '10:15' },
      { role: 'user', content: 'Отлично, бронирую!', time: '10:20' },
      { role: 'assistant', content: 'Супер! Для бронирования нужны: дата, время (обычно 11:00-14:00 для детских праздников), точное количество детей, и аллергии/пищевые ограничения. Предоплата 30% — 4,500 сом. Отправить реквизиты?', time: '10:20' },
    ],
  },
  {
    id: 6, channel: 'whatsapp', customerName: 'Тимур Кадыров', customerPhone: '+996 700 555 666',
    lastMessage: 'Можно оплатить картой на борту?', messageCount: 3, lastActive: '2026-04-01 20:45',
    messages: [
      { role: 'user', content: 'Цены на круиз?', time: '20:30' },
      { role: 'assistant', content: 'Добрый вечер! Наши цены: закатный круиз — 2800 сом/чел, утренний бриз — 1400 сом/чел, дневная прогулка — 1800 сом/чел, рыбалка — 3500 сом/чел, VIP-чартер — от 7000 сом (вся яхта). Дети до 6 лет бесплатно.', time: '20:30' },
      { role: 'user', content: 'Можно оплатить картой на борту?', time: '20:45' },
      { role: 'assistant', content: 'Да, принимаем карты Visa/Mastercard, Элкарт, а также O!Деньги и Balance. Наличные тоже принимаем. При онлайн-бронировании через сайт доступна оплата картой с подтверждением.', time: '20:45' },
    ],
  },
  {
    id: 7, channel: 'website', customerName: 'Анна Петрова', customerPhone: '+7 926 111 2233',
    lastMessage: 'Прилетаем из Москвы 20 июля, хотим круиз в первый день', messageCount: 7, lastActive: '2026-04-01 15:00',
    messages: [
      { role: 'user', content: 'Здравствуйте! Мы туристы из России, будем на Иссык-Куле в конце июля. Какие экскурсии порекомендуете?', time: '14:30' },
      { role: 'assistant', content: 'Здравствуйте! Добро пожаловать на Иссык-Куль! Для первого визита рекомендую закатный круиз — это визитная карточка нашего сервиса. 2 часа, потрясающие виды, мини-бар на борту. Стоимость 2800 сом (примерно 2600 рублей).', time: '14:30' },
      { role: 'user', content: 'Звучит здорово! А где находитесь?', time: '14:35' },
      { role: 'assistant', content: 'Мы базируемся в Чолпон-Ате — главном курортном городе на северном берегу. От аэропорта Тамчы до нас 30 минут на такси. От Бишкека — 4 часа на машине. Можем помочь с трансфером.', time: '14:35' },
      { role: 'user', content: 'Мы будем в отеле Каприз', time: '14:40' },
      { role: 'assistant', content: 'Отель "Каприз" — отличный выбор! Он в 10 минутах езды от нашей пристани. Мы можем организовать бесплатный трансфер от отеля при бронировании VIP-чартера, или подскажем как добраться.', time: '14:40' },
      { role: 'user', content: 'Прилетаем из Москвы 20 июля, хотим круиз в первый день', time: '15:00' },
      { role: 'assistant', content: 'Отлично! 20 июля записываю. Рейс из Москвы обычно прилетает днём — рекомендую закатный круиз в 19:00. Как раз успеете заселиться и отдохнуть. Бронирую 2 места на закатный круиз 20 июля?', time: '15:00' },
    ],
  },
  {
    id: 8, channel: 'telegram', customerName: 'Эрлан Жумабеков', customerPhone: '+996 555 999 000',
    lastMessage: 'Корпоратив на 15 человек, 1 августа', messageCount: 4, lastActive: '2026-04-01 12:15',
    messages: [
      { role: 'user', content: 'Добрый день, нужен корпоратив на яхте для компании', time: '12:00' },
      { role: 'assistant', content: 'Добрый день! Корпоратив на яхте — отличная идея. Яхта Nomad вмещает до 20 человек. Сколько гостей и на какую дату?', time: '12:00' },
      { role: 'user', content: 'Корпоратив на 15 человек, 1 августа', time: '12:05' },
      { role: 'assistant', content: '1 августа свободно! Для 15 человек рекомендую VIP-чартер на 4 часа — 12,000 сом. Включает: яхту, капитана, стюарда, шампанское, закуски. Дополнительно: фуршетное меню от 800 сом/чел, проектор для презентаций, тимбилдинг-программа. Составить индивидуальное предложение?', time: '12:05' },
      { role: 'user', content: 'Да, пришлите КП на почту erlan@company.kg', time: '12:15' },
      { role: 'assistant', content: 'Обязательно! Отправлю коммерческое предложение на erlan@company.kg в течение 2 часов. Включу варианты программы, меню и стоимость. Спасибо за интерес!', time: '12:15' },
    ],
  },
  {
    id: 9, channel: 'whatsapp', customerName: null, customerPhone: '+996 700 222 333',
    lastMessage: 'Когда начинается сезон 2026?', messageCount: 2, lastActive: '2026-03-31 18:00',
    messages: [
      { role: 'user', content: 'Когда начинается сезон 2026?', time: '18:00' },
      { role: 'assistant', content: 'Сезон 2026 стартует 1 июня! Первый рейс — закатный круиз 1 июня в 19:00. Раннее бронирование со скидкой 10% до 15 мая. Записать вас на открытие сезона?', time: '18:00' },
    ],
  },
  {
    id: 10, channel: 'website', customerName: 'Гульмира Абдырахманова', customerPhone: '+996 555 444 777',
    lastMessage: 'Спасибо за информацию!', messageCount: 5, lastActive: '2026-03-31 11:30',
    messages: [
      { role: 'user', content: 'У вас есть групповые скидки?', time: '11:00' },
      { role: 'assistant', content: 'Да! Групповые скидки: от 5 человек — 10%, от 10 человек — 15%, от 15 человек — 20%. Действует на все регулярные рейсы. VIP-чартер рассчитывается индивидуально.', time: '11:00' },
      { role: 'user', content: 'Нас 8 человек, хотим закатный круиз', time: '11:10' },
      { role: 'assistant', content: 'Для 8 человек скидка 10%! Закатный круиз: 2800 сом x 8 = 22,400 сом. Со скидкой: 20,160 сом (2,520 сом/чел). Экономия 2,240 сом!', time: '11:10' },
      { role: 'user', content: 'А бронировать нужно заранее?', time: '11:20' },
      { role: 'assistant', content: 'Для группы 8+ рекомендую за 5-7 дней, чтобы гарантировать места. В пиковые выходные июля-августа — за 2 недели. Предоплата 30% для бронирования.', time: '11:20' },
      { role: 'user', content: 'Спасибо за информацию!', time: '11:30' },
      { role: 'assistant', content: 'Пожалуйста! Будем рады видеть вашу группу на борту. Бронируйте на сайте или напишите нам. Хорошего дня!', time: '11:30' },
    ],
  },
  {
    id: 11, channel: 'telegram', customerName: 'Бакыт Токтогулов', customerPhone: '+996 700 888 999',
    lastMessage: 'А фотограф входит в стоимость?', messageCount: 3, lastActive: '2026-03-30 17:45',
    messages: [
      { role: 'user', content: 'Хочу сделать предложение девушке на яхте', time: '17:30' },
      { role: 'assistant', content: 'Поздравляю с решением! Мы специализируемся на организации предложений на яхте. За 2 сезона помогли 12 парам — все получили "да"! VIP-чартер на закат + декор (лепестки, свечи, шары) + шампанское = 10,000 сом. Фотограф дополнительно 3,000 сом — он снимает скрыто с верхней палубы.', time: '17:30' },
      { role: 'user', content: 'А фотограф входит в стоимость?', time: '17:45' },
      { role: 'assistant', content: 'Фотограф оплачивается отдельно — 3,000 сом за 2 часа съёмки, 50+ обработанных фото в течение 3 дней. Но поверьте, это того стоит — момент предложения на фоне заката над Иссык-Кулем будет с вами навсегда. Могу показать примеры фото с прошлых предложений?', time: '17:45' },
    ],
  },
  {
    id: 12, channel: 'whatsapp', customerName: 'Нурлан Сатыбалдиев', customerPhone: '+996 555 666 111',
    lastMessage: 'Ок спасибо буду думать', messageCount: 4, lastActive: '2026-03-30 09:15',
    messages: [
      { role: 'user', content: 'Сколько стоит рыбалка?', time: '09:00' },
      { role: 'assistant', content: 'Рыбалка на озере — 3500 сом/чел. Включает: 4 часа на яхте, снасти и наживку, горячий чай. Выход в 5:00 утра. Улов ваш, можем приготовить на борту за +500 сом.', time: '09:00' },
      { role: 'user', content: 'А что ловится?', time: '09:10' },
      { role: 'assistant', content: 'В Иссык-Куле ловится форель (радужная и иссык-кульская), чебачок, маринка. Лучший клёв — раннее утро и вечер. Капитан знает все секретные точки. Средний улов — 3-5 рыб за рейс.', time: '09:10' },
      { role: 'user', content: 'Ок спасибо буду думать', time: '09:15' },
      { role: 'assistant', content: 'Хорошо! Если решите — пишите, забронирую. Сезон рыбалки с июня по сентябрь, лучшие месяцы — июнь и сентябрь (меньше туристов, рыба активнее). Хорошего дня!', time: '09:15' },
    ],
  },
];

function formatLastActive(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  const now = new Date('2026-04-03T18:00:00');
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return lang === 'en' ? 'Just now' : lang === 'ky' ? 'Жаңы эле' : 'Только что';
  if (hours < 24) return `${hours}${lang === 'en' ? 'h ago' : lang === 'ky' ? ' саат мурун' : 'ч назад'}`;
  if (days === 1) return lang === 'en' ? 'Yesterday' : lang === 'ky' ? 'Кечээ' : 'Вчера';
  return `${days}${lang === 'en' ? 'd ago' : lang === 'ky' ? ' күн мурун' : 'д назад'}`;
}

export default function AdminConversationsPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ru';
  const dict = t[lang] || t.ru;
  const { token } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ChannelType>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${API_URL}/ai/sessions/all`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setConversations(
            data.map((c: Record<string, unknown>, idx: number) => ({
              id: (c.id as number) || idx + 1,
              channel: (c.channel as 'website' | 'telegram' | 'whatsapp') || 'website',
              customerName: (c.customer_name as string) || null,
              customerPhone: (c.customer_phone as string) || '',
              lastMessage: (c.last_message as string) || '',
              messageCount: (c.message_count as number) || 0,
              lastActive: (c.last_active as string) || (c.updated_at as string) || '',
              messages: Array.isArray(c.messages)
                ? (c.messages as Record<string, unknown>[]).map((m) => ({
                    role: (m.role as 'user' | 'assistant') || 'user',
                    content: (m.content as string) || '',
                    time: (m.time as string) || '',
                  }))
                : [],
            }))
          );
        }
      } catch {
        // API error — keep empty array
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [token]);

  const filtered = conversations.filter((c) => {
    if (filter !== 'all' && c.channel !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.customerPhone.toLowerCase().includes(q) ||
        (c.customerName && c.customerName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const tabs: { key: ChannelType; label: string }[] = [
    { key: 'all', label: dict.all },
    { key: 'website', label: dict.website },
    { key: 'telegram', label: dict.telegram },
    { key: 'whatsapp', label: dict.whatsapp },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0F2B46] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{dict.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{dict.subtitle}</p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.search}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">{dict.noResults}</p>
        )}

        {filtered.map((conv) => {
          const isExpanded = expandedId === conv.id;
          return (
            <div key={conv.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Summary row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : conv.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors text-left"
              >
                {/* Channel icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${channelColors[conv.channel]}`}>
                  {channelIcons[conv.channel]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {conv.customerName || conv.customerPhone}
                    </span>
                    {conv.customerName && (
                      <span className="text-xs text-gray-400 hidden sm:inline">{conv.customerPhone}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-gray-400">{formatLastActive(conv.lastActive, lang)}</span>
                  <span className="text-xs text-gray-400">{conv.messageCount} {dict.messages}</span>
                </div>

                {/* Expand arrow */}
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded chat */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/30 px-5 py-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {conv.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3.5 py-2.5 text-sm ${
                            msg.role === 'user'
                              ? 'bg-white border border-gray-200 text-gray-800'
                              : 'bg-[#0F2B46] text-white'
                          }`}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-gray-400' : 'text-white/50'}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {dict.collapse}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
