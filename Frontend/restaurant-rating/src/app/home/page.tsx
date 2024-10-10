'use client'

import { useState, useEffect } from 'react';
import StandardLayout from "@/components/ui/costum/standard-layout";
import SearchBar from "@/components/ui/costum/search-bar";
import UnderConstructionCard from "@/components/ui/costum/under-construction-card";
import CategoryContainer from "@/components/ui/costum/category-container";
import { getReviewsAsRestaurantArray } from '@/lib/reviewHelpers';  // Import your function
import { Restaurant } from '@/models/Restaurant';
import { getAllReviews, getAllReviewsNewest, getAllReviewsSortedByTrending } from '@/lib/APIHelpers';


export default function HomePage() {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState<Restaurant[]>([]);
  const [newestRestaurants, setNewestRestaurants] = useState<Restaurant[]>([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query);
  };

  // Fetch reviews and categorize them for each section
  useEffect(() => {
    // Example fetching for top-rated restaurants
    async function fetchTopRated() {
      const restaurants = await getReviewsAsRestaurantArray(getAllReviewsSortedByTrending);  // Use your API function
      setTopRatedRestaurants(restaurants);  // Update the state with fetched data
    }

    // Example fetching for newest restaurants
    async function fetchNewest() {
      const restaurants = await getReviewsAsRestaurantArray(getAllReviewsNewest);  // Use your API function
      setNewestRestaurants(restaurants);  // Update the state with fetched data
    }

    // Example fetching for nearby restaurants
    //TODO Implement nearby restaurants fetching
    async function fetchNearby() {
      const restaurants = await getReviewsAsRestaurantArray(getAllReviews);  // Use your API function
      setNearbyRestaurants(restaurants);  // Update the state with fetched data
    }

    // Call the functions to fetch the data
    fetchTopRated();
    fetchNewest();
    fetchNearby();
  }, []);

  return (
    <StandardLayout pageTitle="Discover Great Restaurants">
      <div className="space-y-8">
        <SearchBar onSearch={handleSearch} placeholder="Search for restaurants, cuisines, or locations..." />
        
        <UnderConstructionCard 
          title="Interactive Restaurant Map" 
          description="We're working on an interactive map to help you discover restaurants in your area. Stay tuned!"
        />

        <CategoryContainer
          title="Top Rated Restaurants"
          restaurants={topRatedRestaurants}
          categorySlug="top-rated"
        />

        <CategoryContainer
          title="Newest Additions"
          restaurants={newestRestaurants}
          categorySlug="newest"
        />

        <CategoryContainer
          title="Near You"
          restaurants={nearbyRestaurants}
          categorySlug="near-you"
        />
      </div>
    </StandardLayout>
  );
}
