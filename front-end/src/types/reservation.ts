export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: ReservationStatus;
}