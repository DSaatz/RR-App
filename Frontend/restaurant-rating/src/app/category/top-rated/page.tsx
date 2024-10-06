"use client"

import { useState } from 'react'
import StandardLayout from '@/components/ui/costum/standard-layout'
import SearchBar from '@/components/ui/costum/search-bar'
import RestaurantCard from '@/components/ui/costum/restaurant-card'
import { Button } from "@/components/ui/button"

// Sample top-rated restaurant data
const topRatedRestaurants = [
  { id: 1, name: "The Gourmet Experience", rating: 5.0, distance: 1.5 },
  { id: 2, name: "Epicurean Delights", rating: 4.9, distance: 0.7 },
  { id: 3, name: "Culinary Wonders", rating: 4.8, distance: 2.2 },
  { id: 4, name: "Taste Sensation", rating: 4.8, distance: 1.3 },
  { id: 5, name: "Savory Seasons", rating: 4.7, distance: 3.0 },
  { id: 6, name: "Flavor Haven", rating: 4.9, distance: 1.8 },
  { id: 7, name: "Dining Excellence", rating: 4.6, distance: 2.5 },
  { id: 8, name: "Epic Eateries", rating: 4.7, distance: 0.9 },
]

export default function TopRatedPage() {
  const [restaurants, setRestaurants] = useState(topRatedRestaurants)

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query)
  }

  return (
    <StandardLayout pageTitle="Top Rated Restaurants">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Top Rated Restaurants</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search top-rated restaurants..." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              rating={restaurant.rating}
              distance={restaurant.distance}
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
  )
}
