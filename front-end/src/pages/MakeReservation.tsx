import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function MakeReservation() {
  const [formData, setFormData] = useState({
    userId: 1, 
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/appointments/create',
        formData
      );

      if (response.data.success) {
        toast.success('Reservation request submitted successfully!');
        setFormData({
          userId: 1, 
          name: '',
          email: '',
          date: '',
          time: '',
          guests: '',
          specialRequests: '',
        });
      } else {
        toast.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('An error occurred while creating the reservation');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 bg-muted/50 overflow-x-auto">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">
              Make a Reservation
            </h2>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Input
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any dietary restrictions or special occasions?"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit Reservation
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
