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
import { Appointment } from '@/types/appointment';
import { getStatusColor } from '@/lib/utils';

interface AppointmentTableProps {
  appointments: Appointment[];
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
}

export function AppointmentTable({ appointments, onEdit, onCancel }: AppointmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.name}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.guests}</TableCell>
            <TableCell>
              <Badge variant={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(appointment.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onCancel(appointment.id)}
                >
                  Cancel
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}