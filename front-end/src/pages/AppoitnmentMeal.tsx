import { useState } from 'react';
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
import axios from 'axios'; 

export default function PastMealReview() {
  const [reviews, setReviews] = useState({
    rating: '',
    review: '',
    meal: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/appointmentsmeals/add',
        {
          meal: reviews.meal,
          rating: reviews.rating,
          description: reviews.review,
        }
      );

      if (response.status === 201) {
        toast.success('Review submitted successfully!');
        setReviews({ rating: '', review: '', meal: '' }); // Reset the form
      }
    } catch (error) {
      toast.error('Error submitting review');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 bg-muted/50 overflow-x-auto">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">
              Rate Your Last Meal
            </h2>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meal">Meal</Label>
                <Input
                  id="meal"
                  name="meal" 
                  value={reviews.meal} 
                  onChange={handleChange} 
                  placeholder="Enter the meal you had" 
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <select
                  id="rating"
                  name="rating"
                  value={reviews.rating}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  required
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Describe your experience</Label>
                <textarea
                  id="review"
                  name="review"
                  value={reviews.review}
                  onChange={handleChange}
                  placeholder="Write your review here"
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
