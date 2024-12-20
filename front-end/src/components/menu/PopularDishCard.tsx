import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface PopularDish {
  id: number;
  name: string;
  price: number;
  orderCount: number;
  rating: number;
  image: string;
  description: string;
}

interface PopularDishCardProps {
  dish: PopularDish;
}

export function PopularDishCard({ dish }: PopularDishCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-1 rounded-full text-sm">
          ${dish.price}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{dish.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {dish.orderCount} orders
          </span>
        </div>
      </CardContent>
    </Card>
  );
}