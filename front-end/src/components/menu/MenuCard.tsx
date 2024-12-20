import { Card, CardContent } from '@/components/ui/card';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-1 rounded-full text-sm">
          ${item.price}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}