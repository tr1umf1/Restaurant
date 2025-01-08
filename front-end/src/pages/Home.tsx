import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MakeReservation from './MakeReservation';
import PastMealReview from './AppoitnmentMeal';

const restaurantPhotos = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    alt: "Main Dining Room",
    title: "Elegant Main Dining Room"
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    alt: "Signature Dishes",
    title: "Award-Winning Cuisine"
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    alt: "Wine Cellar",
    title: "Premium Wine Collection"
  },
  {
    url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
    alt: "Private Dining",
    title: "Exclusive Private Dining"
  },
  {
    url: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88",
    alt: "Outdoor Terrace",
    title: "Scenic Outdoor Terrace"
  },
  {
    url: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
    alt: "Bar Area",
    title: "Sophisticated Bar & Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1507638940746-7b17d6b55b8f",
    alt: "Chef's Table",
    title: "Exclusive Chef's Table Experience"
  },
 
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative  h-screen overflow-x-auto ">
        <div className="absolute inset-0">
          <img
            src={restaurantPhotos[0].url}
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Gourmet Haven
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience culinary excellence in an elegant atmosphere. Make your
              reservation today for an unforgettable dining experience.
            </p>
            <div className="space-x-4">
              <Link to="/menu">
                <Button size="lg" variant="outline">
                  View Our Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-background h-screen overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experience Gourmet Haven
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurantPhotos.slice(1).map((photo, index) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden group"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-semibold">{photo.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background py-12">
        <MakeReservation />
        <PastMealReview />
      </div>
    </div>
  );
}