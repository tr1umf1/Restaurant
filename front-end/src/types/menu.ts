export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  orderCount: number;
  rating: number;
  image: string;
}

export interface MenuAnalytics {
  topDishes: MenuItem[];
  categoryBreakdown: {
    category: string;
    count: number;
  }[];
  averageRating: number;
  totalOrders: number;
}