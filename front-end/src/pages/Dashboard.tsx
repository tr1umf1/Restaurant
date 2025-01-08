import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReservationList } from '@/components/dashboard/ReservationList';
import { StatCard } from '@/components/stats/StatCard';
import { ReservationChart } from '@/components/stats/ReservationChart';
import { useAuth } from '@/contexts/AuthContext';
import { Reservation } from '@/types/reservation';
import axios from 'axios';
import { toast } from 'sonner';

const stats = [
  { label: 'Total Reservations', value: '156' },
  { label: 'Pending Reservations', value: '23' },
  { label: "Today's Reservations", value: '12' },
  { label: 'Average Party Size', value: '4' },
];

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState([]);

  // Fetch reservations from the backend
  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/appointments'
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Failed to load reservations.');
    }
  };

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/appointmentsmeals'
      );
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
      fetchReviews();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle status change for reservations
  const handleStatusChange = (
    id: string,
    status: 'confirmed' | 'cancelled'
  ) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
    toast.success(`Reservation ${status} successfully`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Quick Stats</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Recent Reservations</h2>
              </CardHeader>
              <CardContent>
                <ReservationChart
                  data={[
                    { date: '2024-03-15', reservations: 12 } /* more data */,
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Manage Reservations</h2>
            </CardHeader>
            <CardContent>
              <ReservationList
                reservations={reservations}
                onStatusChange={handleStatusChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-bold text-center">Meal Reviews</h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No reviews available.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-white rounded-lg shadow-md border"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://images.unsplash.com/photo-1546833998-877b37c2e5c6"
                          alt={review.meal}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {review.meal}
                          </h3>
                          <p className="text-gray-500">
                            Rating: {review.rating} / 5
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.description}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
