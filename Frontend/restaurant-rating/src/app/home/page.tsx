'use client'

import { useState, useEffect } from 'react';
import StandardLayout from "@/components/ui/costum/standard-layout";
import SearchBar from "@/components/ui/costum/search-bar";
import CategoryContainer from "@/components/ui/costum/category-container";
import RestaurantMap from "@/components/ui/costum/restaurant-map";
import { getReviewsAsRestaurantArray } from '@/lib/reviewHelpers';
import { Restaurant } from '@/models/Restaurant';
import { getAllReviews, getAllReviewsNewest, getAllReviewsSortedByTrending } from '@/lib/APIHelpers';
import useGeolocation from '@/hooks/useGeolocation';

export default function HomePage() {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState<Restaurant[]>([]);
  const [newestRestaurants, setNewestRestaurants] = useState<Restaurant[]>([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const { location, error } = useGeolocation();
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); // Default to London

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    if (typeof window !== 'undefined' && (window as any).handleMapSearch) {
      (window as any).handleMapSearch(query);
    }
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
        const restaurants = await getReviewsAsRestaurantArray(getAllReviews);
        setNearbyRestaurants(restaurants);
        setMapCenter([location.latitude, location.longitude]);
        console.log("Found location:", location);
      }
    }

    fetchTopRated();
    fetchNewest();
    fetchNearby();
  }, [location]);

  return (
    <StandardLayout pageTitle="Discover Great Restaurants">
      <div className="space-y-8">
        <SearchBar onSearch={handleSearch} placeholder="Search for restaurants, cuisines, or locations..." />
        
        <div className="h-[400px] w-full">
          <RestaurantMap initialCenter={mapCenter} />
        </div>

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