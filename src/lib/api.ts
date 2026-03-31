const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alykul.baimuras.pro/api/v1';

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || 'API error');
  }
  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// === Types ===
export interface Vessel {
  id: number;
  name: string;
  slug: string;
  vessel_type: string;
  capacity: number;
  description_ru: string | null;
  description_en: string | null;
  description_ky: string | null;
  specs: Record<string, unknown> | null;
  images: string[] | null;
}

export interface Route {
  id: number;
  name_ru: string;
  name_en: string | null;
  name_ky: string | null;
  slug: string;
  departure_pier: string;
  arrival_pier: string | null;
  duration_minutes: number;
  category: string;
  image: string | null;
}

export interface Trip {
  id: number;
  vessel_id: number;
  route_id: number;
  departure_at: string;
  available_seats: number;
  base_price: number;
  currency: string;
  status: string;
  vessel_name: string | null;
  route_name: string | null;
}

export interface TripDetail {
  id: number;
  vessel: Vessel;
  route: Route;
  departure_at: string;
  arrival_at: string | null;
  capacity: number;
  available_seats: number;
  base_price: number;
  currency: string;
  status: string;
}

export interface Booking {
  id: number;
  trip_id: number;
  num_passengers: number;
  total_amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  qr_token: string;
  ticket_pdf_url: string | null;
  created_at: string;
}

export interface User {
  id: number;
  phone: string;
  name: string | null;
  email: string | null;
  role: string;
  language: string;
  loyalty_points: number;
}

// === API Functions ===
export const api = {
  // Vessels
  getVessels: () => fetcher<Vessel[]>('/vessels/'),
  getVessel: (slug: string) => fetcher<Vessel>(`/vessels/${slug}`),

  // Trips
  searchTrips: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return fetcher<Trip[]>(`/trips/?${qs}`);
  },
  getTrip: (id: number) => fetcher<TripDetail>(`/trips/${id}`),

  // Auth
  requestOtp: (phone: string) =>
    fetcher<{ message: string; dev_code: string }>('/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),
  verifyOtp: (phone: string, code: string) =>
    fetcher<{ access_token: string; token_type: string }>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),
  getMe: (token: string) =>
    fetcher<User>('/auth/me', { headers: authHeaders(token) }),

  // Bookings
  createBooking: (token: string, data: { trip_id: number; num_passengers: number; payment_method: string; promo_code?: string }) =>
    fetcher<Booking>('/bookings/', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),
  getBookings: (token: string) =>
    fetcher<Booking[]>('/bookings/', { headers: authHeaders(token) }),
  cancelBooking: (token: string, id: number) =>
    fetcher<Booking>(`/bookings/${id}/cancel`, {
      method: 'POST',
      headers: authHeaders(token),
    }),
};
