'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const t = {
  ru: {
    title: 'Как прошла поездка?',
    subtitle: 'Ваш отзыв поможет нам стать лучше',
    back: '← На главную',
    tripInfo: 'Информация о поездке',
    route: 'Маршрут',
    date: 'Дата',
    vessel: 'Судно',
    rating: 'Ваша оценка',
    ratingLabels: ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'],
    reviewLabel: 'Ваш отзыв',
    reviewPlaceholder: 'Расскажите о вашем опыте — что понравилось, что можно улучшить...',
    minChars: 'Минимум 10 символов',
    maxChars: '500',
    photos: 'Фотографии',
    photosHint: 'Перетащите фото сюда или нажмите для загрузки',
    photoCamera: 'Сделать фото',
    photoFormats: 'JPG, PNG до 5 МБ',
    recommend: 'Порекомендуете ли вы Алыкул друзьям?',
    yes: 'Да',
    no: 'Нет',
    tags: 'Что вам понравилось больше всего?',
    tagOptions: ['Обслуживание', 'Виды', 'Комфорт', 'Безопасность', 'Капитан', 'Еда'],
    submit: 'Отправить отзыв',
    submitting: 'Отправка...',
    successTitle: 'Спасибо за отзыв!',
    successText: 'Он поможет другим путешественникам выбрать лучший маршрут на Иссык-Куле.',
    backToHome: 'Вернуться на главную',
    writeAnother: 'Оставить ещё отзыв',
  },
  en: {
    title: 'How was your trip?',
    subtitle: 'Your feedback helps us improve',
    back: '← Home',
    tripInfo: 'Trip information',
    route: 'Route',
    date: 'Date',
    vessel: 'Vessel',
    rating: 'Your rating',
    ratingLabels: ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'],
    reviewLabel: 'Your review',
    reviewPlaceholder: 'Tell us about your experience — what you liked, what could be better...',
    minChars: 'Minimum 10 characters',
    maxChars: '500',
    photos: 'Photos',
    photosHint: 'Drag photos here or click to upload',
    photoCamera: 'Take a photo',
    photoFormats: 'JPG, PNG up to 5 MB',
    recommend: 'Would you recommend Alykul to friends?',
    yes: 'Yes',
    no: 'No',
    tags: 'What did you like most?',
    tagOptions: ['Service', 'Views', 'Comfort', 'Safety', 'Captain', 'Food'],
    submit: 'Submit review',
    submitting: 'Submitting...',
    successTitle: 'Thank you for your review!',
    successText: 'It will help other travelers choose the best route on Issyk-Kul.',
    backToHome: 'Back to home',
    writeAnother: 'Write another review',
  },
  ky: {
    title: 'Саякат кандай өттү?',
    subtitle: 'Сиздин пикириңиз бизге жакшыртууга жардам берет',
    back: '← Башкы бет',
    tripInfo: 'Саякат маалыматы',
    route: 'Маршрут',
    date: 'Күнү',
    vessel: 'Кеме',
    rating: 'Сиздин баа',
    ratingLabels: ['Өтө жаман', 'Жаман', 'Орточо', 'Жакшы', 'Эң сонун'],
    reviewLabel: 'Сиздин пикир',
    reviewPlaceholder: 'Тажрыйбаңыз жөнүндө айтып бериңиз...',
    minChars: 'Минимум 10 символ',
    maxChars: '500',
    photos: 'Сүрөттөр',
    photosHint: 'Сүрөттөрдү бул жерге сүйрөңүз же жүктөө үчүн басыңыз',
    photoCamera: 'Сүрөт тартуу',
    photoFormats: 'JPG, PNG 5 МБ чейин',
    recommend: 'Алыкулду досторуңузга сунуштайсызбы?',
    yes: 'Ооба',
    no: 'Жок',
    tags: 'Эмне көбүрөөк жакты?',
    tagOptions: ['Тейлөө', 'Көрүнүштөр', 'Ыңгайлуулук', 'Коопсуздук', 'Капитан', 'Тамак'],
    submit: 'Пикир жөнөтүү',
    submitting: 'Жөнөтүлүүдө...',
    successTitle: 'Пикириңиз үчүн рахмат!',
    successText: 'Ал башка саякатчыларга Ысык-Көлдө эң жакшы маршрутту тандоого жардам берет.',
    backToHome: 'Башкы бетке кайтуу',
    writeAnother: 'Дагы пикир жазуу',
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

export default function ReviewPage() {
  return <Suspense><ReviewInner /></Suspense>;
}

function ReviewInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  const bookingId = searchParams.get('booking') || '';
  const [booking, setBooking] = useState<{ route: string; date: string; vessel: string } | null>(null);

  useEffect(() => {
    if (bookingId) {
      fetch(`${API_URL}/bookings/${bookingId}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setBooking(data); })
        .catch(() => {});
    }
  }, [bookingId]);

  const trip = booking || { route: '—', date: '—', vessel: '—' };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const canSubmit = rating > 0 && review.length >= 10 && review.length <= 500;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1'}/forms/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingId,
          rating,
          text: review,
          recommend,
          tags: selectedTags,
        }),
      });
      if (res.ok) setSubmitted(true);
      else throw new Error('Failed');
    } catch {
      alert(lang === 'ru' ? 'Ошибка отправки. Попробуйте позже.' : lang === 'ky' ? 'Жөнөтүү катасы. Кийинчерээк аракет кылыңыз.' : 'Submit error. Try later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <main className="min-h-screen bg-sand flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy mb-3">
            {labels.successTitle}
          </h1>
          <p className="text-navy/60 mb-8">{labels.successText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${lang}`}
              className="bg-ocean hover:bg-ocean-dark text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {labels.backToHome}
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setReview('');
                setRecommend(null);
                setSelectedTags([]);
              }}
              className="border border-ocean text-ocean hover:bg-ocean/5 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {labels.writeAnother}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-navy text-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/${lang}`}
            className="inline-block text-foam/70 hover:text-white text-sm mb-6 transition-colors"
          >
            {labels.back}
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl italic mb-2">
            {labels.title}
          </h1>
          <p className="text-foam/60">{labels.subtitle}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Trip info card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-muted text-xs uppercase tracking-wider mb-4">{labels.tripInfo}</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted text-xs mb-1">{labels.route}</p>
              <p className="text-navy font-medium">{trip.route}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-1">{labels.date}</p>
              <p className="text-navy font-medium">{trip.date}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-1">{labels.vessel}</p>
              <p className="text-navy font-medium">{trip.vessel}</p>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-8">
          <label className="block text-navy font-medium mb-3">{labels.rating}</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
                aria-label={`${star} star`}
              >
                <svg
                  className={`w-12 h-12 transition-colors duration-150 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 drop-shadow-sm'
                      : 'text-gray-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
            {(hoverRating || rating) > 0 && (
              <span className="ml-3 text-navy/60 text-sm">
                {labels.ratingLabels[(hoverRating || rating) - 1]}
              </span>
            )}
          </div>
        </div>

        {/* Review text */}
        <div className="mb-8">
          <label className="block text-navy font-medium mb-3">{labels.reviewLabel}</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 500))}
            placeholder={labels.reviewPlaceholder}
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-navy placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean resize-none transition-all"
          />
          <div className="flex justify-between mt-2 text-xs text-muted">
            <span>{review.length < 10 ? labels.minChars : ''}</span>
            <span>{review.length}/{labels.maxChars}</span>
          </div>
        </div>

        {/* Photo upload area (UI only) */}
        <div className="mb-8">
          <label className="block text-navy font-medium mb-3">{labels.photos}</label>
          {/* TODO: Connect to file upload API */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-ocean/40 transition-colors cursor-pointer">
            <svg className="w-10 h-10 text-muted/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="text-navy/50 text-sm mb-2">{labels.photosHint}</p>
            <p className="text-muted text-xs">{labels.photoFormats}</p>
          </div>
          <button
            type="button"
            className="mt-3 flex items-center gap-2 text-ocean text-sm font-medium hover:text-ocean-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            {labels.photoCamera}
          </button>
        </div>

        {/* Would you recommend? */}
        <div className="mb-8">
          <label className="block text-navy font-medium mb-3">{labels.recommend}</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRecommend(true)}
              className={`flex-1 py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                recommend === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 text-navy/50 hover:border-green-300'
              }`}
            >
              👍 {labels.yes}
            </button>
            <button
              type="button"
              onClick={() => setRecommend(false)}
              className={`flex-1 py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                recommend === false
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 text-navy/50 hover:border-red-300'
              }`}
            >
              👎 {labels.no}
            </button>
          </div>
        </div>

        {/* Category tags */}
        <div className="mb-10">
          <label className="block text-navy font-medium mb-3">{labels.tags}</label>
          <div className="flex flex-wrap gap-2">
            {labels.tagOptions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-ocean text-white border-ocean'
                    : 'bg-white text-navy/60 border-gray-200 hover:border-ocean/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
            canSubmit && !submitting
              ? 'bg-ocean hover:bg-ocean-dark text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ocean/20'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {submitting ? labels.submitting : labels.submit}
        </button>
      </div>
    </main>
  );
}
