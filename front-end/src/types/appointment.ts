export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: AppointmentStatus;
}