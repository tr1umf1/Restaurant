import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MenuAnalytics as MenuAnalyticsType } from '@/types/menu';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MenuAnalyticsProps {
  analytics: MenuAnalyticsType;
}

export function MenuAnalytics({ analytics }: MenuAnalyticsProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Ordered Dishes</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topDishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{dish.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dish.orderCount} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${dish.price}</p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {dish.rating}/5
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Category Breakdown</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}