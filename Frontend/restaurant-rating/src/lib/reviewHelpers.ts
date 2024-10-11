import { Input } from '@/components/ui/input';
import { Restaurant } from '@/models/Restaurant';
import { Review } from '@/models/Review';

// Refactor to accept any querying function
export async function getReviewsAsRestaurantArray(queryFn: () => Promise<any[]>): Promise<Restaurant[]> {
  try {
    const reviews = await queryFn();  // Use the passed function for querying

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
      console.error("Query function did not return an array:", parsedReviews);
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

export async function getReviewsAsReviewArray(
  queryFn: (input?: any) => Promise<any[]>, // Accept a function that optionally takes input
  input?: any // Optional input for the query function
): Promise<Review[]> {
  try {
    // Call query function with or without input
    const reviews = input ? await queryFn(input) : await queryFn();

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
      console.error("Query function did not return an array:", parsedReviews);
      return [];
    }

    // Map the review data to the Restaurant model
// Map the review data to the Review model
// Map the review data to the Review model
  const mappedReviews: Review[] = parsedReviews.map((review: any) => ({
    username: review.username, // Add username in page.tsx when calling this function
    restaurantName: review.restaurantName, // Map restaurantName to restaurantName
    ambienceRating: Number(review.ambient), // Use the correct key
    serviceRating: Number(review.service), // Use the correct key
    tasteRating: Number(review.taste), // Use the correct key
    platingRating: Number(review.plating), // Use the correct key
    locationRating: Number(review.location), // Use the correct key
    priceToValueRating: Number(review.priceToValue), // Use the correct key
    reviewText: review.reviewText, // Map reviewText to reviewText
    images: review.images || [], // Ensure images is an array or set to empty
  }));


    
    console.log('Mapped restaurants:', mappedReviews);

    return mappedReviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}