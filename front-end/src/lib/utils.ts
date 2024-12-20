import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppointmentStatus } from '@/types/appointment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: AppointmentStatus) {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'destructive';
    default:
      return 'default';
  }
}