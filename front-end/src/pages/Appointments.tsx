import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { AppointmentTable } from '@/components/appointments/AppointmentTable';
import { Appointment } from '@/types/appointment';
import { toast } from 'sonner';

export default function Appointments() {
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      name: 'John Doe',
      date: '2024-03-20',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: '2024-03-21',
      time: '20:00',
      guests: 2,
      status: 'pending',
    },
  ]);

  const handleEdit = (id: number) => {
    toast.info(`Editing appointment ${id}`);
  };

  const handleCancel = (id: number) => {
    toast.success(`Appointment ${id} cancelled`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Appointment Management</h2>
        </CardHeader>
        <CardContent>
          <AppointmentTable 
            appointments={appointments}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
}