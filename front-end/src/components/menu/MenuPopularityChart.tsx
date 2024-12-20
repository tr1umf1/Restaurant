import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  {
    category: 'Main Course',
    orders: 450,
    revenue: 22500,
  },
  {
    category: 'Appetizers',
    orders: 320,
    revenue: 9600,
  },
  {
    category: 'Desserts',
    orders: 280,
    revenue: 7000,
  },
  {
    category: 'Seafood',
    orders: 220,
    revenue: 13200,
  },
  {
    category: 'Beverages',
    orders: 180,
    revenue: 3600,
  },
];

export function MenuPopularityChart() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="orders" name="Orders" fill="hsl(var(--primary))" />
          <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="hsl(var(--chart-2))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}