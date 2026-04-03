'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

// --- Types ---
type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'image'; content: string; caption?: string }
  | { type: 'list'; content: string; items: string[] }
  | { type: 'quote'; content: string };

interface Article {
  id: number;
  slug: string;
  title: { ru: string; en: string; ky: string };
  excerpt: { ru: string; en: string; ky: string };
  image: string;
  date: string;
  category: { ru: string; en: string; ky: string };
  readTime: { ru: string; en: string; ky: string };
  author: string;
  content: { ru: ContentBlock[]; en: ContentBlock[]; ky: ContentBlock[] };
}

// --- i18n ---
const ui = {
  backToBlog: { ru: 'Назад в блог', en: 'Back to Blog', ky: 'Блогго кайтуу' },
  share: { ru: 'Поделиться', en: 'Share', ky: 'Бөлүшүү' },
  bookTrip: { ru: 'Забронировать поездку', en: 'Book a Trip', ky: 'Саякатка брондоо' },
  bookCta: { ru: 'Готовы к незабываемому отдыху на озере Иссык-Куль?', en: 'Ready for an unforgettable trip on Lake Issyk-Kul?', ky: 'Ысык-Көлдө унутулгус эс алууга даярсызбы?' },
  bookBtn: { ru: 'Смотреть рейсы', en: 'View Trips', ky: 'Каттамдарды көрүү' },
  relatedTitle: { ru: 'Читайте также', en: 'Related Articles', ky: 'Дагы окуңуз' },
  notFound: { ru: 'Статья не найдена', en: 'Article not found', ky: 'Макала табылган жок' },
  author: { ru: 'Автор', en: 'Author', ky: 'Автор' },
};

// --- Articles data ---
const articles: Article[] = [
  {
    id: 1, slug: 'top-5-routes-issyk-kul',
    title: { ru: 'Топ-5 маршрутов на Иссык-Куле', en: 'Top 5 Routes on Issyk-Kul', ky: 'Ысык-Көлдөгү 5 мыкты маршрут' },
    excerpt: { ru: 'Откройте для себя самые живописные водные маршруты по озеру Иссык-Куль.', en: 'Discover the most scenic water routes across Lake Issyk-Kul.', ky: 'Ысык-Көл боюнча эң кооз суу маршруттарын ачыңыз.' },
    image: '/images/scene7.jpg', date: '2026-03-15', author: 'Капитан Азамат',
    category: { ru: 'Маршруты', en: 'Routes', ky: 'Маршруттар' },
    readTime: { ru: '5 мин', en: '5 min', ky: '5 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'Озеро Иссык-Куль — одно из крупнейших высокогорных озёр мира, и каждый маршрут по нему открывает совершенно новые виды. За годы работы на воде мы выделили пять маршрутов, которые наши гости любят больше всего.' },
        { type: 'heading', content: '1. Закатный круиз из Чолпон-Аты' },
        { type: 'paragraph', content: 'Классический маршрут длительностью 2 часа. Яхта выходит из гавани Чолпон-Аты за 1,5 часа до заката и направляется вдоль северного берега. Вы увидите горы Кунгей Ала-Тоо в золотистом свете, а на обратном пути — потрясающий закат над водой. Идеально для пар и романтических вечеров.' },
        { type: 'heading', content: '2. Тур к ущелью Жети-Огуз с воды' },
        { type: 'paragraph', content: 'Этот маршрут проходит вдоль южного берега и позволяет увидеть знаменитые красные скалы Жети-Огуз со стороны озера. Продолжительность — 4 часа, включая остановку для купания в чистейшей воде. Берег здесь менее застроен, и природа поражает первозданной красотой.' },
        { type: 'heading', content: '3. Утренний бриз — рассвет на воде' },
        { type: 'paragraph', content: 'Выход в 5:30 утра. Озеро в это время абсолютно гладкое, как зеркало. Маршрут идёт от Чолпон-Аты в сторону Бостери, и вы встретите рассвет прямо на воде. Температура воздуха прохладная, поэтому мы предоставляем тёплые пледы и горячий чай. Лучший маршрут для фотографов.' },
        { type: 'heading', content: '4. Обзорный тур вокруг бухты Тамга' },
        { type: 'paragraph', content: 'Тамга — одно из самых тихих мест на южном берегу. Маршрут длится 3 часа и проходит вдоль скалистых берегов с видом на заснеженные вершины. Мы делаем остановку у Тамгинских наскальных рисунков, которым более 3000 лет. Маршрут подходит для семей и любителей истории.' },
        { type: 'heading', content: '5. Спортивный маршрут: Чолпон-Ата — Балыкчы' },
        { type: 'paragraph', content: 'Полный дневной тур длительностью 6 часов для тех, кто хочет увидеть всё западное побережье. Включает остановки для снорклинга, обед на борту и возможность порыбачить. Мы проходим мимо петроглифов под открытым небом и заканчиваем маршрут в историческом Балыкчы.' },
        { type: 'quote', content: 'Каждый маршрут — это не просто поездка, а возможность увидеть Иссык-Куль с той стороны, которую знают только местные рыбаки и капитаны. — Капитан Азамат' },
      ],
      en: [
        { type: 'paragraph', content: 'Lake Issyk-Kul is one of the largest high-altitude lakes in the world, and each route across it reveals entirely new views. Over years of working on the water, we have identified five routes that our guests love the most.' },
        { type: 'heading', content: '1. Sunset Cruise from Cholpon-Ata' },
        { type: 'paragraph', content: 'A classic 2-hour route. The yacht departs Cholpon-Ata harbor 1.5 hours before sunset and heads along the northern shore. You will see the Kungey Ala-Too mountains in golden light, and on the way back — a stunning sunset over the water. Perfect for couples and romantic evenings.' },
        { type: 'heading', content: '2. Tour to Jeti-Oguz Gorge from the Water' },
        { type: 'paragraph', content: 'This route follows the southern shore and offers views of the famous red rocks of Jeti-Oguz from the lake side. Duration is 4 hours, including a stop for swimming in crystal-clear water. The shore here is less developed, and nature is strikingly pristine.' },
        { type: 'heading', content: '3. Morning Breeze — Sunrise on the Water' },
        { type: 'paragraph', content: 'Departure at 5:30 AM. The lake at this time is perfectly smooth like a mirror. The route goes from Cholpon-Ata toward Bosteri, and you will meet the sunrise right on the water. Air temperature is cool, so we provide warm blankets and hot tea. The best route for photographers.' },
        { type: 'heading', content: '4. Scenic Tour around Tamga Bay' },
        { type: 'paragraph', content: 'Tamga is one of the quietest spots on the southern shore. The route lasts 3 hours and passes along rocky shores with views of snow-capped peaks. We stop at the Tamga petroglyphs, which are over 3,000 years old. Suitable for families and history lovers.' },
        { type: 'heading', content: '5. Sport Route: Cholpon-Ata to Balykchy' },
        { type: 'paragraph', content: 'A full-day 6-hour tour for those who want to see the entire western coast. Includes stops for snorkeling, lunch on board, and fishing opportunities. We pass open-air petroglyphs and finish the route in historic Balykchy.' },
        { type: 'quote', content: 'Each route is not just a trip, but a chance to see Issyk-Kul from a side known only to local fishermen and captains. — Captain Azamat' },
      ],
      ky: [
        { type: 'paragraph', content: 'Ысык-Көл дүйнөдөгү эң чоң бийик тоолуу көлдөрдүн бири, жана ар бир маршрут жаңы көрүнүштөрдү ачат.' },
        { type: 'heading', content: '1. Чолпон-Атадан кечки круиз' },
        { type: 'paragraph', content: 'Классикалык 2 сааттык маршрут. Яхта күн батаардан 1,5 саат мурун чыгып, түндүк жээк менен жүрөт. Кооз закат жана тоолордун алтын нуру сизди күтөт.' },
        { type: 'heading', content: '2. Жети-Өгүз капчыгайына суу жагынан тур' },
        { type: 'paragraph', content: '4 сааттык маршрут түштүк жээк менен өтөт. Жети-Өгүздүн кызыл аскалары көл тарабынан ажайып көрүнөт.' },
        { type: 'heading', content: '3. Эртең мененки самал — суудагы таң' },
        { type: 'paragraph', content: 'Саат 5:30да чыгуу. Көл күзгүдөй жылмакай. Эң мыкты фотографтар үчүн маршрут.' },
        { type: 'heading', content: '4. Тамга бухтасын кыдыруу' },
        { type: 'paragraph', content: '3 сааттык маршрут. Тамганын 3000 жылдык петроглифтерин көрүү мүмкүнчүлүгү.' },
        { type: 'heading', content: '5. Спорттук маршрут: Чолпон-Ата — Балыкчы' },
        { type: 'paragraph', content: '6 сааттык толук күндүк тур. Сноркелинг, борттогу түшкү тамак жана балык уулоо мүмкүнчүлүгү.' },
        { type: 'quote', content: 'Ар бир маршрут — жөн гана саякат эмес, Ысык-Көлдү жергиликтүү балыкчылар жана капитандар гана билген тарабынан көрүү мүмкүнчүлүгү. — Капитан Азамат' },
      ],
    },
  },
  {
    id: 2, slug: 'sunset-cruise-guide',
    title: { ru: 'Гид по закатному круизу', en: 'Sunset Cruise Guide', ky: 'Кечки круиз боюнча гид' },
    excerpt: { ru: 'Всё о закатном круизе из Чолпон-Аты.', en: 'Everything about the sunset cruise from Cholpon-Ata.', ky: 'Чолпон-Атадан кечки круиз жөнүндө баары.' },
    image: '/images/q02.jpg', date: '2026-03-10', author: 'Капитан Азамат',
    category: { ru: 'Советы', en: 'Tips', ky: 'Кеңештер' },
    readTime: { ru: '4 мин', en: '4 min', ky: '4 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'Закатный круиз — это наш самый популярный маршрут, и неспроста. Два часа на воде, когда солнце медленно опускается за горы, превращают обычный вечер в событие, которое вы будете помнить годами. Вот полный гид, чтобы ваш круиз прошёл идеально.' },
        { type: 'heading', content: 'Расписание и маршрут' },
        { type: 'paragraph', content: 'Яхта отправляется ежедневно с июня по сентябрь. Время отправления меняется в зависимости от сезона: в июне-июле выход в 19:00, в августе — в 18:30, в сентябре — в 18:00. Маршрут идёт из гавани Чолпон-Аты на запад вдоль берега, разворот у мыса и возвращение через центр озера. Общее расстояние — около 15 км.' },
        { type: 'heading', content: 'Что взять с собой' },
        { type: 'list', content: 'Список необходимых вещей:', items: [
          'Лёгкая куртка или ветровка — на воде к вечеру прохладнее на 5-7 градусов',
          'Солнцезащитные очки — закатное солнце слепит особенно сильно',
          'Камера или смартфон с заряженной батареей — моменты невероятные',
          'Купальник — если хотите искупаться во время остановки',
          'Наличные или карту для бара на борту',
        ]},
        { type: 'heading', content: 'Что ожидать на борту' },
        { type: 'paragraph', content: 'На борту яхты Nomad работает мини-бар с прохладительными напитками, снеками и лёгкими закусками. Для VIP-гостей доступен отдельный стол с фруктами и шампанским. Капитан расскажет об истории озера и интересных местах, мимо которых вы проплываете. На верхней палубе расположены мягкие подушки для отдыха.' },
        { type: 'heading', content: 'Лучшие точки для фото' },
        { type: 'paragraph', content: 'Самые впечатляющие кадры получаются в три момента: на выходе из гавани, когда открывается панорама гор; в точке разворота, когда солнце касается горизонта; и на обратном пути, когда небо окрашивается в розово-оранжевые тона. Капитан всегда замедляет ход в эти моменты.' },
        { type: 'quote', content: 'Закат на Иссык-Куле — это не просто природное явление, это спектакль, который озеро ставит каждый вечер. И лучшие места — в первом ряду, на палубе нашей яхты.' },
      ],
      en: [
        { type: 'paragraph', content: 'The sunset cruise is our most popular route, and for good reason. Two hours on the water as the sun slowly descends behind the mountains turn an ordinary evening into an event you will remember for years. Here is a complete guide for the perfect cruise.' },
        { type: 'heading', content: 'Schedule and Route' },
        { type: 'paragraph', content: 'The yacht departs daily from June to September. Departure time varies by season: June-July at 7:00 PM, August at 6:30 PM, September at 6:00 PM. The route goes from Cholpon-Ata harbor westward along the shore, turns at the cape, and returns through the center of the lake. Total distance is about 15 km.' },
        { type: 'heading', content: 'What to Bring' },
        { type: 'list', content: 'Essential items:', items: [
          'Light jacket or windbreaker — it is 5-7 degrees cooler on the water by evening',
          'Sunglasses — the setting sun is especially blinding',
          'Camera or charged smartphone — the moments are incredible',
          'Swimsuit — in case you want to swim during the stop',
          'Cash or card for the onboard bar',
        ]},
        { type: 'heading', content: 'What to Expect on Board' },
        { type: 'paragraph', content: 'The Nomad yacht features a mini-bar with cold drinks, snacks, and light appetizers. VIP guests have access to a separate table with fruits and champagne. The captain will share the history of the lake and interesting landmarks you pass. The upper deck has soft cushions for relaxation.' },
        { type: 'heading', content: 'Best Photo Spots' },
        { type: 'paragraph', content: 'The most impressive shots come at three moments: leaving the harbor with a mountain panorama; at the turning point when the sun touches the horizon; and on the way back when the sky turns pink-orange. The captain always slows down at these moments.' },
        { type: 'quote', content: 'A sunset on Issyk-Kul is not just a natural phenomenon — it is a show the lake puts on every evening. And the best seats are in the front row, on the deck of our yacht.' },
      ],
      ky: [
        { type: 'paragraph', content: 'Кечки круиз — биздин эң популярдуу маршрут. Күн тоолордун артына батканда суудагы 2 саат — бул жылдар бою эсиңизде калуучу окуя.' },
        { type: 'heading', content: 'Тартип жана маршрут' },
        { type: 'paragraph', content: 'Яхта июндан сентябрга чейин күн сайын жөнөйт. Чолпон-Ата гавандан батышка карай, мурундан бурулуп, көлдүн ортосу менен кайтат.' },
        { type: 'heading', content: 'Эмне алуу керек' },
        { type: 'list', content: 'Зарыл буюмдар:', items: [
          'Жеңил куртка — кечинде сууда 5-7 градуска муздак',
          'Күндөн коргоочу көз айнек',
          'Камера же заряддалган смартфон',
          'Купальник — сууга түшкүңүз келсе',
        ]},
        { type: 'paragraph', content: 'Nomad яхтасында мини-бар, жеңил тамак-аш жана VIP столу бар. Капитан көлдүн тарыхы жөнүндө айтып берет.' },
        { type: 'quote', content: 'Ысык-Көлдөгү закат — жөн гана табият кубулушу эмес, бул көл ар кечте койгон спектакль.' },
      ],
    },
  },
  {
    id: 3, slug: 'safety-on-water',
    title: { ru: 'Безопасность на воде: что нужно знать', en: 'Water Safety: What You Need to Know', ky: 'Суудагы коопсуздук' },
    excerpt: { ru: 'Правила безопасности на борту.', en: 'Safety rules on board.', ky: 'Бортто коопсуздук эрежелери.' },
    image: '/images/scene4.jpg', date: '2026-03-05', author: 'Капитан Азамат',
    category: { ru: 'Безопасность', en: 'Safety', ky: 'Коопсуздук' },
    readTime: { ru: '6 мин', en: '6 min', ky: '6 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'Безопасность — наш главный приоритет. Яхта Nomad полностью сертифицирована и проходит ежегодную техническую проверку. Но безопасность на воде — это не только про оборудование, это про культуру и знания. Вот что важно знать каждому пассажиру.' },
        { type: 'heading', content: 'Спасательное оборудование на борту' },
        { type: 'paragraph', content: 'На яхте Nomad имеется полный комплект спасательного оборудования: 20 сертифицированных спасательных жилетов (включая 6 детских размеров), 2 спасательных круга с автоматическими огнями, спасательный плот на 12 человек, аптечка первой помощи расширенного состава, и система экстренной связи с береговой охраной.' },
        { type: 'heading', content: 'Правила на борту' },
        { type: 'list', content: 'Основные правила безопасности:', items: [
          'Перед отплытием пройти краткий инструктаж капитана (3 минуты)',
          'Дети до 12 лет находятся в спасательных жилетах всё время на палубе',
          'Не перегибаться через леера (ограждения) борта',
          'При ухудшении погоды немедленно следовать указаниям экипажа',
          'Не прыгать в воду без разрешения капитана',
          'Сообщать экипажу о любом недомогании или морской болезни',
        ]},
        { type: 'heading', content: 'Погодные условия' },
        { type: 'paragraph', content: 'Мы внимательно следим за прогнозом погоды и не выходим в рейс при волнении выше 3 баллов или скорости ветра более 15 м/с. Иссык-Куль известен внезапным ветром «улан», который может усилиться за 20-30 минут. Наш капитан имеет 15-летний опыт работы на озере и знает все погодные паттерны. При ухудшении условий рейс может быть сокращён или перенесён — в этом случае мы предлагаем полный возврат или перенос даты.' },
        { type: 'heading', content: 'Сертификация и экипаж' },
        { type: 'paragraph', content: 'Капитан Азамат имеет лицензию капитана маломерных судов категории D, сертификат оказания первой помощи на воде и 15 лет стажа на Иссык-Куле. Помощник капитана — сертифицированный спасатель на воде. Яхта зарегистрирована в ГИМС КР и проходит техосмотр каждую весну перед началом сезона.' },
        { type: 'quote', content: 'За 15 лет работы на озере у нас не было ни одного инцидента. И мы делаем всё, чтобы эта статистика оставалась нулевой. Безопасность — это не ограничения, а свобода наслаждаться отдыхом.' },
      ],
      en: [
        { type: 'paragraph', content: 'Safety is our top priority. The Nomad yacht is fully certified and undergoes annual technical inspection. But water safety is not just about equipment — it is about culture and knowledge. Here is what every passenger should know.' },
        { type: 'heading', content: 'Rescue Equipment on Board' },
        { type: 'paragraph', content: 'The Nomad yacht carries a full set of rescue equipment: 20 certified life jackets (including 6 children sizes), 2 life rings with automatic lights, a life raft for 12 people, an extended first aid kit, and an emergency communication system with the coast guard.' },
        { type: 'heading', content: 'Rules on Board' },
        { type: 'list', content: 'Basic safety rules:', items: [
          'Complete the captain briefing before departure (3 minutes)',
          'Children under 12 must wear life jackets at all times on deck',
          'Do not lean over the railings',
          'Follow crew instructions immediately if weather worsens',
          'Do not jump into the water without captain permission',
          'Inform the crew of any discomfort or seasickness',
        ]},
        { type: 'heading', content: 'Weather Conditions' },
        { type: 'paragraph', content: 'We carefully monitor weather forecasts and do not depart in waves above level 3 or wind speeds over 15 m/s. Issyk-Kul is known for the sudden "ulan" wind that can intensify in 20-30 minutes. Our captain has 15 years of experience on the lake and knows all weather patterns.' },
        { type: 'heading', content: 'Certification and Crew' },
        { type: 'paragraph', content: 'Captain Azamat holds a Category D small vessel license, a water first aid certificate, and has 15 years of experience on Issyk-Kul. The first mate is a certified water rescue specialist. The yacht is registered with GIMS KR and passes inspection every spring.' },
        { type: 'quote', content: 'In 15 years on the lake, we have had zero incidents. And we do everything to keep that statistic at zero. Safety is not a restriction — it is the freedom to enjoy your vacation.' },
      ],
      ky: [
        { type: 'paragraph', content: 'Коопсуздук — биздин негизги приоритет. Nomad яхтасы толугу менен сертификацияланган жана жыл сайын техникалык текшерүүдөн өтөт.' },
        { type: 'heading', content: 'Борттогу куткаруу жабдуулары' },
        { type: 'paragraph', content: '20 куткаруу жилети (6 балдар өлчөмү), 2 куткаруу чөйрөсү, 12 адамга куткаруу плоту, биринчи жардам аптечкасы бар.' },
        { type: 'heading', content: 'Борттогу эрежелер' },
        { type: 'list', content: 'Негизги коопсуздук эрежелери:', items: [
          '12 жашка чейинки балдар дайыма куткаруу жилетинде болушу керек',
          'Тосмолордон ашып кетпеңиз',
          'Аба ырайы начарлаганда экипаждын көрсөтмөлөрүн аткарыңыз',
          'Капитандын уруксатысыз сууга секирбеңиз',
        ]},
        { type: 'paragraph', content: 'Капитан Азаматтын D категориядагы лицензиясы жана Ысык-Көлдө 15 жылдык тажрыйбасы бар.' },
        { type: 'quote', content: '15 жылдык иште бир да инцидент болгон эмес. Коопсуздук — бул чектөө эмес, эс алуудан ырахат алуу эркиндиги.' },
      ],
    },
  },
  {
    id: 4, slug: 'kids-party-yacht',
    title: { ru: 'Детский праздник на яхте: полный гид', en: 'Kids Party on a Yacht: Complete Guide', ky: 'Яхтадагы балдар майрамы' },
    excerpt: { ru: 'Как организовать незабываемый детский день рождения на яхте.', en: 'How to organize an unforgettable kids birthday on a yacht.', ky: 'Яхтада балдардын туулган күнүн кантип уюштуруу керек.' },
    image: '/images/kids.jpg', date: '2026-02-28', author: 'Капитан Азамат',
    category: { ru: 'Семьям', en: 'Families', ky: 'Үй-бүлөлөргө' },
    readTime: { ru: '7 мин', en: '7 min', ky: '7 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'Детский день рождения на яхте — это необычно, весело и запоминается на всю жизнь. Мы проводим такие праздники каждый сезон и знаем, как сделать так, чтобы и дети, и родители остались в восторге. Вот наш полный гид по организации.' },
        { type: 'heading', content: 'Возраст и количество гостей' },
        { type: 'paragraph', content: 'Оптимальный возраст — от 6 до 14 лет. Яхта Nomad вмещает до 15 детей и 5 взрослых одновременно. Для младших детей (6-8 лет) рекомендуем не более 10 детей, чтобы каждому уделить внимание. Присутствие хотя бы двух взрослых помимо экипажа обязательно.' },
        { type: 'heading', content: 'Программа праздника' },
        { type: 'list', content: 'Стандартная 3-часовая программа включает:', items: [
          'Встреча и посадка — декорированная яхта, приветственные напитки (15 мин)',
          'Морские игры и конкурсы с аниматором-пиратом (45 мин)',
          'Купание и водные развлечения в защищённой бухте (30 мин)',
          'Праздничный стол и торт (45 мин)',
          'Свободное время, фотосессия с капитаном (30 мин)',
          'Торжественный вынос торта на палубе с видом на горы (15 мин)',
        ]},
        { type: 'heading', content: 'Меню для детского праздника' },
        { type: 'paragraph', content: 'Наш повар готовит специальное детское меню: мини-бургеры, куриные наггетсы, фруктовая нарезка, соки и лимонады. Торт можно заказать у нашего партнёра-кондитера или привезти свой. Мы учитываем аллергии и пищевые ограничения — просто сообщите при бронировании.' },
        { type: 'heading', content: 'Безопасность детей' },
        { type: 'paragraph', content: 'Все дети получают спасательные жилеты подходящего размера. Во время купания в воде находится сертифицированный спасатель. Палуба оборудована нескользящим покрытием. Аниматоры проходят инструктаж по безопасности на воде. Родители получают номер экстренной связи с капитаном.' },
        { type: 'heading', content: 'Стоимость и бронирование' },
        { type: 'paragraph', content: 'Базовый пакет от 15,000 сом включает аренду яхты на 3 часа, аниматора, декор, детское меню на 10 персон. VIP-пакет от 25,000 сом добавляет фотографа, расширенное меню и подарки для каждого гостя. Бронируйте за 2 недели до даты — летом места быстро заканчиваются.' },
        { type: 'quote', content: 'Самый лучший подарок для ребёнка — это не вещь, а впечатление. А день рождения на яхте — это впечатление, которое не забывается.' },
      ],
      en: [
        { type: 'paragraph', content: 'A kids birthday on a yacht is unusual, fun, and memorable for life. We host such parties every season and know how to make both children and parents delighted. Here is our complete guide.' },
        { type: 'heading', content: 'Age and Guest Count' },
        { type: 'paragraph', content: 'Optimal age is 6 to 14 years. The Nomad yacht accommodates up to 15 children and 5 adults. For younger kids (6-8), we recommend no more than 10 children. At least two adults besides the crew are required.' },
        { type: 'heading', content: 'Party Program' },
        { type: 'list', content: 'Standard 3-hour program includes:', items: [
          'Welcome and boarding — decorated yacht, welcome drinks (15 min)',
          'Sea games and contests with a pirate animator (45 min)',
          'Swimming and water activities in a sheltered bay (30 min)',
          'Party table and cake (45 min)',
          'Free time, photo session with the captain (30 min)',
          'Ceremonial cake presentation on deck with mountain views (15 min)',
        ]},
        { type: 'heading', content: 'Kids Menu' },
        { type: 'paragraph', content: 'Our chef prepares a special kids menu: mini-burgers, chicken nuggets, fruit platters, juices, and lemonades. Cake can be ordered from our partner pastry chef or brought your own. We accommodate allergies — just let us know when booking.' },
        { type: 'heading', content: 'Children Safety' },
        { type: 'paragraph', content: 'All children receive properly sized life jackets. A certified lifeguard is in the water during swimming. The deck has non-slip coating. Animators are briefed on water safety.' },
        { type: 'heading', content: 'Pricing and Booking' },
        { type: 'paragraph', content: 'Basic package from 15,000 KGS includes 3-hour yacht rental, animator, decor, kids menu for 10. VIP package from 25,000 KGS adds a photographer, extended menu, and gifts. Book 2 weeks in advance — summer slots fill quickly.' },
        { type: 'quote', content: 'The best gift for a child is not a thing, but an experience. And a birthday on a yacht is an experience that is never forgotten.' },
      ],
      ky: [
        { type: 'paragraph', content: 'Яхтада балдардын туулган күнү — адаттагыдай эмес, кызыктуу жана бүт өмүргө эсте калат.' },
        { type: 'heading', content: 'Жаш жана конок саны' },
        { type: 'paragraph', content: 'Оптималдуу жаш — 6дан 14кө чейин. Nomad яхтасы 15 балага жана 5 чоңго чейин сыйдырат.' },
        { type: 'heading', content: 'Майрам программасы' },
        { type: 'list', content: '3 сааттык стандарт программа:', items: [
          'Тосуп алуу — жасалгаланган яхта, суусундуктар (15 мүн)',
          'Деңиз оюндары аниматор менен (45 мүн)',
          'Сууда сүзүү (30 мүн)',
          'Майрам столу жана торт (45 мүн)',
        ]},
        { type: 'paragraph', content: 'Базалык пакет 15,000 сомдон, VIP пакет 25,000 сомдон. 2 жума мурун брондоңуз.' },
        { type: 'quote', content: 'Балага эң мыкты белек — нерсе эмес, таасир. Яхтадагы туулган күн — унутулбас таасир.' },
      ],
    },
  },
  {
    id: 5, slug: 'vip-charter-experience',
    title: { ru: 'VIP-чартер: как провести идеальный вечер', en: 'VIP Charter: How to Have the Perfect Evening', ky: 'VIP-чартер: идеалдуу кечти кантип өткөрүү' },
    excerpt: { ru: 'Приватный чартер для особенных случаев.', en: 'Private charter for special occasions.', ky: 'Атайын учурлар үчүн жеке чартер.' },
    image: '/images/ep03.jpg', date: '2026-02-20', author: 'Капитан Азамат',
    category: { ru: 'VIP', en: 'VIP', ky: 'VIP' },
    readTime: { ru: '5 мин', en: '5 min', ky: '5 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'VIP-чартер на яхте Nomad — это эксклюзивный формат, когда вся яхта принадлежит только вам. Это идеальный выбор для юбилеев, предложений руки и сердца, корпоративных мероприятий или просто для тех, кто ценит приватность и премиальный сервис.' },
        { type: 'heading', content: 'Что включает VIP-чартер' },
        { type: 'list', content: 'В стоимость VIP-чартера входит:', items: [
          'Полная аренда яхты на 3-6 часов (без посторонних гостей)',
          'Персональный капитан и стюард на весь рейс',
          'Приветственная бутылка шампанского (Moët & Chandon)',
          'Фруктовая и сырная тарелка, канапе',
          'Bluetooth-колонка с вашим плейлистом',
          'Декорирование яхты по вашему пожеланию (шары, лепестки, свечи)',
          'Маршрут на ваш выбор или по рекомендации капитана',
        ]},
        { type: 'heading', content: 'Романтический ужин на воде' },
        { type: 'paragraph', content: 'Для особенных вечеров мы готовим романтический ужин на палубе: накрытый стол с белой скатертью, свечи, живые цветы. Меню составляет наш шеф-повар: салат с козьим сыром и грецким орехом, стейк из форели озёрного вылова, десерт с местными ягодами. Всё подаётся на фарфоре с серебряными приборами.' },
        { type: 'heading', content: 'Предложение руки и сердца' },
        { type: 'paragraph', content: 'За последние два сезона мы помогли организовать 12 предложений — и все получили «да». Наш сценарий: яхта выходит на закат, в момент когда солнце касается горизонта стюард выносит шампанское с кольцом. Фотограф скрытно фиксирует момент с верхней палубы. Мы также можем организовать надпись из световых букв на берегу.' },
        { type: 'heading', content: 'Корпоративные мероприятия' },
        { type: 'paragraph', content: 'Яхта вмещает до 20 человек для корпоративов. Мы предлагаем тимбилдинг-программы на воде: морские квесты, соревнования по рыбалке, дегустации. Проектор и экран для презентаций доступны по запросу. Wi-Fi покрытие обеспечивается спутниковым интернетом.' },
        { type: 'quote', content: 'VIP-чартер — это не роскошь, это инвестиция в моменты, которые определяют вашу жизнь. Мы создаём пространство, а вы наполняете его смыслом.' },
      ],
      en: [
        { type: 'paragraph', content: 'A VIP charter on the Nomad yacht is an exclusive format where the entire yacht belongs only to you. It is the perfect choice for anniversaries, proposals, corporate events, or simply for those who value privacy and premium service.' },
        { type: 'heading', content: 'What VIP Charter Includes' },
        { type: 'list', content: 'VIP charter price includes:', items: [
          'Full yacht rental for 3-6 hours (no other guests)',
          'Personal captain and steward for the entire trip',
          'Welcome bottle of champagne (Moet & Chandon)',
          'Fruit and cheese platter, canapes',
          'Bluetooth speaker with your playlist',
          'Yacht decoration to your wish (balloons, petals, candles)',
          'Route of your choice or captain recommendation',
        ]},
        { type: 'heading', content: 'Romantic Dinner on the Water' },
        { type: 'paragraph', content: 'For special evenings, we prepare a romantic dinner on deck: a set table with white tablecloth, candles, fresh flowers. Our chef prepares goat cheese salad, lake trout steak, and local berry dessert. Everything is served on porcelain with silver cutlery.' },
        { type: 'heading', content: 'Marriage Proposals' },
        { type: 'paragraph', content: 'Over the last two seasons, we helped organize 12 proposals — all received a "yes". Our scenario: the yacht sails into the sunset, and as the sun touches the horizon, the steward brings champagne with the ring. A photographer captures the moment from the upper deck.' },
        { type: 'heading', content: 'Corporate Events' },
        { type: 'paragraph', content: 'The yacht holds up to 20 people for corporate events. We offer water team-building programs, fishing competitions, and tastings. Projector and screen for presentations available on request.' },
        { type: 'quote', content: 'A VIP charter is not luxury — it is an investment in moments that define your life. We create the space, and you fill it with meaning.' },
      ],
      ky: [
        { type: 'paragraph', content: 'Nomad яхтасындагы VIP-чартер — бул жеке формат, яхта толугу менен сизге гана таандык.' },
        { type: 'heading', content: 'VIP-чартер эмнени камтыйт' },
        { type: 'list', content: 'VIP-чартер баасына кирет:', items: [
          '3-6 сааттык толук яхта ижарасы',
          'Жеке капитан жана стюард',
          'Шампанское (Moët & Chandon)',
          'Жемиш, сыр табагы, канапелер',
          'Сиздин каалооңуз боюнча жасалга',
        ]},
        { type: 'paragraph', content: 'Акыркы эки сезондо 12 колу сунуш уюштурдук — баары «ооба» деп жооп берди.' },
        { type: 'quote', content: 'VIP-чартер — бул ызааттуулук эмес, өмүрүңүздү аныктаган учурларга инвестиция.' },
      ],
    },
  },
  {
    id: 6, slug: 'issyk-kul-history',
    title: { ru: 'История Иссык-Куля: от древности до наших дней', en: 'History of Issyk-Kul: From Ancient Times to Today', ky: 'Ысык-Көлдүн тарыхы' },
    excerpt: { ru: 'Легенды затонувших городов и история озера.', en: 'Legends of sunken cities and the lake history.', ky: 'Чөгүп кеткен шаарлардын легендалары.' },
    image: '/images/alykul1.jpg', date: '2026-02-15', author: 'Капитан Азамат',
    category: { ru: 'История', en: 'History', ky: 'Тарых' },
    readTime: { ru: '8 мин', en: '8 min', ky: '8 мүн' },
    content: {
      ru: [
        { type: 'paragraph', content: 'Иссык-Куль — это не просто озеро. Это живая история Центральной Азии, хранящая тайны тысячелетий на своём дне. Каждый раз, когда наша яхта выходит на воду, мы плывём над руинами древних городов и караванных путей. Давайте совершим путешествие во времени.' },
        { type: 'heading', content: 'Древние времена: озеро саков и усуней' },
        { type: 'paragraph', content: 'Первые поселения на берегах Иссык-Куля датируются II тысячелетием до нашей эры. Сакские племена, известные как «тигры степи», оставили наскальные рисунки и курганные захоронения вдоль берегов. В I веке до н.э. здесь обосновались усуни — кочевой народ, описанный в китайских хрониках. Их столица Чигучен, по одной из версий, находилась на берегу озера и была затоплена при подъёме уровня воды.' },
        { type: 'heading', content: 'Великий Шёлковый путь' },
        { type: 'paragraph', content: 'В VII-XII веках Иссык-Куль стал важным звеном Великого Шёлкового пути. На берегах озера стояли караван-сараи, где торговцы из Китая, Персии и Византии обменивали шёлк, специи и драгоценные камни. Археологи обнаружили на дне озера руины средневекового города — фундаменты зданий, керамику и монеты. Этот «кыргызский Атлантис» до сих пор исследуется учёными.' },
        { type: 'heading', content: 'Легенда о затонувшем городе' },
        { type: 'paragraph', content: 'Самая известная легенда гласит, что на дне Иссык-Куля покоится город Чигу — столица усуньского царства. По преданию, жестокий хан построил дворец на острове посреди озера, но вода поднялась и поглотила его вместе со всеми сокровищами. Подводные экспедиции действительно обнаружили руины на глубине 5-7 метров у северного берега, подтверждая, что легенда имеет историческую основу.' },
        { type: 'heading', content: 'Советская эпоха: закрытый курорт' },
        { type: 'paragraph', content: 'В советское время Иссык-Куль стал элитным курортом. Здесь располагались военные санатории, испытательная база торпед ВМФ СССР (именно поэтому озеро было закрыто для иностранцев до 1991 года), и пансионаты для партийной элиты. Чолпон-Ата стала главным курортным городом, а вдоль берегов выросли десятки баз отдыха.' },
        { type: 'heading', content: 'Новая эра: водный туризм XXI века' },
        { type: 'paragraph', content: 'После обретения Кыргызстаном независимости в 1991 году озеро открылось для мира. Сегодня Иссык-Куль — главная туристическая жемчужина страны. Яхтенный туризм начал развиваться в 2010-х годах, и наша компания Alykul стала одним из пионеров. Мы верим, что будущее озера — это устойчивый экотуризм, который сохраняет природу для следующих поколений.' },
        { type: 'quote', content: 'Когда вы плывёте по Иссык-Кулю, помните: под вами — тысячи лет истории. Каждая волна несёт отголоски караванов, империй и легенд. Мы не просто катаем по озеру — мы показываем живую историю.' },
      ],
      en: [
        { type: 'paragraph', content: 'Issyk-Kul is not just a lake. It is a living history of Central Asia, keeping millennia of secrets on its bed. Every time our yacht goes out, we sail above the ruins of ancient cities and caravan routes. Let us take a journey through time.' },
        { type: 'heading', content: 'Ancient Times: Lake of the Saka and Wusun' },
        { type: 'paragraph', content: 'The first settlements on Issyk-Kul shores date to the 2nd millennium BC. Saka tribes, known as "tigers of the steppe", left petroglyphs and burial mounds along the shores. In the 1st century BC, the Wusun people settled here — a nomadic nation described in Chinese chronicles. Their capital Chigu may have stood on the lakeshore before being flooded.' },
        { type: 'heading', content: 'The Great Silk Road' },
        { type: 'paragraph', content: 'In the 7th-12th centuries, Issyk-Kul became a vital link on the Great Silk Road. Caravanserais lined the shores where merchants from China, Persia, and Byzantium traded silk, spices, and gems. Archaeologists discovered ruins of a medieval city on the lake bed — building foundations, ceramics, and coins. This "Kyrgyz Atlantis" is still being studied.' },
        { type: 'heading', content: 'Legend of the Sunken City' },
        { type: 'paragraph', content: 'The most famous legend says the city of Chigu, capital of the Wusun kingdom, rests on Issyk-Kul bottom. A cruel khan built a palace on an island, but the water rose and swallowed it with all its treasures. Underwater expeditions found ruins at 5-7 meters depth near the northern shore.' },
        { type: 'heading', content: 'Soviet Era: Closed Resort' },
        { type: 'paragraph', content: 'During Soviet times, Issyk-Kul became an elite resort with military sanatoriums and a USSR Navy torpedo testing base — which is why the lake was closed to foreigners until 1991. Cholpon-Ata became the main resort town.' },
        { type: 'heading', content: 'New Era: 21st Century Water Tourism' },
        { type: 'paragraph', content: 'After Kyrgyzstan gained independence in 1991, the lake opened to the world. Today Issyk-Kul is the country main tourist gem. Yacht tourism began developing in the 2010s, and Alykul became one of the pioneers. We believe the lake future is sustainable ecotourism.' },
        { type: 'quote', content: 'When you sail on Issyk-Kul, remember: beneath you lie thousands of years of history. Every wave carries echoes of caravans, empires, and legends.' },
      ],
      ky: [
        { type: 'paragraph', content: 'Ысык-Көл — жөн гана көл эмес. Бул Борбордук Азиянын жандуу тарыхы, түбүндө миңдеген жылдык сырларды сактайт.' },
        { type: 'heading', content: 'Байыркы доор: сактар жана усундар' },
        { type: 'paragraph', content: 'Ысык-Көл жээктериндеги биринчи конуштар биздин заманга чейинки 2-миң жылдыкка таандык. Сак урууларынын петроглифтери жана коргон көрүстөндөрү жээк бойлунда табылган.' },
        { type: 'heading', content: 'Улуу Жибек жолу' },
        { type: 'paragraph', content: 'VII-XII кылымдарда Ысык-Көл Улуу Жибек жолунун маанилүү бөлүгү болгон. Археологдор көлдүн түбүнөн орто кылымдардагы шаардын урандыларын табышкан.' },
        { type: 'heading', content: 'Чөгүп кеткен шаардын легендасы' },
        { type: 'paragraph', content: 'Эң белгилүү легенда боюнча Ысык-Көлдүн түбүндө Чигу шаары жатат. Суу алдындагы экспедициялар чындап эле түндүк жээкте 5-7 метр тереңдикте урандыларды тапкан.' },
        { type: 'heading', content: 'Жаңы доор: XXI кылымдын суу туризми' },
        { type: 'paragraph', content: 'Кыргызстан көз карандысыздык алгандан кийин көл дүйнөгө ачылды. Алыкул яхта туризминин пионерлеринин бири болду.' },
        { type: 'quote', content: 'Ысык-Көл менен сүзгөндө, астыңызда миңдеген жылдык тарых жатканын эстеңиз.' },
      ],
    },
  },
];

function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

function getRelatedArticles(currentSlug: string): Article[] {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, 3);
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'ky' ? 'ky-KG' : lang === 'en' ? 'en-US' : 'ru-RU',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleShare(title: string, _lang: string) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({ title, url: window.location.href }).catch(() => {});
  } else if (typeof navigator !== 'undefined') {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  }
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'heading':
      return <h2 key={idx} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">{block.content}</h2>;
    case 'paragraph':
      return <p key={idx} className="text-gray-700 leading-[1.8] mb-4">{block.content}</p>;
    case 'list':
      return (
        <div key={idx} className="mb-4">
          <p className="text-gray-700 font-medium mb-2">{block.content}</p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-700 leading-relaxed pl-2">
            {block.items?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );
    case 'quote':
      return (
        <blockquote key={idx} className="border-l-4 border-[#1B7CED] bg-blue-50/50 px-5 py-4 my-6 rounded-r-lg">
          <p className="text-gray-700 italic leading-relaxed">{block.content}</p>
        </blockquote>
      );
    case 'image':
      return (
        <figure key={idx} className="my-6">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image src={block.content} alt="" fill className="object-cover" />
          </div>
          {block.caption && <figcaption className="text-sm text-gray-400 mt-2 text-center">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

export default function BlogArticlePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const slug = params?.slug as string;
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {ui.notFound[lang as keyof typeof ui.notFound] || ui.notFound.ru}
          </h1>
          <Link href={`/${lang}/blog`} className="text-[#1B7CED] hover:underline text-sm">
            {ui.backToBlog[lang as keyof typeof ui.backToBlog] || ui.backToBlog.ru}
          </Link>
        </div>
      </div>
    );
  }

  const title = article.title[lang as keyof typeof article.title] || article.title.ru;
  const category = article.category[lang as keyof typeof article.category] || article.category.ru;
  const readTime = article.readTime[lang as keyof typeof article.readTime] || article.readTime.ru;
  const contentBlocks = article.content[lang as keyof typeof article.content] || article.content.ru;
  const related = getRelatedArticles(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={article.image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-4xl mx-auto">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {ui.backToBlog[lang as keyof typeof ui.backToBlog] || ui.backToBlog.ru}
          </Link>
          <span className="inline-block bg-[#1B7CED] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
            {category}
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(article.date, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[
          { label: lang === 'ru' ? 'Блог' : lang === 'ky' ? 'Блог' : 'Blog', href: `/${lang}/blog` },
          { label: title }
        ]} />
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 lg:flex lg:gap-10">
        {/* Article body */}
        <article className="lg:flex-1 max-w-3xl">
          <div className="prose-custom">
            {contentBlocks.map((block, idx) => renderBlock(block, idx))}
          </div>

          {/* Share */}
          <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {ui.author[lang as keyof typeof ui.author] || ui.author.ru}: <span className="font-medium text-gray-700">{article.author}</span>
            </p>
            <ShareButtons title={title} />
          </div>
        </article>

        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
          {/* Booking CTA */}
          <div className="bg-[#0F2B46] text-white rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">
              {ui.bookTrip[lang as keyof typeof ui.bookTrip] || ui.bookTrip.ru}
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {ui.bookCta[lang as keyof typeof ui.bookCta] || ui.bookCta.ru}
            </p>
            <Link
              href={`/${lang}/trips`}
              className="block text-center bg-[#1B7CED] hover:bg-[#1565C0] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              {ui.bookBtn[lang as keyof typeof ui.bookBtn] || ui.bookBtn.ru}
            </Link>
          </div>

          {/* Related articles */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">
              {ui.relatedTitle[lang as keyof typeof ui.relatedTitle] || ui.relatedTitle.ru}
            </h3>
            <div className="space-y-3">
              {related.map((r) => {
                const rTitle = r.title[lang as keyof typeof r.title] || r.title.ru;
                const rReadTime = r.readTime[lang as keyof typeof r.readTime] || r.readTime.ru;
                return (
                  <Link
                    key={r.id}
                    href={`/${lang}/blog/${r.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={r.image} alt={rTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#1B7CED] transition-colors">
                        {rTitle}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{rReadTime}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#0F2B46] text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {ui.bookTrip[lang as keyof typeof ui.bookTrip] || ui.bookTrip.ru}
        </h2>
        <p className="text-white/70 max-w-lg mx-auto mb-6">
          {ui.bookCta[lang as keyof typeof ui.bookCta] || ui.bookCta.ru}
        </p>
        <Link
          href={`/${lang}/trips`}
          className="inline-block bg-[#1B7CED] hover:bg-[#1565C0] text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          {ui.bookBtn[lang as keyof typeof ui.bookBtn] || ui.bookBtn.ru}
        </Link>
      </section>

      {/* Related articles (mobile) */}
      <section className="lg:hidden max-w-3xl mx-auto px-4 py-10">
        <h3 className="font-bold text-gray-900 text-lg mb-4">
          {ui.relatedTitle[lang as keyof typeof ui.relatedTitle] || ui.relatedTitle.ru}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((r) => {
            const rTitle = r.title[lang as keyof typeof r.title] || r.title.ru;
            const rCat = r.category[lang as keyof typeof r.category] || r.category.ru;
            return (
              <Link
                key={r.id}
                href={`/${lang}/blog/${r.slug}`}
                className="flex gap-3 bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow group"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={r.image} alt={rTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-[#1B7CED] uppercase">{rCat}</span>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#1B7CED] transition-colors">
                    {rTitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
