import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/types/reservation';

interface ReservationListProps {
  reservations: Reservation[];
  onStatusChange: (id: string, status: 'confirmed' | 'cancelled') => void;
}

export function ReservationList({ reservations, onStatusChange }: ReservationListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Special Requests</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.name}</TableCell>
            <TableCell>{reservation.date}</TableCell>
            <TableCell>{reservation.time}</TableCell>
            <TableCell>{reservation.guests}</TableCell>
            <TableCell>
              <Badge
                variant={
                  reservation.status === 'confirmed' ? 'default' : 'destructive'
                }
              >
                {reservation.status}
              </Badge>
            </TableCell>
            <TableCell>{reservation.specialRequests || '-'}</TableCell>
            <TableCell>
              {reservation.status === 'pending' && (
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onStatusChange(reservation.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onStatusChange(reservation.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}