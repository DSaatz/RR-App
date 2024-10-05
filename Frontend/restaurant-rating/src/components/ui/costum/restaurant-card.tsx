import { Star, MapPin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface RestaurantCardProps {
  name: string
  rating: number
  distance: number
}

export default function RestaurantCard({ name, rating, distance }: RestaurantCardProps) {
  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-green-600" />
          <span>{distance.toFixed(1)} km away</span>
        </div>
      </CardContent>
    </Card>
  )
}