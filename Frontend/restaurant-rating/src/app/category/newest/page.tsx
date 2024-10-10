"use client"

import { useEffect,useState } from 'react'
import StandardLayout from '@/components/ui/costum/standard-layout'
import SearchBar from '@/components/ui/costum/search-bar'
import RestaurantCard from '@/components/ui/costum/restaurant-card'
import { Button } from "@/components/ui/button"
import { getReviewsAsRestaurantArray } from '@/lib/reviewHelpers'
import { getAllReviewsNewest } from '@/lib/APIHelpers'
import { Restaurant } from '@/models/Restaurant'


export default function NewestPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State to hold restaurant data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const dummyDistance = 1.5;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await getReviewsAsRestaurantArray(getAllReviewsNewest);
        setRestaurants(restaurantData); // Set the fetched restaurants
        console.log("Fetched restaurants:", restaurantData); // Log fetched restaurants
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRestaurants(); // Call the function to fetch restaurants
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query);
    // You can add filtering logic based on the query here
  };

  if (loading) {
    return <div className="text-center py-8">Loading restaurants...</div>; // Loading state message
  }

  return (
    <StandardLayout pageTitle="Newest Restaurants">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Newest Restaurants</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search Newest restaurants..." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              rating={restaurant.avgRating} // Use avgRating from Restaurant interface
              distance= {dummyDistance}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Load More
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
