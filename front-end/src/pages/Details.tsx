import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/stats/StatCard';
import { ReservationChart } from '@/components/stats/ReservationChart';
import { MenuPopularityChart } from '@/components/menu/MenuPopularityChart';
import { ReservationData, StatItem } from '@/types/stats';
import { PopularDishCard } from '@/components/menu/PopularDishCard';

const chartData: ReservationData[] = [
  { date: '2024-03-15', reservations: 12 },
  { date: '2024-03-16', reservations: 19 },
  { date: '2024-03-17', reservations: 15 },
  { date: '2024-03-18', reservations: 22 },
  { date: '2024-03-19', reservations: 25 },
  { date: '2024-03-20', reservations: 18 },
  { date: '2024-03-21', reservations: 30 },
];

const stats: StatItem[] = [
  { label: 'Total Reservations', value: '1,245' },
  { label: 'Average Daily Reservations', value: '45' },
  { label: 'Most Popular Time', value: '19:00' },
  { label: 'Average Party Size', value: '4' },
  { label: 'Monthly Revenue', value: '$85,500' },
  { label: 'Customer Satisfaction', value: '4.8/5' },
];

const popularDishes = [
  {
    id: 1,
    name: "Wagyu Beef Steak",
    price: 89.99,
    orderCount: 156,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6",
    description: "Premium grade Wagyu beef, perfectly marbled and grilled to perfection"
  },
  {
    id: 2,
    name: "Truffle Risotto",
    price: 45.99,
    orderCount: 142,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172789a",
    description: "Creamy Arborio rice with black truffle shavings and Parmesan"
  },
  {
    id: 3,
    name: "Lobster Thermidor",
    price: 75.99,
    orderCount: 128,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533682440656-a8b0c53f2b5d",
    description: "Fresh lobster in a rich brandy cream sauce"
  }
];

const timeSlots = [
  { time: '17:00-18:00', percentage: 65 },
  { time: '18:00-19:00', percentage: 85 },
  { time: '19:00-20:00', percentage: 100 },
  { time: '20:00-21:00', percentage: 90 },
  { time: '21:00-22:00', percentage: 70 }
];

export default function Details() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8">
        {/* Overview Statistics */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Restaurant Overview</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reservation Trends */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Reservation Trends</h2>
          </CardHeader>
          <CardContent>
            <ReservationChart data={chartData} />
          </CardContent>
        </Card>

        {/* Popular Time Slots */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Peak Hours Analysis</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSlots.map((slot) => (
                <div key={slot.time} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{slot.time}</span>
                    <span>{slot.percentage}% capacity</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${slot.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Dishes */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Most Popular Dishes</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularDishes.map((dish) => (
                <PopularDishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Category Performance */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Menu Category Performance</h2>
          </CardHeader>
          <CardContent>
            <MenuPopularityChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}