'use client'

import StandardLayout from "@/components/ui/costum/standard-layout"
import SearchBar from "@/components/ui/costum/search-bar"
import UnderConstructionCard from "@/components/ui/costum/under-construction-card"
import CategoryContainer from "@/components/ui/costum/category-container"

// Sample data for restaurant categories
const topRatedRestaurants = [
  { id: 1, name: "Gourmet Delight", rating: 4.8, distance: 1.2 },
  { id: 2, name: "Pasta Paradise", rating: 4.7, distance: 0.8 },
  { id: 3, name: "Sushi Sensation", rating: 4.6, distance: 2.5 },
  { id: 4, name: "Burger Bonanza", rating: 4.5, distance: 1.5 },
  { id: 5, name: "Veggie Venture", rating: 4.5, distance: 3.0 },
]

const newestRestaurants = [
  { id: 6, name: "Fresh Fusion", rating: 4.2, distance: 0.5 },
  { id: 7, name: "Taco Trends", rating: 4.0, distance: 1.8 },
  { id: 8, name: "Pizza Pioneers", rating: 4.3, distance: 2.2 },
  { id: 9, name: "Dessert Dreams", rating: 4.4, distance: 1.0 },
  { id: 10, name: "Breakfast Bliss", rating: 4.1, distance: 0.7 },
]

const nearbyRestaurants = [
  { id: 11, name: "Corner Café", rating: 4.0, distance: 0.3 },
  { id: 12, name: "Local Bites", rating: 3.9, distance: 0.4 },
  { id: 13, name: "Quick Eats", rating: 3.8, distance: 0.6 },
  { id: 14, name: "Neighborhood Nosh", rating: 4.2, distance: 0.8 },
  { id: 15, name: "Street Treats", rating: 4.1, distance: 1.0 },
]

export default function HomePage() {
  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Searching for:", query)
  }

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
  )
}