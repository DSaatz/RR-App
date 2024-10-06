"use client"

import { useState } from 'react'
import StandardLayout from '@/components/ui/costum/standard-layout'
import SearchBar from '@/components/ui/costum/search-bar'
import RestaurantCard from '@/components/ui/costum/restaurant-card'
import { Button } from "@/components/ui/button"

const trendingRestaurants = [
  { id: 1, name: "The Buzz Cafe", rating: 4.8, distance: 1.2 },
  { id: 2, name: "Flavor Fusion", rating: 4.7, distance: 0.8 },
  { id: 3, name: "Urban Bites", rating: 4.9, distance: 2.5 },
  { id: 4, name: "Gourmet Galaxy", rating: 4.6, distance: 1.5 },
  { id: 5, name: "Spice Symphony", rating: 4.5, distance: 3.0 },
  { id: 6, name: "The Hungry Hive", rating: 4.7, distance: 2.2 },
  { id: 7, name: "Culinary Canvas", rating: 4.8, distance: 1.8 },
  { id: 8, name: "Savory Street", rating: 4.6, distance: 0.9 },
]

export default function TrendingPage() {
  const [restaurants, setRestaurants] = useState(trendingRestaurants)

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query)
  }

  return (
    <StandardLayout pageTitle="Trending Restaurants">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Trending Restaurants</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search trending restaurants..." />
        
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