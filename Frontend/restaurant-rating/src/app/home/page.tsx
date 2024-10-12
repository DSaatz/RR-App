'use client'

import { useState, useEffect } from 'react';
import StandardLayout from "@/components/ui/costum/standard-layout";
import SearchBar from "@/components/ui/costum/search-bar";
import UnderConstructionCard from "@/components/ui/costum/under-construction-card";
import CategoryContainer from "@/components/ui/costum/category-container";
import { getReviewsAsRestaurantArray } from '@/lib/reviewHelpers';
import { Restaurant } from '@/models/Restaurant';
import { getAllReviews, getAllReviewsNewest, getAllReviewsSortedByTrending } from '@/lib/APIHelpers';
import useGeolocation from '@/hooks/useGeolocation';

export default function HomePage() {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState<Restaurant[]>([]);
  const [newestRestaurants, setNewestRestaurants] = useState<Restaurant[]>([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const { location, error } = useGeolocation();
  
  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query);
  };

  useEffect(() => {
    async function fetchTopRated() {
      const restaurants = await getReviewsAsRestaurantArray(getAllReviewsSortedByTrending);
      setTopRatedRestaurants(restaurants);
    }

    async function fetchNewest() {
      const restaurants = await getReviewsAsRestaurantArray(getAllReviewsNewest);
      setNewestRestaurants(restaurants);
    }

    async function fetchNearby() {
      if (location.latitude && location.longitude) {
        // Here you would typically pass the location to a function that fetches nearby restaurants
        // For now, we'll use getAllReviews as a placeholder
        const restaurants = await getReviewsAsRestaurantArray(getAllReviews);
        setNearbyRestaurants(restaurants);
      }
    }

    fetchTopRated();
    fetchNewest();
    fetchNearby();
  }, [location]); // Add location as a dependency

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