import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RestaurantCard from './restaurant-card'

interface Restaurant {
  id: number
  name: string
  rating: number
  distance: number
}

interface CategoryContainerProps {
  title: string
  restaurants: Restaurant[]
  categorySlug: string
}

export default function CategoryContainer({ title, restaurants, categorySlug }: CategoryContainerProps) {
  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-green-700">
          <Link href={`/category/${categorySlug}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <Link href={`/category/${categorySlug}`} passHref>
          <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {restaurants.slice(0, 5).map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              rating={restaurant.rating}
              distance={restaurant.distance}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}