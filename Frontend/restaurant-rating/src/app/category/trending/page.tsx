"use client";

import { useEffect, useState } from "react";
import StandardLayout from "@/components/ui/costum/standard-layout";
import SearchBar from "@/components/ui/costum/search-bar";
import RestaurantCard from "@/components/ui/costum/restaurant-card";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/models/Restaurant";
import { getReviewsAsRestaurantArray } from "@/lib/reviewHelpers";
import { getAllReviewsSortedByTrending } from "@/lib/APIHelpers";
import { searchRestaurants, scrollToRestaurant } from "@/lib/searchHelpers";

export default function TrendingPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dummyDistance = 1.5;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await getReviewsAsRestaurantArray(getAllReviewsSortedByTrending);
        setRestaurants(restaurantData);
        setFilteredRestaurants(restaurantData);
        console.log("Fetched restaurants:", restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = searchRestaurants(restaurants, searchQuery);
      setFilteredRestaurants(results);
      if (results.length > 0) {
        scrollToRestaurant(results[0].id);
      }
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchQuery, restaurants]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  return (
    <StandardLayout pageTitle="Trending Restaurants">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Trending Restaurants</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search trending restaurants..." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              rating={restaurant.avgRating}
              distance={dummyDistance}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8">No restaurants found matching your search.</div>
        )}

        <div className="flex justify-center mt-8">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Load More
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}