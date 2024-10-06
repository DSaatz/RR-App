"use client"

import { useState } from 'react'
import StandardLayout from '@/components/ui/costum/standard-layout'
import SearchBar from '@/components/ui/costum/search-bar'
import RestaurantCard from '@/components/ui/costum/restaurant-card'
import UnderConstructionCard from '@/components/ui/costum/under-construction-card'
import { Button } from "@/components/ui/button"

const nearbyRestaurants = [
  { id: 1, name: "Corner Café", rating: 4.2, distance: 0.3 },
  { id: 2, name: "Local Bites", rating: 4.0, distance: 0.5 },
  { id: 3, name: "Neighborhood Nosh", rating: 4.3, distance: 0.7 },
  { id: 4, name: "Nearby Nibbles", rating: 3.9, distance: 0.8 },
  { id: 5, name: "Close Cuisine", rating: 4.1, distance: 1.0 },
  { id: 6, name: "Proximal Plates", rating: 4.4, distance: 1.2 },
  { id: 7, name: "Walkable Wok", rating: 4.2, distance: 1.5 },
  { id: 8, name: "Around the Corner Eats", rating: 4.0, distance: 1.7 },
]

export default function NearYouPage() {
  const [restaurants, setRestaurants] = useState(nearbyRestaurants)

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query)
  }

  return (
    <StandardLayout pageTitle="Restaurants Near You">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Restaurants Near You</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search nearby restaurants..." />
        
        <UnderConstructionCard 
          title="Interactive Restaurant Map" 
          description="We're working on an interactive map to help you discover restaurants in your area. Stay tuned!"
        />

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