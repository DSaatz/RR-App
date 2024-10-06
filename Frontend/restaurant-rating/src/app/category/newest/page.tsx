"use client"

import { useState } from 'react'
import StandardLayout from '@/components/ui/costum/standard-layout'
import SearchBar from '@/components/ui/costum/search-bar'
import RestaurantCard from '@/components/ui/costum/restaurant-card'
import { Button } from "@/components/ui/button"

const newestRestaurants = [
  { id: 1, name: "Fresh Bites", rating: 4.5, distance: 0.7 },
  { id: 2, name: "Nouveau Nosh", rating: 4.3, distance: 1.1 },
  { id: 3, name: "The Culinary Debut", rating: 4.6, distance: 2.0 },
  { id: 4, name: "Flavor Frontier", rating: 4.4, distance: 1.3 },
  { id: 5, name: "Gastro Newcomer", rating: 4.2, distance: 0.9 },
  { id: 6, name: "Trendy Tastes", rating: 4.7, distance: 1.8 },
  { id: 7, name: "Modern Morsels", rating: 4.5, distance: 1.5 },
  { id: 8, name: "The New Palate", rating: 4.3, distance: 2.2 },
]

export default function NewestPage() {
  const [restaurants, setRestaurants] = useState(newestRestaurants)

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query)
  }

  return (
    <StandardLayout pageTitle="Newest Restaurants">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Newest Restaurants</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search newest restaurants..." />
        
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