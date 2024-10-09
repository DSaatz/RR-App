import { getAllReviews } from './APIHelpers';
import { Restaurant } from '@/models/Restaurant';

export async function getAllReviewsAsRestaurantArray(): Promise<Restaurant[]> {
  try {
    const reviews = await getAllReviews();

    // Log the type of the fetched reviews
    console.log('Type of fetched reviews:', typeof reviews);
    console.log('Fetched reviews:', reviews);

    // Parse reviews if they are a string
    let parsedReviews;
    if (typeof reviews === 'string') {
      parsedReviews = JSON.parse(reviews); // Parse the JSON string to an object
    } else {
      parsedReviews = reviews; // Use the reviews directly if already an object
    }

    // Check if parsedReviews is an array
    if (!Array.isArray(parsedReviews)) {
      console.error("getAllReviews did not return an array:", parsedReviews);
      return [];
    }

    // Map the review data to the Restaurant model
    const restaurants: Restaurant[] = parsedReviews.map((review: any) => ({
      id: review.restaurantName,  // Generate an ID if not provided
      name: review.restaurantName,    // Map restaurantName to name
      avgRating: review.avg_rating,   // Map avg_rating to avgRating
      numReviews: review.review_amount,  // Map review_amount to numReviews
      images: review.images || [],    // Ensure images is an array or set to empty
    }));

    console.log('Mapped restaurants:', restaurants);

    return restaurants;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
