import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReservationList } from '@/components/dashboard/ReservationList';
import { StatCard } from '@/components/stats/StatCard';
import { ReservationChart } from '@/components/stats/ReservationChart';
import { MenuAnalytics } from '@/components/menu/MenuAnalytics';
import { useAuth } from '@/contexts/AuthContext';
import { Reservation } from '@/types/reservation';
import { toast } from 'sonner';

// Mock data for demonstration
const mockReservations: Reservation[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    date: '2024-03-20',
    time: '19:00',
    guests: 4,
    status: 'pending',
    specialRequests: 'Window seat preferred'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-03-21',
    time: '20:00',
    guests: 2,
    status: 'confirmed',
    specialRequests: 'Anniversary celebration'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    date: '2024-03-21',
    time: '18:30',
    guests: 6,
    status: 'pending',
    specialRequests: 'Gluten-free options needed'
  }
];

const stats = [
  { label: 'Total Reservations', value: '156' },
  { label: 'Pending Reservations', value: '23' },
  { label: 'Today\'s Reservations', value: '12' },
  { label: 'Average Party Size', value: '4' }
];

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState(mockReservations);

  // Protect the dashboard route
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleStatusChange = (id: string, status: 'confirmed' | 'cancelled') => {
    setReservations(prev =>
      prev.map(reservation =>
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
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                <ReservationChart data={[
                  { date: '2024-03-15', reservations: 12 },
                  { date: '2024-03-16', reservations: 19 },
                  { date: '2024-03-17', reservations: 15 },
                  { date: '2024-03-18', reservations: 22 },
                  { date: '2024-03-19', reservations: 25 },
                  { date: '2024-03-20', reservations: 18 },
                  { date: '2024-03-21', reservations: 30 }
                ]} />
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

        <TabsContent value="analytics">
          <MenuAnalytics analytics={{
            topDishes: [
              {
                id: 1,
                name: "Wagyu Beef Steak",
                category: "Main Course",
                price: 89.99,
                orderCount: 156,
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6"
              },
              {
                id: 2,
                name: "Truffle Risotto",
                category: "Main Course",
                price: 45.99,
                orderCount: 142,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1534422298391-e4f8c172789a"
              },
              {
                id: 3,
                name: "Lobster Thermidor",
                category: "Seafood",
                price: 75.99,
                orderCount: 128,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1533682440656-a8b0c53f2b5d"
              }
            ],
            categoryBreakdown: [
              { category: "Main Course", count: 450 },
              { category: "Appetizers", count: 320 },
              { category: "Desserts", count: 280 },
              { category: "Seafood", count: 220 },
              { category: "Beverages", count: 180 }
            ],
            averageRating: 4.6,
            totalOrders: 1450
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}